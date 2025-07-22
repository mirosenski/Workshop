# 🚀 Schnellstart - Nachrichtenportal

## ⚡ In 3 Schritten zur Anwendung

### 1. Terminal öffnen
```bash
cd ~/projects/PTLS/t3/Workshop && code .
```

### 2. Server starten
```bash
python3 -m http.server 8000
```

### 3. Browser öffnen
Öffnen Sie **http://localhost:8000**

---

## 🎯 Alternative Befehle

### Python (Standard)
```bash
python3 -m http.server 8000
```

### Node.js
```bash
npx serve .
```

### Live-Reload (für Entwicklung)
```bash
npx live-server --port=8000
```

---

## 📋 Nützliche Befehle

| Befehl | Beschreibung |
|--------|-------------|
| `Ctrl + C` | Server stoppen |
| `python3 -m http.server 3000` | Anderen Port verwenden |
| `npx live-server` | Mit Auto-Reload |

---

## 🔗 Links

- **Anwendung**: http://localhost:8000
- **Dokumentation**: [README.md](README.md)
- **Entwicklung**: [docs/development.md](docs/development.md)
- **Barrierefreiheit**: [docs/accessibility.md](docs/accessibility.md)

---

## 🆘 Hilfe

Bei Problemen:
1. **Port prüfen**: `lsof -i :8000`
2. **Browser Console**: F12
3. **Server-Logs**: Terminal-Ausgabe
4. **Dokumentation**: README.md lesen 