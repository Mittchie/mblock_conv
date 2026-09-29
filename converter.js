/**
 * converter.js
 * Universal mBlock 5 to Arduino C++ Converter (Client-side JS)
 */

const BOARD_CONFIGS = {
  auriga: {
    key: 'auriga',
    name: 'mBot Ranger (Me Auriga)',
    header: '<MeAuriga.h>',
    arduinoBoard: 'Arduino Mega or Mega 2560 (ATmega2560)',
    includes: ['<Arduino.h>', '<Wire.h>', '<SoftwareSerial.h>', '<MeAuriga.h>'],
    encoderMotors: true,
    ledRingPin: 44,
    ledRingCount: 12,
    defaultGyro: 'MeGyro gyro_0(0, 0x69);',
    randomSeedSensor: 'lightsensor_12',
  },
  mcore: {
    key: 'mcore',
    name: 'mBot (mCore)',
    header: '<MeMCore.h>',
    arduinoBoard: 'Arduino Uno (ATmega328P)',
    includes: ['<Arduino.h>', '<Wire.h>', '<SoftwareSerial.h>', '<MeMCore.h>'],
    encoderMotors: false,
    ledRingPin: null,
    defaultGyro: 'MeGyro gyro_0(0, 0x69);',
    randomSeedSensor: 'lightsensor_6',
  },
  megapi: {
    key: 'megapi',
    name: 'MegaPi',
    header: '<MeMegaPi.h>',
    arduinoBoard: 'Arduino Mega or Mega 2560 (ATmega2560)',
    includes: ['<Arduino.h>', '<Wire.h>', '<SoftwareSerial.h>', '<MeMegaPi.h>'],
    encoderMotors: true,
    ledRingPin: null,
    defaultGyro: 'MeGyro gyro_0(0, 0x69);',
    randomSeedSensor: null,
  },
  megapipro: {
    key: 'megapipro',
    name: 'MegaPi Pro',
    header: '<MeMegaPiPro.h>',
    arduinoBoard: 'Arduino Mega or Mega 2560 (ATmega2560)',
    includes: ['<Arduino.h>', '<Wire.h>', '<SoftwareSerial.h>', '<MeMegaPiPro.h>'],
    encoderMotors: true,
    ledRingPin: null,
    defaultGyro: 'MeGyro gyro_0(0, 0x69);',
    randomSeedSensor: null,
  },
  orion: {
    key: 'orion',
    name: 'Makeblock Orion',
    header: '<MeOrion.h>',
    arduinoBoard: 'Arduino Uno (ATmega328P)',
    includes: ['<Arduino.h>', '<Wire.h>', '<SoftwareSerial.h>', '<MeOrion.h>'],
    encoderMotors: false,
    ledRingPin: null,
    defaultGyro: 'MeGyro gyro_0(0, 0x69);',
    randomSeedSensor: null,
  }
};

class MBlockConverter {
  constructor(projectData, boardHint = null) {
    this.projectData = projectData;
    this.boardKey = boardHint || this._detectBoard();
    this.boardInfo = BOARD_CONFIGS[this.boardKey] || BOARD_CONFIGS.auriga;

    this.target = this._findMainTarget();
    this.blocks = this.target.blocks || {};
    this.variables = this.target.variables || {};

    // Hardware usage tracking
    this.tracker = {
      usedEncoders: false,
      usedMoveFn: false,
      usedGyro: false,
      usedRgbRing: false,
      usedMcoreLed: false,
      usedUltrasonicPorts: new Set(),
      usedLinefollowerPorts: new Set(),
      usedLightsensorPorts: new Set(),
      usedSoundsensorPorts: new Set(),
      usedTemperaturePorts: new Set(),
      usedBuzzer: false,
      usedTimer: false,
    };

    this.procedures = {};
    this._indexProcedures();
  }

  _detectBoard() {
    const targets = this.projectData.targets || [];
    for (const t of targets) {
      const tName = (t.name || '').toLowerCase();
      for (const b of Object.keys(BOARD_CONFIGS)) {
        if (tName.includes(b)) return b;
      }
      for (const blk of Object.values(t.blocks || {})) {
        if (typeof blk === 'object' && blk !== null) {
          const op = (blk.opcode || '').toLowerCase();
          for (const bk of Object.keys(BOARD_CONFIGS)) {
            if (op.startsWith(bk + '.') || op.startsWith(bk + '_')) {
              return bk;
            }
          }
        }
      }
    }
    return 'auriga';
  }

  _findMainTarget() {
    const targets = this.projectData.targets || [];
    for (const t of targets) {
      if (!t.isStage && Object.keys(t.blocks || {}).length > 0) {
        const tName = (t.name || '').toLowerCase();
        if (Object.keys(BOARD_CONFIGS).some(b => tName.includes(b))) {
          return t;
        }
      }
    }
    for (const t of targets) {
      if (!t.isStage && Object.keys(t.blocks || {}).length > 0) {
        return t;
      }
    }
    return {};
  }

  _sanitizeName(name) {
    if (!name) return 'var';
    let s = String(name).trim().replace(/[^a-zA-Z0-9_]/g, '_');
    if (/^[0-9]/.test(s)) s = '_' + s;
    return s || 'var';
  }

  _formatProcName(proccode) {
    let clean = proccode.replace(/%n/g, 'N').replace(/%s/g, 'S').replace(/%b/g, 'B');
    return this._sanitizeName(clean);
  }

  _indexProcedures() {
    for (const [bid, b] of Object.entries(this.blocks)) {
      if (!b || typeof b !== 'object') continue;
      if (b.opcode === 'procedures_definition') {
        const protoInput = (b.inputs || {}).custom_block;
        if (protoInput && protoInput.length >= 2) {
          const protoId = protoInput[1];
          const proto = this.blocks[protoId] || {};
          const mut = proto.mutation || {};
          const proccode = mut.proccode || '';

          let argnames = [];
          try {
            argnames = typeof mut.argumentnames === 'string' ? JSON.parse(mut.argumentnames) : (mut.argumentnames || []);
          } catch (e) {
            argnames = [];
          }

          let argids = [];
          try {
            argids = typeof mut.argumentids === 'string' ? JSON.parse(mut.argumentids) : (mut.argumentids || []);
          } catch (e) {
            argids = [];
          }

          this.procedures[proccode] = {
            fnName: this._formatProcName(proccode),
            proccode: proccode,
            defId: bid,
            argnames: argnames,
            argids: argids,
            bodyId: b.next
          };
        }
      }
    }
  }

  _colorHexToRgb(hexVal) {
    let hex = String(hexVal).trim().replace(/[#"']/g, '');
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    return '0, 0, 0';
  }

  _getInputExpr(inp) {
    if (!inp) return '0';
    if (Array.isArray(inp) && inp.length >= 2) {
      const target = inp[1];
      if (typeof target === 'string') {
        return this._getBlockExpr(target);
      } else if (Array.isArray(target)) {
        const typeId = target[0];
        if (typeId === 12) { // Variable
          return this._sanitizeName(String(target[1]));
        } else if (typeId === 9) { // Color
          return this._colorHexToRgb(String(target[1]));
        } else {
          return String(target[1]);
        }
      }
      return String(target);
    }
    return '0';
  }

  _getBlockExpr(bid) {
    if (!bid) return '0';
    const b = this.blocks[bid];
    if (!b || typeof b !== 'object') return String(bid);

    let op = b.opcode || '';
    const inputs = b.inputs || {};
    const fields = b.fields || {};

    if (op.includes('.')) {
      op = op.split('.')[1];
    }

    // Argument reporters
    if (op === 'argument_reporter_string_number' || op === 'argument_reporter_boolean') {
      const val = (fields.VALUE || [''])[0];
      return this._sanitizeName(val);
    }

    // Variables
    if (op === 'data_variable') {
      const val = (fields.VARIABLE || [''])[0];
      return this._sanitizeName(val);
    }

    // Operators
    if (op === 'operator_add') {
      return `(${this._getInputExpr(inputs.NUM1)} + ${this._getInputExpr(inputs.NUM2)})`;
    } else if (op === 'operator_subtract') {
      return `(${this._getInputExpr(inputs.NUM1)} - ${this._getInputExpr(inputs.NUM2)})`;
    } else if (op === 'operator_multiply') {
      return `(${this._getInputExpr(inputs.NUM1)} * ${this._getInputExpr(inputs.NUM2)})`;
    } else if (op === 'operator_divide') {
      return `(${this._getInputExpr(inputs.NUM1)} / ${this._getInputExpr(inputs.NUM2)})`;
    } else if (op === 'operator_mod') {
      return `fmod(${this._getInputExpr(inputs.NUM1)}, ${this._getInputExpr(inputs.NUM2)})`;
    } else if (op === 'operator_round') {
      return `round(${this._getInputExpr(inputs.NUM)})`;
    } else if (op === 'operator_random') {
      return `random(${this._getInputExpr(inputs.FROM)}, ${this._getInputExpr(inputs.TO)} + 1)`;
    } else if (op === 'operator_mathop') {
      const operator = (fields.OPERATOR || ['sqrt'])[0].toLowerCase();
      const num = this._getInputExpr(inputs.NUM);
      const map = {
        'abs': `abs(${num})`,
        'floor': `floor(${num})`,
        'ceiling': `ceil(${num})`,
        'sqrt': `sqrt(${num})`,
        'sin': `sin((${num}) * DEG_TO_RAD)`,
        'cos': `cos((${num}) * DEG_TO_RAD)`,
        'tan': `tan((${num}) * DEG_TO_RAD)`,
        'asin': `(asin(${num}) * RAD_TO_DEG)`,
        'acos': `(acos(${num}) * RAD_TO_DEG)`,
        'atan': `(atan(${num}) * RAD_TO_DEG)`,
        'ln': `log(${num})`,
        'log': `log10(${num})`,
        'e ^': `exp(${num})`,
        '10 ^': `pow(10, ${num})`
      };
      return map[operator] || `sqrt(${num})`;
    } else if (op === 'operator_gt') {
      return `(${this._getInputExpr(inputs.OPERAND1)} > ${this._getInputExpr(inputs.OPERAND2)})`;
    } else if (op === 'operator_lt') {
      return `(${this._getInputExpr(inputs.OPERAND1)} < ${this._getInputExpr(inputs.OPERAND2)})`;
    } else if (op === 'operator_equals') {
      return `(${this._getInputExpr(inputs.OPERAND1)} == ${this._getInputExpr(inputs.OPERAND2)})`;
    } else if (op === 'operator_and') {
      return `(${this._getInputExpr(inputs.OPERAND1)} && ${this._getInputExpr(inputs.OPERAND2)})`;
    } else if (op === 'operator_or') {
      return `(${this._getInputExpr(inputs.OPERAND1)} || ${this._getInputExpr(inputs.OPERAND2)})`;
    } else if (op === 'operator_not') {
      return `(!(${this._getInputExpr(inputs.OPERAND)}))`;
    }

    // Hardware sensors
    if (op === 'auriga_detect_board_gyro_angle' || op === 'mcore_detect_gyro_angle') {
      this.tracker.usedGyro = true;
      const axis = (fields.AXIS || ['3'])[0];
      return `gyro_0.getAngle(${axis})`;
    } else if (op === 'auriga_detect_external_ultrasonic' || op === 'mcore_detect_external_ultrasonic') {
      const port = (fields.PORT || ['10'])[0];
      this.tracker.usedUltrasonicPorts.add(port);
      return `ultrasonic_${port}.distanceCm()`;
    } else if (op === 'auriga_event_external_linefollower' || op === 'mcore_event_external_linefollower') {
      const port = (fields.PORT || ['10'])[0];
      const state = (fields.LINEFOLLOW_STATE || ['2'])[0];
      const bw = (fields.BLACK_WHITE || ['0'])[0];
      this.tracker.usedLinefollowerPorts.add(port);
      return `(${bw} ? (${state} == 0 ? linefollower_${port}.readSensors() == 0 : (linefollower_${port}.readSensors() & ${state}) == ${state}) : (${state} == 0 ? linefollower_${port}.readSensors() == 3 : (linefollower_${port}.readSensors() & ${state}) == 0))`;
    } else if (op === 'auriga_detect_external_linefollower' || op === 'mcore_detect_external_linefollower') {
      const port = (fields.PORT || ['10'])[0];
      this.tracker.usedLinefollowerPorts.add(port);
      return `linefollower_${port}.readSensors()`;
    } else if (op === 'auriga_detect_light' || op === 'mcore_detect_light') {
      const port = (fields.PORT || [this.boardKey === 'auriga' ? '12' : '6'])[0];
      this.tracker.usedLightsensorPorts.add(port);
      return `lightsensor_${port}.read()`;
    } else if (op === 'auriga_detect_loudness' || op === 'mcore_detect_external_loudness') {
      const port = (fields.PORT || [this.boardKey === 'auriga' ? '14' : '4'])[0];
      this.tracker.usedSoundsensorPorts.add(port);
      return `soundsensor_${port}.strength()`;
    } else if (op === 'auriga_detect_timer' || op === 'mcore_detect_timer') {
      this.tracker.usedTimer = true;
      return '(millis() / 1000.0 - _timer_offset)';
    }

    return `/* unknown expr ${op} */ 0`;
  }

  _translateStatements(startBid, indent = '  ') {
    const lines = [];
    let curr = startBid;

    while (curr) {
      const b = this.blocks[curr];
      if (!b || typeof b !== 'object') break;

      let op = b.opcode || '';
      const inputs = b.inputs || {};
      const fields = b.fields || {};

      if (op.includes('.')) {
        op = op.split('.')[1];
      }

      // Procedure Calls
      if (op === 'procedures_call') {
        const mut = b.mutation || {};
        const proccode = mut.proccode || '';
        let argids = [];
        try {
          argids = typeof mut.argumentids === 'string' ? JSON.parse(mut.argumentids) : (mut.argumentids || []);
        } catch (e) {
          argids = [];
        }
        const argExprs = argids.map(aid => this._getInputExpr(inputs[aid]));
        const fnName = this._formatProcName(proccode);
        lines.push(`${indent}${fnName}(${argExprs.join(', ')});`);
      }

      // Variable setters
      else if (op === 'data_setvariableto') {
        const varName = this._sanitizeName((fields.VARIABLE || [''])[0]);
        const valExpr = this._getInputExpr(inputs.VALUE);
        lines.push(`${indent}${varName} = ${valExpr};`);
      } else if (op === 'data_changevariableby') {
        const varName = this._sanitizeName((fields.VARIABLE || [''])[0]);
        const valExpr = this._getInputExpr(inputs.VALUE);
        lines.push(`${indent}${varName} += ${valExpr};`);
      }

      // Control loops
      else if (op === 'control_forever') {
        lines.push(`${indent}while (1) {`);
        const sub = inputs.SUBSTACK;
        if (sub && sub.length >= 2) {
          lines.push(...this._translateStatements(sub[1], indent + '  '));
        }
        lines.push(`${indent}  _loop();`);
        lines.push(`${indent}}`);
      } else if (op === 'control_repeat') {
        const times = this._getInputExpr(inputs.TIMES);
        lines.push(`${indent}for (int _i = 0; _i < ${times}; _i++) {`);
        lines.push(`${indent}  _loop();`);
        const sub = inputs.SUBSTACK;
        if (sub && sub.length >= 2) {
          lines.push(...this._translateStatements(sub[1], indent + '  '));
        }
        lines.push(`${indent}}`);
      } else if (op === 'control_repeat_until') {
        const cond = this._getInputExpr(inputs.CONDITION);
        lines.push(`${indent}while (!(${cond})) {`);
        lines.push(`${indent}  _loop();`);
        const sub = inputs.SUBSTACK;
        if (sub && sub.length >= 2) {
          lines.push(...this._translateStatements(sub[1], indent + '  '));
        }
        lines.push(`${indent}}`);
      } else if (op === 'control_if') {
        const cond = this._getInputExpr(inputs.CONDITION);
        lines.push(`${indent}if (${cond}) {`);
        const sub = inputs.SUBSTACK;
        if (sub && sub.length >= 2) {
          lines.push(...this._translateStatements(sub[1], indent + '  '));
        }
        lines.push(`${indent}}`);
      } else if (op === 'control_if_else') {
        const cond = this._getInputExpr(inputs.CONDITION);
        lines.push(`${indent}if (${cond}) {`);
        const sub1 = inputs.SUBSTACK;
        if (sub1 && sub1.length >= 2) {
          lines.push(...this._translateStatements(sub1[1], indent + '  '));
        }
        lines.push(`${indent}} else {`);
        const sub2 = inputs.SUBSTACK2;
        if (sub2 && sub2.length >= 2) {
          lines.push(...this._translateStatements(sub2[1], indent + '  '));
        }
        lines.push(`${indent}}`);
      } else if (op === 'control_wait') {
        const duration = this._getInputExpr(inputs.DURATION);
        lines.push(`${indent}_delay(${duration});`);
      } else if (op === 'control_wait_until') {
        const cond = this._getInputExpr(inputs.CONDITION);
        lines.push(`${indent}while (!(${cond})) {`);
        lines.push(`${indent}  _loop();`);
        lines.push(`${indent}}`);
      } else if (op === 'control_break_new') {
        lines.push(`${indent}break;`);
      } else if (op === 'control_stop') {
        lines.push(`${indent}return;`);
      }

      // Motors & Motion
      else if (op === 'auriga_move' || op === 'mcore_move') {
        this.tracker.usedMoveFn = true;
        const dir = (fields.MOVE_DIRECTION || ['1'])[0];
        const power = this._getInputExpr(inputs.POWER);
        lines.push(`${indent}move(${dir}, ${power} / 100.0 * 255);`);
      } else if (op === 'auriga_move_wheel_speed') {
        this.tracker.usedEncoders = true;
        const pL = this._getInputExpr(inputs.POWER_LEFT);
        const pR = this._getInputExpr(inputs.POWER_RIGHT);
        lines.push(`${indent}Encoder_1.setTarPWM(-1 * ${pR} / 100.0 * 255);`);
        lines.push(`${indent}Encoder_2.setTarPWM(${pL} / 100.0 * 255);`);
      } else if (op === 'mcore_move_wheel_speed') {
        this.tracker.usedMoveFn = true;
        const pL = this._getInputExpr(inputs.POWER_LEFT);
        const pR = this._getInputExpr(inputs.POWER_RIGHT);
        lines.push(`${indent}motor_9.run(-(${pL} / 100.0 * 255));`);
        lines.push(`${indent}motor_10.run(${pR} / 100.0 * 255);`);
      } else if (op === 'auriga_forward_time' || op === 'mcore_forward_time') {
        this.tracker.usedMoveFn = true;
        const power = this._getInputExpr(inputs.POWER);
        const t = this._getInputExpr(inputs.TIME);
        lines.push(`${indent}move(1, ${power} / 100.0 * 255);`);
        lines.push(`${indent}_delay(${t});`);
        lines.push(`${indent}move(1, 0);`);
      } else if (op === 'auriga_backward_time' || op === 'mcore_backward_time') {
        this.tracker.usedMoveFn = true;
        const power = this._getInputExpr(inputs.POWER);
        const t = this._getInputExpr(inputs.TIME);
        lines.push(`${indent}move(2, ${power} / 100.0 * 255);`);
        lines.push(`${indent}_delay(${t});`);
        lines.push(`${indent}move(2, 0);`);
      } else if (op === 'auriga_turnleft_time' || op === 'mcore_turnleft_time') {
        this.tracker.usedMoveFn = true;
        const power = this._getInputExpr(inputs.POWER);
        const t = this._getInputExpr(inputs.TIME);
        lines.push(`${indent}move(3, ${power} / 100.0 * 255);`);
        lines.push(`${indent}_delay(${t});`);
        lines.push(`${indent}move(3, 0);`);
      } else if (op === 'auriga_turnright_time' || op === 'mcore_turnright_time') {
        this.tracker.usedMoveFn = true;
        const power = this._getInputExpr(inputs.POWER);
        const t = this._getInputExpr(inputs.TIME);
        lines.push(`${indent}move(4, ${power} / 100.0 * 255);`);
        lines.push(`${indent}_delay(${t});`);
        lines.push(`${indent}move(4, 0);`);
      } else if (op === 'auriga_move_stop' || op === 'mcore_move_stop') {
        this.tracker.usedMoveFn = true;
        lines.push(`${indent}move(1, 0);`);
      }

      // Lights & LEDs
      else if (op === 'auriga_show_all_led') {
        this.tracker.usedRgbRing = true;
        const color = this._getInputExpr(inputs.COLOR);
        lines.push(`${indent}rgbled_0.setColor(0, ${color});`);
        lines.push(`${indent}rgbled_0.show();`);
      } else if (op === 'auriga_show_all_led_time') {
        this.tracker.usedRgbRing = true;
        const color = this._getInputExpr(inputs.COLOR);
        const t = this._getInputExpr(inputs.TIME);
        lines.push(`${indent}rgbled_0.setColor(0, ${color});`);
        lines.push(`${indent}rgbled_0.show();`);
        lines.push(`${indent}_delay(${t});`);
        lines.push(`${indent}rgbled_0.setColor(0, 0, 0, 0);`);
        lines.push(`${indent}rgbled_0.show();`);
      } else if (op === 'auriga_show_led' || op === 'auriga_show_led_rgb') {
        this.tracker.usedRgbRing = true;
        const idx = (fields.LED_POSTION || ['0'])[0];
        const color = this._getInputExpr(inputs.COLOR);
        lines.push(`${indent}rgbled_0.setColor(${idx}, ${color});`);
        lines.push(`${indent}rgbled_0.show();`);
      } else if (op === 'mcore_show_led' || op === 'mcore_show_led_rgb') {
        this.tracker.usedMcoreLed = true;
        const idx = (fields.LED_POSTION || ['0'])[0];
        const color = this._getInputExpr(inputs.COLOR);
        lines.push(`${indent}rgbled_7.setColor(${idx}, ${color});`);
        lines.push(`${indent}rgbled_7.show();`);
      }

      // Buzzer & Sound
      else if (op === 'auriga_sound_play_hz' || op === 'mcore_sound_play_hz') {
        this.tracker.usedBuzzer = true;
        const hz = this._getInputExpr(inputs.HZ);
        const t = this._getInputExpr(inputs.TIME);
        lines.push(`${indent}buzzer.tone(${hz}, ${t} * 1000);`);
      }

      // Timer
      else if (op === 'auriga_reset_timer' || op === 'mcore_reset_timer') {
        this.tracker.usedTimer = true;
        lines.push(`${indent}_timer_offset = millis() / 1000.0;`);
      }

      curr = b.next;
    }

    return lines;
  }

  generateCode() {
    // 1. Process custom procedures
    const procCodes = [];
    for (const [proccode, pinfo] of Object.entries(this.procedures)) {
      const argsDecl = pinfo.argnames.map(a => `double ${this._sanitizeName(a)}`);
      const fnHeader = `void ${pinfo.fnName}(${argsDecl.join(', ')}) {`;
      const bodyLines = this._translateStatements(pinfo.bodyId, '  ');
      procCodes.push({ fnName: pinfo.fnName, fnHeader, bodyLines });
    }

    // 2. Process launch block
    let launchBlock = null;
    const launchOpcodes = [
      `${this.boardKey}.${this.boardKey}_when_board_launch`,
      `${this.boardKey}_when_board_launch`
    ];
    for (const [bid, b] of Object.entries(this.blocks)) {
      if (b && typeof b === 'object' && b.topLevel) {
        if (launchOpcodes.includes(b.opcode) || (b.opcode && b.opcode.includes('when_board_launch'))) {
          launchBlock = b;
          break;
        }
      }
    }

    let launchBodyLines = [];
    if (launchBlock) {
      launchBodyLines = this._translateStatements(launchBlock.next, '  ');
    }

    // 3. Assemble full Arduino sketch
    const out = [];
    out.push('/**');
    out.push(' * Generated by mBlock 5 to Arduino Converter');
    out.push(` * Target Hardware: ${this.boardInfo.name}`);
    out.push(` * Arduino Board:   ${this.boardInfo.arduinoBoard}`);
    out.push(' */\n');

    // Includes
    for (const inc of this.boardInfo.includes) {
      out.push(`#include ${inc}`);
    }
    out.push('');

    // Forward declarations
    out.push('// Forward declarations');
    if (this.boardInfo.encoderMotors && (this.tracker.usedEncoders || this.tracker.usedMoveFn)) {
      out.push('void isr_process_encoder1(void);');
      out.push('void isr_process_encoder2(void);');
    }
    if (this.tracker.usedMoveFn) {
      out.push('void move(int direction, int speed);');
    }
    for (const p of procCodes) {
      out.push(p.fnHeader.replace(' {', ';'));
    }
    out.push('void _delay(float seconds);');
    out.push('void _loop();\n');

    // Devices & Sensors
    out.push('// Device & Sensor initializations');
    if (this.boardInfo.encoderMotors && (this.tracker.usedEncoders || this.tracker.usedMoveFn)) {
      out.push('MeEncoderOnBoard Encoder_1(SLOT1);');
      out.push('MeEncoderOnBoard Encoder_2(SLOT2);');
    } else if (!this.boardInfo.encoderMotors && this.tracker.usedMoveFn) {
      out.push('MeDCMotor motor_9(9);');
      out.push('MeDCMotor motor_10(10);');
    }

    const sortPorts = s => Array.from(s).sort((a, b) => parseInt(a) - parseInt(b));
    for (const port of sortPorts(this.tracker.usedUltrasonicPorts)) {
      out.push(`MeUltrasonicSensor ultrasonic_${port}(${port});`);
    }
    for (const port of sortPorts(this.tracker.usedLinefollowerPorts)) {
      out.push(`MeLineFollower linefollower_${port}(${port});`);
    }
    if (this.tracker.usedRgbRing && this.boardInfo.ledRingPin) {
      out.push(`MeRGBLed rgbled_0(0, ${this.boardInfo.ledRingCount || 12});`);
    }
    if (this.tracker.usedMcoreLed) {
      out.push('MeRGBLed rgbled_7(7, 2);');
    }
    if (this.tracker.usedGyro) {
      out.push(this.boardInfo.defaultGyro);
    }
    for (const port of sortPorts(this.tracker.usedLightsensorPorts)) {
      out.push(`MeLightSensor lightsensor_${port}(${port});`);
    }
    if (this.boardInfo.randomSeedSensor) {
      const pNum = this.boardInfo.randomSeedSensor.split('_')[1];
      if (!this.tracker.usedLightsensorPorts.has(pNum)) {
        out.push(`MeLightSensor lightsensor_${pNum}(${pNum});`);
      }
    }
    if (this.tracker.usedBuzzer) {
      out.push('MeBuzzer buzzer;');
    }
    out.push('');

    // Global Variables
    out.push('// Global Variables');
    const varKeys = Object.keys(this.variables);
    if (varKeys.length > 0) {
      for (const vid of varKeys) {
        const vinfo = this.variables[vid];
        const vname = this._sanitizeName(Array.isArray(vinfo) ? vinfo[0] : String(vinfo));
        out.push(`float ${vname} = 0;`);
      }
    } else {
      out.push('// (No user variables)');
    }
    if (this.tracker.usedTimer) {
      out.push('float _timer_offset = 0;');
    }
    out.push('');

    // Encoder ISRs
    if (this.boardInfo.encoderMotors && (this.tracker.usedEncoders || this.tracker.usedMoveFn)) {
      out.push(`void isr_process_encoder1(void) {
  if (digitalRead(Encoder_1.getPortB()) == 0) {
    Encoder_1.pulsePosMinus();
  } else {
    Encoder_1.pulsePosPlus();
  }
}

void isr_process_encoder2(void) {
  if (digitalRead(Encoder_2.getPortB()) == 0) {
    Encoder_2.pulsePosMinus();
  } else {
    Encoder_2.pulsePosPlus();
  }
}
`);
    }

    // move() helper
    if (this.tracker.usedMoveFn) {
      if (this.boardInfo.encoderMotors) {
        out.push(`// Direction control: 1=Forward, 2=Backward, 3=Left, 4=Right
void move(int direction, int speed) {
  int leftSpeed = 0;
  int rightSpeed = 0;
  if (direction == 1) {
    leftSpeed = -speed;
    rightSpeed = speed;
  } else if (direction == 2) {
    leftSpeed = speed;
    rightSpeed = -speed;
  } else if (direction == 3) {
    leftSpeed = -speed;
    rightSpeed = -speed;
  } else if (direction == 4) {
    leftSpeed = speed;
    rightSpeed = speed;
  }
  Encoder_1.setTarPWM(leftSpeed);
  Encoder_2.setTarPWM(rightSpeed);
}
`);
      } else {
        out.push(`// Direction control: 1=Forward, 2=Backward, 3=Left, 4=Right
void move(int direction, int speed) {
  int leftSpeed = 0;
  int rightSpeed = 0;
  if (direction == 1) {
    leftSpeed = speed;
    rightSpeed = speed;
  } else if (direction == 2) {
    leftSpeed = -speed;
    rightSpeed = -speed;
  } else if (direction == 3) {
    leftSpeed = -speed;
    rightSpeed = speed;
  } else if (direction == 4) {
    leftSpeed = speed;
    rightSpeed = -speed;
  }
  motor_9.run((9) == 9 ? -(leftSpeed) : (leftSpeed));
  motor_10.run((10) == 10 ? -(rightSpeed) : (rightSpeed));
}
`);
      }
    }

    // Custom Procedures
    for (const p of procCodes) {
      out.push(`// Custom Block: ${p.fnName}`);
      out.push(p.fnHeader);
      if (p.bodyLines.length > 0) {
        out.push(p.bodyLines.join('\n'));
      }
      out.push('}\n');
    }

    // _delay helper
    out.push(`// Helper: non-blocking delay keeping motor & gyro loops active
void _delay(float seconds) {
  if (seconds < 0.0) {
    seconds = 0.0;
  }
  long endTime = millis() + seconds * 1000;
  while (millis() < endTime) _loop();
}
`);

    // setup()
    out.push('void setup() {');
    if (this.boardInfo.encoderMotors && (this.tracker.usedEncoders || this.tracker.usedMoveFn)) {
      out.push('  TCCR1A = _BV(WGM10);');
      out.push('  TCCR1B = _BV(CS11) | _BV(WGM12);');
      out.push('  TCCR2A = _BV(WGM21) | _BV(WGM20);');
      out.push('  TCCR2B = _BV(CS21);');
      out.push('  attachInterrupt(Encoder_1.getIntNum(), isr_process_encoder1, RISING);');
      out.push('  attachInterrupt(Encoder_2.getIntNum(), isr_process_encoder2, RISING);');
    }

    if (this.tracker.usedRgbRing && this.boardInfo.ledRingPin) {
      out.push(`  rgbled_0.setpin(${this.boardInfo.ledRingPin});`);
      out.push('  rgbled_0.fillPixelsBak(0, 2, 1);');
    }

    if (this.tracker.usedGyro) {
      out.push('  gyro_0.begin();');
    }

    if (this.boardInfo.randomSeedSensor) {
      const sName = this.boardInfo.randomSeedSensor;
      out.push(`  randomSeed((unsigned long)(${sName}.read() * 123456));`);
    }

    if (launchBodyLines.length > 0) {
      out.push('\n  // Main code from Hat Block');
      out.push(launchBodyLines.join('\n'));
    }

    out.push('}\n');

    // _loop()
    out.push('void _loop() {');
    if (this.boardInfo.encoderMotors && (this.tracker.usedEncoders || this.tracker.usedMoveFn)) {
      out.push('  Encoder_1.loop();');
      out.push('  Encoder_2.loop();');
    }
    if (this.tracker.usedGyro) {
      out.push('  gyro_0.update();');
    }
    out.push('}\n');

    // loop()
    out.push('void loop() {');
    out.push('  _loop();');
    out.push('}');

    return {
      code: out.join('\n'),
      board: this.boardInfo,
      procedures: Object.values(this.procedures),
      variables: Object.values(this.variables).map(v => Array.isArray(v) ? v[0] : String(v)),
      hardware: {
        encoders: this.tracker.usedEncoders || (this.boardInfo.encoderMotors && this.tracker.usedMoveFn),
        gyro: this.tracker.usedGyro,
        rgbRing: this.tracker.usedRgbRing,
        mcoreLed: this.tracker.usedMcoreLed,
        ultrasonicPorts: Array.from(this.tracker.usedUltrasonicPorts),
        linefollowerPorts: Array.from(this.tracker.usedLinefollowerPorts),
        lightsensorPorts: Array.from(this.tracker.usedLightsensorPorts),
        soundsensorPorts: Array.from(this.tracker.usedSoundsensorPorts),
        buzzer: this.tracker.usedBuzzer
      }
    };
  }
}

// Export for browser and node
if (typeof window !== 'undefined') {
  window.MBlockConverter = MBlockConverter;
  window.BOARD_CONFIGS = BOARD_CONFIGS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MBlockConverter, BOARD_CONFIGS };
}
