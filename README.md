# CyberQuest
A pixel-art cybersecurity educational game that teaches both offensive and defensive security skills through interactive lessons and quizzes.

---

## Stack
| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python 3 + Flask |
| Database | SQLite (built into Python — no install needed) |
| Password Hashing | bcrypt |

---

## Project Structure
```
cyberquest\
  app.py                  ← Main application (all game logic + content)
  requirements.txt        ← Python packages to install
  cyberquest.db           ← Database (auto-created on first run, don't edit)
  templates\
    base.html             ← Shared page layout
    index.html            ← Login / Sign Up page
    stages.html           ← Stage selection
    lesson.html           ← Lesson slide viewer
    quiz.html             ← Multiple choice quiz
  static\
    css\
      style.css           ← All styling
    js\
      main.js             ← Shared util
      auth.js             ← Login / register logic
      stages.js           ← Stage grid
      lesson.js           ← Slide nav
      quiz.js             ← Quiz logic + results
    images\
      logo.png            ← CyberQuest logo
```

---

## Setup (First Time Only)

### 1. Install Python

### 2. Open a terminal in the project folder
In Files, go to the `cyberquest` folder.
Click the address bar, type `cmd`, press Enter.

### 3. Create a virtual environment
```
python -m venv venv
venv\Scripts\activate
```
Your prompt should now show `(venv)`.

### 4. Install dependencies
```
pip install -r requirements.txt
```

### 5. Run the game
```
python app.py
```

### 6. Open in browser
Go to: **http://localhost:5000**

The database file `cyberquest.db` is created automatically on first run.

---

## Running It After First Setup
Each time you want to play:
```
venv\Scripts\activate
python app.py
```
Then open **http://localhost:5000**

To stop the server: press `CTRL + C`

---

## Game Content

### ⚔️ Hacking Track
| Stage | Topic |
|---|---|
| 1 | Reconnaissance & OSINT |
| 2 | Phishing Attacks |
| 3 | Password Attacks |
| 4 | Network Scanning |

### 🛡️ Defence Track
| Stage | Topic |
|---|---|
| 1 | Password Security & MFA |
| 2 | Anti-Phishing |
| 3 | Network Defence |
| 4 | Incident Response |

Each stage has **6 lesson slides** followed by a **5-question quiz**.
Pass mark is **80%** (4/5 correct) to unlock the next stage.
Both paths are independent — you can play them in any order.

---

## Troubleshooting
| Problem | Fix |
|---|---|
| `python not found` | Reinstall Python and tick "Add to PATH" |
| `(venv)` not showing | Run `venv\Scripts\activate` again |
| `No module named flask` | Make sure `(venv)` is active before running pip install |
| Page won't load | Check the terminal — make sure `python app.py` is still running |
| Port already in use | Change last line of `app.py` to `app.run(debug=True, port=5001)` and visit `localhost:5001` |
