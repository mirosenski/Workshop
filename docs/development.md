# Entwicklungsdokumentation

## 🚀 Schnellstart

### 1. Repository klonen
```bash
git clone [repository-url]
cd ~/projects/PTLS/t3/Workshop
```

### 2. Anwendung starten
```bash
python3 -m http.server 8000
```

### 3. Browser öffnen
Öffnen Sie **http://localhost:8000** in Ihrem Browser

## 🛠️ Entwicklungsumgebung

### Voraussetzungen
- **Python 3** (für HTTP Server)
- **Node.js** (optional, für erweiterte Tools)
- **Git** (für Versionskontrolle)
- **Moderner Browser** (Chrome, Firefox, Safari, Edge)

### Empfohlene Tools
```bash
# Node.js Tools installieren
npm install -g live-server
npm install -g browser-sync
npm install -g http-server
```

## 📋 Server-Optionen

### Python HTTP Server (Standard)
```bash
# Einfacher Start
python3 -m http.server 8000

# Mit spezifischem Host
python3 -m http.server 8000 --bind 0.0.0.0

# Anderer Port
python3 -m http.server 3000
```

### Node.js Server
```bash
# Einfacher Server
npx serve .

# HTTP Server
npx http-server

# Live Server (mit Auto-Reload)
npx live-server --port=8000

# Browser-Sync (mit mehreren Browsern)
npx browser-sync start --server --files "*.html, css/*.css, js/*.js"
```

### PHP Server
```bash
php -S localhost:8000
```

### Ruby Server
```bash
ruby -run -e httpd . -p 8000
```

## 🔧 Entwicklungsworkflow

### 1. Entwicklungsserver starten
```bash
# Terminal öffnen
cd ~/projects/PTLS/t3/Workshop

# Server starten
python3 -m http.server 8000
```

### 2. Dateien bearbeiten
- **HTML**: `index.html`
- **CSS**: `css/styles.css`
- **JavaScript**: `js/navigation.js`, `js/main.js`

### 3. Änderungen testen
- Browser öffnen: **http://localhost:8000**
- Änderungen werden automatisch angezeigt (bei Python Server: F5 drücken)

### 4. Live-Reload (optional)
```bash
# Für automatisches Reload bei Änderungen
npx live-server --port=8000
```

## 🧪 Testing

### Barrierefreiheit testen
```bash
# Lighthouse Accessibility Audit
npx lighthouse http://localhost:8000 --only-categories=accessibility

# axe-core für automatische Tests
npm install axe-core
```

### Browser-Tests
- **Chrome**: DevTools → Accessibility Panel
- **Firefox**: Accessibility Inspector
- **Safari**: Accessibility Inspector

### Manuelle Tests
1. **Tastaturnavigation**: Nur Tastatur verwenden
2. **Screen Reader**: NVDA, JAWS, VoiceOver
3. **Kontrast**: Farbkontrast-Analyzer
4. **Zoom**: 200% Zoom testen

## 📁 Projektstruktur

```
~/projects/PTLS/t3/Workshop/
├── index.html              # Hauptseite
├── README.md              # Projekt-Dokumentation
├── css/
│   └── styles.css         # Stylesheets
├── js/
│   ├── navigation.js      # Menü-Navigation
│   └── main.js           # Allgemeine Funktionalitäten
├── assets/
│   ├── images/           # Bilder
│   ├── icons/            # Icons
│   └── fonts/            # Schriftarten
└── docs/
    ├── accessibility.md   # Barrierefreiheits-Dokumentation
    └── development.md    # Diese Datei
```

## 🔍 Debugging

### Browser Developer Tools
```javascript
// JavaScript Debugging
console.log('Debug-Nachricht');

// Navigation Manager testen
window.NavigationManager.init();

// Main App testen
window.MainApp.performSearch('test');
```

### Netzwerk-Debugging
```bash
# Server-Logs anzeigen
python3 -m http.server 8000 --bind 0.0.0.0

# Port-Status prüfen
netstat -tulpn | grep :8000
```

## 🚀 Deployment

### Lokales Testing
```bash
# Produktions-Server starten
python3 -m http.server 8000

# Oder mit Node.js
npx serve . -s
```

### Statisches Hosting
- **GitHub Pages**: Automatisches Deployment
- **Netlify**: Drag & Drop Deployment
- **Vercel**: Automatisches Deployment
- **Apache/Nginx**: Manuelles Deployment

## 📚 Nützliche Befehle

### Git Workflow
```bash
# Status prüfen
git status

# Änderungen committen
git add .
git commit -m "Feature: Neue Funktionalität"

# Push zu Remote
git push origin main
```

### Datei-Operationen
```bash
# Dateien auflisten
ls -la

# Verzeichnisstruktur anzeigen
tree

# Datei-Inhalt anzeigen
cat index.html

# Datei bearbeiten
nano index.html
# oder
code index.html
```

### Server-Management
```bash
# Server im Hintergrund starten
nohup python3 -m http.server 8000 &

# Prozess beenden
pkill -f "python3 -m http.server"

# Port prüfen
lsof -i :8000
```

## 🐛 Häufige Probleme

### Port bereits belegt
```bash
# Anderen Port verwenden
python3 -m http.server 3000

# Oder Prozess beenden
sudo kill -9 $(lsof -t -i:8000)
```

### CORS-Probleme
```bash
# Mit CORS-Headers starten
python3 -m http.server 8000 --bind 0.0.0.0
```

### JavaScript-Fehler
```bash
# Browser Console prüfen
# F12 → Console Tab
```

## 📞 Support

Bei Problemen:
1. **Browser Console** prüfen (F12)
2. **Server-Logs** überprüfen
3. **README.md** lesen
4. **Issues** erstellen

## 🔄 Updates

### Regelmäßige Updates
```bash
# Git Repository aktualisieren
git pull origin main

# Node.js Dependencies aktualisieren
npm update
```

### Backup erstellen
```bash
# Projekt sichern
tar -czf workshop-backup-$(date +%Y%m%d).tar.gz .
``` 