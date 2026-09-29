# mBlock 5 to Arduino C++ Converter

Convert visual Scratch-based **mBlock 5** projects (`.mblock`, `.sb3`, `project.json`) into clean, native, and compilable **Arduino C++ (`.ino`)** code.

Runs **100% client-side** in your browser — zero servers, zero uploads, fast and private.

---

## 🚀 Live GitHub Pages Deployment

To host this converter on GitHub Pages:

1. **Push this repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of mBlock to Arduino converter"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - In your GitHub repository, navigate to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Branch**:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**.

3. **Open your web app**:
   - After 1–2 minutes, your web application will be live at:
     ```
     https://<your-username>.github.io/<your-repo-name>/
     ```

---

## ✨ Features

- **Instant In-Browser Conversion:** Drag and drop `.mblock`, `.sb3`, or `project.json` files directly into the browser.
- **Hardware Auto-Detection:** Automatically detects target hardware:
  - **Makeblock mBot Ranger** (Me Auriga / ATmega2560)
  - **Makeblock mBot** (mCore / ATmega328P)
  - **Makeblock MegaPi / MegaPi Pro**
  - **Makeblock Orion**
- **Sensor & Actuator Analysis:** Identifies active hardware (Encoder motors, Ultrasonic sensors, Gyroscope / IMU, Line Follower, RGB LED Ring, Light sensor, Buzzer).
- **Procedures & Variables:** Converts Scratch "My Blocks" into structured C++ functions with typed parameters (`double`, `bool`, `String`) and declares global variables.
- **One-Click Export:**
  - Copy C++ code to clipboard.
  - Download as a standalone `.ino` file.
  - Download as an **Arduino IDE Sketch Folder (ZIP)** formatted for 1-click opening in the Arduino IDE.
- **Offline Capable:** Works offline as a static HTML/JS file without requiring an internet connection.

---

## 🐍 Command Line Converter (Python)

A standalone Python script is also provided for batch or command-line conversions:

```bash
# Auto-detects .mblock in the current folder
python mblock_to_arduino.py

# Convert a specific file
python mblock_to_arduino.py robotik.mblock

# Specify custom output path
python mblock_to_arduino.py robotik.mblock -o custom_sketch.ino

# Force a specific board target (auriga, mcore, megapi, orion)
python mblock_to_arduino.py robotik.mblock --board mcore
```

---

## 🛠 Compiling in Arduino IDE

1. Open the downloaded `.ino` sketch in **Arduino IDE**.
2. Go to **Sketch > Include Library > Manage Libraries...** and install **Makeblock**.
3. Go to **Tools > Board** and select your board:
   - For **Me Auriga (mBot Ranger)**: `Arduino Mega or Mega 2560`
   - For **mCore (mBot)**: `Arduino Uno`
4. Connect the robot via USB and click **Upload (➔)**.
