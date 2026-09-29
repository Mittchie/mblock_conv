// Embedded sample robotik.mblock project\nwindow.SAMPLE_ROBOTIK_PROJECT = {
  "targets": [
    {
      "isStage": true,
      "name": "Stage",
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "comments": {},
      "currentCostume": 0,
      "costumes": [
        {
          "name": "backdrop1",
          "dataFormat": "svg",
          "assetId": "17de46c9724828fbe0c199648cfe8579",
          "md5ext": "17de46c9724828fbe0c199648cfe8579.svg",
          "rotationCenterX": 240,
          "rotationCenterY": 180
        }
      ],
      "sounds": [
        {
          "name": "pop",
          "assetId": "83a9787d4cb6f3b7632b4ddfebf74367",
          "dataFormat": "wav",
          "format": "",
          "rate": 48000,
          "sampleCount": 1123,
          "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }
      ],
      "volume": 100,
      "layerOrder": 0,
      "tempo": 60,
      "videoTransparency": 50,
      "videoState": "off",
      "textToSpeechLanguage": null
    },
    {
      "isStage": false,
      "name": "Panda",
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "comments": {},
      "currentCostume": 0,
      "costumes": [
        {
          "name": "costume1",
          "bitmapResolution": 1,
          "dataFormat": "svg",
          "assetId": "fb1d4d05079092f85e037530303e1941",
          "md5ext": "fb1d4d05079092f85e037530303e1941.svg",
          "rotationCenterX": 60,
          "rotationCenterY": 60
        },
        {
          "name": "costume2",
          "bitmapResolution": 1,
          "dataFormat": "svg",
          "assetId": "1828582f8a2212f26fa082d46b00714c",
          "md5ext": "1828582f8a2212f26fa082d46b00714c.svg",
          "rotationCenterX": 60,
          "rotationCenterY": 60
        }
      ],
      "sounds": [
        {
          "name": "meow",
          "assetId": "83c36d806dc92327b9e7049a565c6bff",
          "dataFormat": "wav",
          "format": "",
          "rate": 48000,
          "sampleCount": 40681,
          "md5ext": "83c36d806dc92327b9e7049a565c6bff.wav"
        }
      ],
      "volume": 100,
      "layerOrder": 1,
      "visible": true,
      "x": 0,
      "y": 0,
      "size": 100,
      "direction": 90,
      "draggable": false,
      "rotationStyle": "all around",
      "deviceId": null,
      "loadedExtIds": [],
      "editorMode": "block",
      "codes": null,
      "codeTypes": [
        "python"
      ]
    },
    {
      "isStage": false,
      "name": "cyberpi",
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "comments": {},
      "currentCostume": 0,
      "costumes": [
        {
          "name": "cyberpi",
          "bitmapResolution": 1,
          "dataFormat": "svg",
          "assetId": "2982fc8705b563ff942c3eba3cb6358b",
          "md5ext": "2982fc8705b563ff942c3eba3cb6358b.svg",
          "rotationCenterX": 47,
          "rotationCenterY": 55
        }
      ],
      "sounds": [],
      "volume": 100,
      "layerOrder": 2,
      "visible": false,
      "x": 0,
      "y": 0,
      "size": 100,
      "direction": 90,
      "draggable": false,
      "rotationStyle": "all around",
      "deviceId": "cyberpi",
      "loadedExtIds": [],
      "editorMode": "block",
      "codes": null,
      "codeTypes": [
        "python"
      ],
      "online": true
    },
    {
      "isStage": false,
      "name": "auriga",
      "variables": {
        "]714C@^efKgHN,@QX.EB": [
          "GYRO TARGET",
          0
        ]
      },
      "lists": {},
      "broadcasts": {},
      "blocks": {
        "JhMK(85)c9AI=jC)Y{Xe": {
          "opcode": "auriga.auriga_event_external_linefollower",
          "next": null,
          "parent": "kmjJ5D#SF@aiIO2qAi|@",
          "inputs": {},
          "fields": {
            "PORT": [
              "10",
              null
            ],
            "LINEFOLLOW_STATE": [
              "2",
              null
            ],
            "BLACK_WHITE": [
              "0",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "HeSv-bn+L5F5/,WWaC,=": {
          "opcode": "control_if_else",
          "next": null,
          "parent": "X_]#VxgckgI1/^G]BxLg",
          "inputs": {
            "CONDITION": [
              2,
              "kmjJ5D#SF@aiIO2qAi|@"
            ],
            "SUBSTACK": [
              2,
              "Iu:4wht)VX?s*$-O(W{|"
            ],
            "SUBSTACK2": [
              2,
              "G9+SVz1ycLNg0BZu4bwC"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "G9+SVz1ycLNg0BZu4bwC": {
          "opcode": "control_if_else",
          "next": null,
          "parent": "HeSv-bn+L5F5/,WWaC,=",
          "inputs": {
            "CONDITION": [
              2,
              "DosWJL5/Y:xnD,q$w51z"
            ],
            "SUBSTACK": [
              2,
              "+G7J^@,H4OiEv;Mw$9ov"
            ],
            "SUBSTACK2": [
              2,
              "f$^4PrTJ0YV??b4mbjeH"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "d#j~NHS#`;k?LmI4T)c4": {
          "opcode": "auriga.auriga_event_external_linefollower",
          "next": null,
          "parent": "kmjJ5D#SF@aiIO2qAi|@",
          "inputs": {},
          "fields": {
            "PORT": [
              "10",
              null
            ],
            "LINEFOLLOW_STATE": [
              "1",
              null
            ],
            "BLACK_WHITE": [
              "0",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "kmjJ5D#SF@aiIO2qAi|@": {
          "opcode": "operator_and",
          "next": null,
          "parent": "HeSv-bn+L5F5/,WWaC,=",
          "inputs": {
            "OPERAND2": [
              2,
              "JhMK(85)c9AI=jC)Y{Xe"
            ],
            "OPERAND1": [
              2,
              "d#j~NHS#`;k?LmI4T)c4"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "-1E}M6m}v-5(dYLj3XXI": {
          "opcode": "control_forever",
          "next": null,
          "parent": "/EN3wCVaP_/BP5Cmgtgv",
          "inputs": {
            "SUBSTACK": [
              2,
              "1bTk_JGLi{PZ8W9%a%qC"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "69zh$PIS(pjCn/Nmx+uZ": {
          "opcode": "auriga.auriga_event_external_linefollower",
          "next": null,
          "parent": "DosWJL5/Y:xnD,q$w51z",
          "inputs": {},
          "fields": {
            "PORT": [
              "10",
              null
            ],
            "LINEFOLLOW_STATE": [
              "2",
              null
            ],
            "BLACK_WHITE": [
              "0",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "DosWJL5/Y:xnD,q$w51z": {
          "opcode": "operator_and",
          "next": null,
          "parent": "G9+SVz1ycLNg0BZu4bwC",
          "inputs": {
            "OPERAND1": [
              2,
              "69zh$PIS(pjCn/Nmx+uZ"
            ],
            "OPERAND2": [
              2,
              ".*;lk=8w9LjqJFz49i;A"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        ".*;lk=8w9LjqJFz49i;A": {
          "opcode": "auriga.auriga_event_external_linefollower",
          "next": null,
          "parent": "DosWJL5/Y:xnD,q$w51z",
          "inputs": {},
          "fields": {
            "PORT": [
              "10",
              null
            ],
            "LINEFOLLOW_STATE": [
              "1",
              null
            ],
            "BLACK_WHITE": [
              "1",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "f$^4PrTJ0YV??b4mbjeH": {
          "opcode": "control_if",
          "next": null,
          "parent": "G9+SVz1ycLNg0BZu4bwC",
          "inputs": {
            "CONDITION": [
              2,
              "W{42?*(+E**o(15Pnp~="
            ],
            "SUBSTACK": [
              2,
              "hTdpNp}.lwF.4xL^w+zX"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "W{42?*(+E**o(15Pnp~=": {
          "opcode": "operator_and",
          "next": null,
          "parent": "f$^4PrTJ0YV??b4mbjeH",
          "inputs": {
            "OPERAND1": [
              2,
              ":?]h_k;:(WFZ02+[Jy0T"
            ],
            "OPERAND2": [
              2,
              "L;y~Y|fgOB#$;qB;qB8{"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        ":?]h_k;:(WFZ02+[Jy0T": {
          "opcode": "auriga.auriga_event_external_linefollower",
          "next": null,
          "parent": "W{42?*(+E**o(15Pnp~=",
          "inputs": {},
          "fields": {
            "PORT": [
              "10",
              null
            ],
            "LINEFOLLOW_STATE": [
              "2",
              null
            ],
            "BLACK_WHITE": [
              "1",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "L;y~Y|fgOB#$;qB;qB8{": {
          "opcode": "auriga.auriga_event_external_linefollower",
          "next": null,
          "parent": "W{42?*(+E**o(15Pnp~=",
          "inputs": {},
          "fields": {
            "PORT": [
              "10",
              null
            ],
            "LINEFOLLOW_STATE": [
              "1",
              null
            ],
            "BLACK_WHITE": [
              "0",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "/EN3wCVaP_/BP5Cmgtgv": {
          "opcode": "auriga.auriga_when_board_launch",
          "next": "-1E}M6m}v-5(dYLj3XXI",
          "parent": null,
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": 898,
          "y": 696
        },
        "y7Ov*Rr[-R5FI~;?YUIN": {
          "opcode": "auriga.auriga_move",
          "next": null,
          "parent": "Iu:4wht)VX?s*$-O(W{|",
          "inputs": {
            "POWER": [
              1,
              [
                4,
                "70"
              ]
            ]
          },
          "fields": {
            "MOVE_DIRECTION": [
              "1",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "Iu:4wht)VX?s*$-O(W{|": {
          "opcode": "auriga.auriga_show_all_led",
          "next": "y7Ov*Rr[-R5FI~;?YUIN",
          "parent": "HeSv-bn+L5F5/,WWaC,=",
          "inputs": {
            "COLOR": [
              1,
              [
                9,
                "#ff0000"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "+G7J^@,H4OiEv;Mw$9ov": {
          "opcode": "auriga.auriga_show_all_led",
          "next": "e[gBOFB)@W19*bOxD2i9",
          "parent": "G9+SVz1ycLNg0BZu4bwC",
          "inputs": {
            "COLOR": [
              1,
              [
                9,
                "#7fff00"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "hTdpNp}.lwF.4xL^w+zX": {
          "opcode": "auriga.auriga_show_all_led",
          "next": "YFz_133}y(*qR5yPQmh0",
          "parent": "f$^4PrTJ0YV??b4mbjeH",
          "inputs": {
            "COLOR": [
              1,
              [
                9,
                "#1d00ff"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "e[gBOFB)@W19*bOxD2i9": {
          "opcode": "auriga.auriga_move_wheel_speed",
          "next": null,
          "parent": "+G7J^@,H4OiEv;Mw$9ov",
          "inputs": {
            "POWER_LEFT": [
              1,
              [
                4,
                "-30"
              ]
            ],
            "POWER_RIGHT": [
              1,
              [
                4,
                "60"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "YFz_133}y(*qR5yPQmh0": {
          "opcode": "auriga.auriga_move_wheel_speed",
          "next": null,
          "parent": "hTdpNp}.lwF.4xL^w+zX",
          "inputs": {
            "POWER_LEFT": [
              1,
              [
                4,
                "60"
              ]
            ],
            "POWER_RIGHT": [
              1,
              [
                4,
                "-30"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "X_]#VxgckgI1/^G]BxLg": {
          "opcode": "procedures_definition",
          "next": "HeSv-bn+L5F5/,WWaC,=",
          "parent": null,
          "inputs": {
            "custom_block": [
              1,
              "C%g_olMU_8-|?3O]Af@,"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": 1660,
          "y": -215
        },
        "C%g_olMU_8-|?3O]Af@,": {
          "opcode": "procedures_prototype",
          "next": null,
          "parent": "X_]#VxgckgI1/^G]BxLg",
          "inputs": {},
          "fields": {},
          "shadow": true,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "line follower",
            "argumentids": "[]",
            "argumentnames": "[]",
            "argumentdefaults": "[]",
            "warp": "false"
          }
        },
        "B5}9u+%zEo{^h0gPNAYT": {
          "opcode": "procedures_call",
          "next": null,
          "parent": "1bTk_JGLi{PZ8W9%a%qC",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "line follower",
            "argumentids": "[]",
            "warp": "false"
          }
        },
        "Ax.x}Ob#rr3)vmyN3F^D": {
          "opcode": "procedures_definition",
          "next": "NIMS+JO{Bw],MuPDg_eo",
          "parent": null,
          "inputs": {
            "custom_block": [
              1,
              "-0Or4qHg5yG!;7N=?G5M"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": 875,
          "y": -236
        },
        "-0Or4qHg5yG!;7N=?G5M": {
          "opcode": "procedures_prototype",
          "next": null,
          "parent": "Ax.x}Ob#rr3)vmyN3F^D",
          "inputs": {},
          "fields": {},
          "shadow": true,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "avoidance",
            "argumentids": "[]",
            "argumentnames": "[]",
            "argumentdefaults": "[]",
            "warp": "false"
          }
        },
        "1bTk_JGLi{PZ8W9%a%qC": {
          "opcode": "procedures_call",
          "next": "B5}9u+%zEo{^h0gPNAYT",
          "parent": "-1E}M6m}v-5(dYLj3XXI",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "avoidance",
            "argumentids": "[]",
            "warp": "false"
          }
        },
        "NIMS+JO{Bw],MuPDg_eo": {
          "opcode": "control_if",
          "next": null,
          "parent": "Ax.x}Ob#rr3)vmyN3F^D",
          "inputs": {
            "CONDITION": [
              2,
              "g+G}+GZoHMkx%=~--;(`"
            ],
            "SUBSTACK": [
              2,
              "yj{[OC!k6n5ZONgqBUMv"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        ",/!I~DoD;)@tF}s,+o.f": {
          "opcode": "auriga.auriga_detect_external_ultrasonic",
          "next": null,
          "parent": "g+G}+GZoHMkx%=~--;(`",
          "inputs": {},
          "fields": {
            "PORT": [
              "10",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "g+G}+GZoHMkx%=~--;(`": {
          "opcode": "operator_gt",
          "next": null,
          "parent": "NIMS+JO{Bw],MuPDg_eo",
          "inputs": {
            "OPERAND1": [
              3,
              ",/!I~DoD;)@tF}s,+o.f",
              [
                4,
                ""
              ]
            ],
            "OPERAND2": [
              1,
              [
                4,
                "10"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        ":92eTkbLZ!cF(T}h)aiq": {
          "opcode": "auriga.auriga_detect_board_gyro_angle",
          "next": null,
          "parent": "SUYlo[9^7QT=lvt0}4ix",
          "inputs": {},
          "fields": {
            "AXIS": [
              "3",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "XNTL;HsuS2n+xr@+d:[R": {
          "opcode": "procedures_definition",
          "next": "..wo2a2%-W!7AVFdPFfi",
          "parent": null,
          "inputs": {
            "custom_block": [
              1,
              "3s{b~zmrVu@9HP%I?Z|^"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": 1674,
          "y": 549
        },
        "3s{b~zmrVu@9HP%I?Z|^": {
          "opcode": "procedures_prototype",
          "next": null,
          "parent": "XNTL;HsuS2n+xr@+d:[R",
          "inputs": {
            "qsbU`9R9s8xr*Y54^MuC": [
              1,
              "gg-(BMAn`0$Q#MW]:by]"
            ]
          },
          "fields": {},
          "shadow": true,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "gyro target %n",
            "argumentids": "[\"qsbU`9R9s8xr*Y54^MuC\"]",
            "argumentnames": "[\"cislo\"]",
            "argumentdefaults": "[\"todo\"]",
            "warp": "false"
          }
        },
        "gg-(BMAn`0$Q#MW]:by]": {
          "opcode": "argument_reporter_string_number",
          "next": null,
          "parent": "3s{b~zmrVu@9HP%I?Z|^",
          "inputs": {},
          "fields": {
            "VALUE": [
              "cislo",
              null
            ]
          },
          "shadow": true,
          "topLevel": false
        },
        "#CWro-JF6e2gRhBWiD3}": {
          "opcode": "argument_reporter_string_number",
          "next": null,
          "parent": "SUYlo[9^7QT=lvt0}4ix",
          "inputs": {},
          "fields": {
            "VALUE": [
              "cislo",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "xWfZu`,[NOJ-gSOHugHy": {
          "opcode": "control_if",
          "next": ":4A}_A38kVsiAg1sZB6|",
          "parent": "..wo2a2%-W!7AVFdPFfi",
          "inputs": {
            "CONDITION": [
              2,
              "dD:Jn?!0JG]kqS7^FB6x"
            ],
            "SUBSTACK": [
              2,
              "q*hK!n^/w/2!-svP:Se_"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "SUYlo[9^7QT=lvt0}4ix": {
          "opcode": "operator_add",
          "next": null,
          "parent": "..wo2a2%-W!7AVFdPFfi",
          "inputs": {
            "NUM1": [
              3,
              ":92eTkbLZ!cF(T}h)aiq",
              [
                4,
                ""
              ]
            ],
            "NUM2": [
              3,
              "#CWro-JF6e2gRhBWiD3}",
              [
                4,
                ""
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "..wo2a2%-W!7AVFdPFfi": {
          "opcode": "data_setvariableto",
          "next": "xWfZu`,[NOJ-gSOHugHy",
          "parent": "XNTL;HsuS2n+xr@+d:[R",
          "inputs": {
            "VALUE": [
              3,
              "SUYlo[9^7QT=lvt0}4ix",
              [
                10,
                "0"
              ]
            ]
          },
          "fields": {
            "VARIABLE": [
              "GYRO TARGET",
              "]714C@^efKgHN,@QX.EB"
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "dD:Jn?!0JG]kqS7^FB6x": {
          "opcode": "operator_gt",
          "next": null,
          "parent": "xWfZu`,[NOJ-gSOHugHy",
          "inputs": {
            "OPERAND1": [
              3,
              [
                12,
                "GYRO TARGET",
                "]714C@^efKgHN,@QX.EB"
              ],
              [
                4,
                ""
              ]
            ],
            "OPERAND2": [
              1,
              [
                4,
                "180"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "q*hK!n^/w/2!-svP:Se_": {
          "opcode": "data_setvariableto",
          "next": null,
          "parent": "xWfZu`,[NOJ-gSOHugHy",
          "inputs": {
            "VALUE": [
              3,
              "/}wRB7I;wl4{7;CW.(E2",
              [
                10,
                "0"
              ]
            ]
          },
          "fields": {
            "VARIABLE": [
              "GYRO TARGET",
              "]714C@^efKgHN,@QX.EB"
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "/}wRB7I;wl4{7;CW.(E2": {
          "opcode": "operator_subtract",
          "next": null,
          "parent": "q*hK!n^/w/2!-svP:Se_",
          "inputs": {
            "NUM1": [
              3,
              [
                12,
                "GYRO TARGET",
                "]714C@^efKgHN,@QX.EB"
              ],
              [
                4,
                ""
              ]
            ],
            "NUM2": [
              1,
              [
                4,
                "360"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        ":4A}_A38kVsiAg1sZB6|": {
          "opcode": "control_if",
          "next": null,
          "parent": "xWfZu`,[NOJ-gSOHugHy",
          "inputs": {
            "CONDITION": [
              2,
              "h6I!R*[/,~|-Q,/-McaS"
            ],
            "SUBSTACK": [
              2,
              "ZbNt)3OsO[dojjSP!9#B"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "h6I!R*[/,~|-Q,/-McaS": {
          "opcode": "operator_gt",
          "next": null,
          "parent": ":4A}_A38kVsiAg1sZB6|",
          "inputs": {
            "OPERAND1": [
              1,
              [
                4,
                "0"
              ]
            ],
            "OPERAND2": [
              3,
              [
                12,
                "GYRO TARGET",
                "]714C@^efKgHN,@QX.EB"
              ],
              [
                4,
                "50"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "ZbNt)3OsO[dojjSP!9#B": {
          "opcode": "data_setvariableto",
          "next": null,
          "parent": ":4A}_A38kVsiAg1sZB6|",
          "inputs": {
            "VALUE": [
              3,
              "#EJBs=}QxU*U2SZb;#eU",
              [
                10,
                "0"
              ]
            ]
          },
          "fields": {
            "VARIABLE": [
              "GYRO TARGET",
              "]714C@^efKgHN,@QX.EB"
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "#EJBs=}QxU*U2SZb;#eU": {
          "opcode": "operator_add",
          "next": null,
          "parent": "ZbNt)3OsO[dojjSP!9#B",
          "inputs": {
            "NUM1": [
              3,
              [
                12,
                "GYRO TARGET",
                "]714C@^efKgHN,@QX.EB"
              ],
              [
                4,
                ""
              ]
            ],
            "NUM2": [
              1,
              [
                4,
                "360"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "RY;=xaAQn%qJr5q_mv@k": {
          "opcode": "procedures_call",
          "next": "L6)UbI_j`~830eV`Gx_6",
          "parent": "OrJg/Mp-s-J#^x*(:RkB",
          "inputs": {
            "qsbU`9R9s8xr*Y54^MuC": [
              1,
              [
                4,
                "-90"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "gyro target %n",
            "argumentids": "[\"qsbU`9R9s8xr*Y54^MuC\"]",
            "warp": "false"
          }
        },
        "Ij/Mrf`c%%Fec,mvhy.%": {
          "opcode": "operator_gt",
          "next": null,
          "parent": "L6)UbI_j`~830eV`Gx_6",
          "inputs": {
            "OPERAND1": [
              3,
              "C7Hf)rOcj`oNOXki!=]#",
              [
                4,
                ""
              ]
            ],
            "OPERAND2": [
              3,
              [
                12,
                "GYRO TARGET",
                "]714C@^efKgHN,@QX.EB"
              ],
              [
                4,
                "50"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "C7Hf)rOcj`oNOXki!=]#": {
          "opcode": "auriga.auriga_detect_board_gyro_angle",
          "next": null,
          "parent": "Ij/Mrf`c%%Fec,mvhy.%",
          "inputs": {},
          "fields": {
            "AXIS": [
              "3",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "c+m,A3N*d?!K1}yo9$lQ": {
          "opcode": "auriga.auriga_move",
          "next": null,
          "parent": "L6)UbI_j`~830eV`Gx_6",
          "inputs": {
            "POWER": [
              1,
              [
                4,
                "50"
              ]
            ]
          },
          "fields": {
            "MOVE_DIRECTION": [
              "4",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "L6)UbI_j`~830eV`Gx_6": {
          "opcode": "control_repeat_until",
          "next": null,
          "parent": "RY;=xaAQn%qJr5q_mv@k",
          "inputs": {
            "CONDITION": [
              2,
              "Ij/Mrf`c%%Fec,mvhy.%"
            ],
            "SUBSTACK": [
              2,
              "c+m,A3N*d?!K1}yo9$lQ"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "O22ht7]@N/t.JXt0t+]V": {
          "opcode": "procedures_definition",
          "next": "bJO,Nc^ywx6nXWr/XTYX",
          "parent": null,
          "inputs": {
            "custom_block": [
              1,
              "?~9L@mFJ^%05F9S%M.Be"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": 1693,
          "y": -608
        },
        "?~9L@mFJ^%05F9S%M.Be": {
          "opcode": "procedures_prototype",
          "next": null,
          "parent": "O22ht7]@N/t.JXt0t+]V",
          "inputs": {},
          "fields": {},
          "shadow": true,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "OTOCENI_DOLEVA",
            "argumentids": "[]",
            "argumentnames": "[]",
            "argumentdefaults": "[]",
            "warp": "false"
          }
        },
        "OrJg/Mp-s-J#^x*(:RkB": {
          "opcode": "procedures_definition",
          "next": "RY;=xaAQn%qJr5q_mv@k",
          "parent": null,
          "inputs": {
            "custom_block": [
              1,
              "+2}cSq8|D4a:(^^fguld"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": 866,
          "y": -609
        },
        "+2}cSq8|D4a:(^^fguld": {
          "opcode": "procedures_prototype",
          "next": null,
          "parent": "OrJg/Mp-s-J#^x*(:RkB",
          "inputs": {},
          "fields": {},
          "shadow": true,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "OTOCENI_DOPRAVA",
            "argumentids": "[]",
            "argumentnames": "[]",
            "argumentdefaults": "[]",
            "warp": "false"
          }
        },
        "bJO,Nc^ywx6nXWr/XTYX": {
          "opcode": "procedures_call",
          "next": "`Xy_/(;kyMF(5w4A]5Z-",
          "parent": "O22ht7]@N/t.JXt0t+]V",
          "inputs": {
            "qsbU`9R9s8xr*Y54^MuC": [
              1,
              [
                4,
                "90"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "gyro target %n",
            "argumentids": "[\"qsbU`9R9s8xr*Y54^MuC\"]",
            "warp": "false"
          }
        },
        "`Xy_/(;kyMF(5w4A]5Z-": {
          "opcode": "control_repeat_until",
          "next": null,
          "parent": "bJO,Nc^ywx6nXWr/XTYX",
          "inputs": {
            "CONDITION": [
              2,
              ";!q,pP?I0miV1v~oWKTf"
            ],
            "SUBSTACK": [
              2,
              "4x{S4[QJkU@4!:}_#0Sz"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        ";!q,pP?I0miV1v~oWKTf": {
          "opcode": "operator_gt",
          "next": null,
          "parent": "`Xy_/(;kyMF(5w4A]5Z-",
          "inputs": {
            "OPERAND1": [
              3,
              "-2{a.@3p;gXS-o?xU_NQ",
              [
                4,
                ""
              ]
            ],
            "OPERAND2": [
              3,
              [
                12,
                "GYRO TARGET",
                "]714C@^efKgHN,@QX.EB"
              ],
              [
                4,
                "50"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "-2{a.@3p;gXS-o?xU_NQ": {
          "opcode": "auriga.auriga_detect_board_gyro_angle",
          "next": null,
          "parent": ";!q,pP?I0miV1v~oWKTf",
          "inputs": {},
          "fields": {
            "AXIS": [
              "3",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "4x{S4[QJkU@4!:}_#0Sz": {
          "opcode": "auriga.auriga_move",
          "next": null,
          "parent": "`Xy_/(;kyMF(5w4A]5Z-",
          "inputs": {
            "POWER": [
              1,
              [
                4,
                "50"
              ]
            ]
          },
          "fields": {
            "MOVE_DIRECTION": [
              "3",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "yj{[OC!k6n5ZONgqBUMv": {
          "opcode": "procedures_call",
          "next": "+5.m;[_uP=rUN0$/EHbF",
          "parent": "NIMS+JO{Bw],MuPDg_eo",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "OTOCENI_DOPRAVA",
            "argumentids": "[]",
            "warp": "false"
          }
        },
        "kWg`z%gIR/IU0I0Ha#D%": {
          "opcode": "procedures_call",
          "next": "WW!M2qLRWF}ki[]B9#TF",
          "parent": "+5.m;[_uP=rUN0$/EHbF",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "OTOCENI_DOLEVA",
            "argumentids": "[]",
            "warp": "false"
          }
        },
        "WW!M2qLRWF}ki[]B9#TF": {
          "opcode": "control_forever",
          "next": null,
          "parent": "kWg`z%gIR/IU0I0Ha#D%",
          "inputs": {
            "SUBSTACK": [
              2,
              "5@M66(Va.V]mPZq:w2O^"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "Qq2:Up|HJBQojHxGyf#b": {
          "opcode": "procedures_call",
          "next": "i(B{:^WC05H7lwG($_YX",
          "parent": "5@M66(Va.V]mPZq:w2O^",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "OTOCENI_DOLEVA",
            "argumentids": "[]",
            "warp": "false"
          }
        },
        "?G9Pn6dyl@62Fc,P$7Xu": {
          "opcode": "operator_gt",
          "next": null,
          "parent": "i(B{:^WC05H7lwG($_YX",
          "inputs": {
            "OPERAND1": [
              3,
              ")qrej)YZ7PZ(qh#UCaub",
              [
                4,
                ""
              ]
            ],
            "OPERAND2": [
              1,
              [
                4,
                "20"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        ")qrej)YZ7PZ(qh#UCaub": {
          "opcode": "auriga.auriga_detect_external_ultrasonic",
          "next": null,
          "parent": "?G9Pn6dyl@62Fc,P$7Xu",
          "inputs": {},
          "fields": {
            "PORT": [
              "10",
              null
            ]
          },
          "shadow": false,
          "topLevel": false
        },
        "T(TdT~(TYO%y20n`a.2P": {
          "opcode": "procedures_call",
          "next": "qpi}8]*Dcfx?suT~k)cw",
          "parent": "KndZa~l_vtS*n;T^6ljL",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "OTOCENI_DOPRAVA",
            "argumentids": "[]",
            "warp": "false"
          }
        },
        "qpi}8]*Dcfx?suT~k)cw": {
          "opcode": "control_break_new",
          "next": null,
          "parent": "T(TdT~(TYO%y20n`a.2P",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "i(B{:^WC05H7lwG($_YX": {
          "opcode": "control_if_else",
          "next": null,
          "parent": "Qq2:Up|HJBQojHxGyf#b",
          "inputs": {
            "SUBSTACK": [
              2,
              "KndZa~l_vtS*n;T^6ljL"
            ],
            "CONDITION": [
              2,
              "?G9Pn6dyl@62Fc,P$7Xu"
            ],
            "SUBSTACK2": [
              2,
              "*e5TX=j+w%d^pW|m[:XJ"
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "+5.m;[_uP=rUN0$/EHbF": {
          "opcode": "auriga.auriga_forward_time",
          "next": "kWg`z%gIR/IU0I0Ha#D%",
          "parent": "yj{[OC!k6n5ZONgqBUMv",
          "inputs": {
            "POWER": [
              1,
              [
                4,
                "50"
              ]
            ],
            "TIME": [
              1,
              [
                4,
                "1"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "5@M66(Va.V]mPZq:w2O^": {
          "opcode": "auriga.auriga_forward_time",
          "next": "Qq2:Up|HJBQojHxGyf#b",
          "parent": "WW!M2qLRWF}ki[]B9#TF",
          "inputs": {
            "POWER": [
              1,
              [
                4,
                "50"
              ]
            ],
            "TIME": [
              1,
              [
                4,
                "1"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "KndZa~l_vtS*n;T^6ljL": {
          "opcode": "auriga.auriga_forward_time",
          "next": "T(TdT~(TYO%y20n`a.2P",
          "parent": "i(B{:^WC05H7lwG($_YX",
          "inputs": {
            "POWER": [
              1,
              [
                4,
                "50"
              ]
            ],
            "TIME": [
              1,
              [
                4,
                "1"
              ]
            ]
          },
          "fields": {},
          "shadow": false,
          "topLevel": false
        },
        "*e5TX=j+w%d^pW|m[:XJ": {
          "opcode": "procedures_call",
          "next": null,
          "parent": "i(B{:^WC05H7lwG($_YX",
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": false,
          "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "OTOCENI_DOPRAVA",
            "argumentids": "[]",
            "warp": "false"
          }
        }
      },
      "comments": {},
      "currentCostume": 0,
      "costumes": [
        {
          "name": "auriga",
          "bitmapResolution": 1,
          "dataFormat": "svg",
          "assetId": "2982fc8705b563ff942c3eba3cb6358b",
          "md5ext": "2982fc8705b563ff942c3eba3cb6358b.svg",
          "rotationCenterX": 47,
          "rotationCenterY": 55
        }
      ],
      "sounds": [],
      "volume": 100,
      "layerOrder": 3,
      "visible": false,
      "x": 0,
      "y": 0,
      "size": 100,
      "direction": 90,
      "draggable": false,
      "rotationStyle": "all around",
      "deviceId": "auriga",
      "loadedExtIds": [],
      "editorMode": "block",
      "codes": null,
      "codeTypes": [
        "arduinoc"
      ],
      "online": false
    }
  ],
  "monitors": [
    {
      "id": "]714C@^efKgHN,@QX.EB",
      "mode": "default",
      "opcode": "data_variable",
      "params": {
        "VARIABLE": "GYRO TARGET"
      },
      "spriteName": "auriga",
      "value": 0,
      "width": 106.07916259765625,
      "height": 16.333332061767578,
      "x": 5,
      "y": 5,
      "visible": true,
      "sliderMin": 0,
      "sliderMax": 100,
      "isDiscrete": true
    }
  ],
  "extensions": [
    "auriga-auriga"
  ],
  "meta": {
    "semver": "3.0.0",
    "vm": "2.0.13",
    "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) mblock/5.6.0 Chrome/106.0.5249.199 Electron/21.4.4 Safari/537.36"
  }
};\n