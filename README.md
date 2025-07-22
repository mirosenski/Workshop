# Nachrichtenportal - Barrierefreie Webanwendung

## 📋 Projektübersicht

Ein modernes, barrierefreies Nachrichtenportal mit umfassender WCAG-Konformität und exzellenter Benutzerfreundlichkeit.

## 🏗️ Verzeichnisstruktur

```
~/projects/PTLS/t3/Workshop/
├── index.html              # Hauptseite
├── css/
│   └── styles.css          # Stylesheets
├── js/                     # JavaScript-Dateien
│   ├── navigation.js       # Menü-Navigation und Barrierefreiheit
│   └── main.js            # Allgemeine Funktionalitäten
├── assets/
│   ├── images/             # Bilder und Grafiken
│   │   └── test.png
│   ├── icons/              # Icons und Logos
│   │   └── icon-pol.svg
│   └── fonts/              # Schriftarten (zukünftig)
└── docs/                   # Dokumentation
```

## ♿ Barrierefreiheit

### Implementierte Features:
- **ARIA-Labels**: Umfassende Beschriftungen für Screen Reader
- **Tastaturnavigation**: Vollständige Bedienung per Tastatur
- **Semantische HTML-Struktur**: Korrekte Verwendung von HTML5-Elementen
- **Kontrast**: Optimierte Farbkontraste
- **Fokus-Management**: Klare Fokus-Indikatoren
- **Screen Reader Support**: Announcen von Statusänderungen

### WCAG 2.1 Konformität:
- ✅ Level AA erreicht
- ✅ Tastaturnavigation implementiert
- ✅ ARIA-Attribute korrekt verwendet
- ✅ Semantische Struktur vorhanden

## 🚀 Technologien

- **HTML5**: Semantische Struktur
- **CSS3**: Moderne Styling-Techniken
- **JavaScript**: Interaktive Funktionalität
- **ARIA**: Barrierefreiheits-Unterstützung

## 📱 Responsive Design

- Mobile-First Ansatz
- Flexible Layouts
- Touch-optimierte Bedienung

## 🔧 Entwicklung

### 🚀 Anwendung starten

#### Option 1: Python HTTP Server (Empfohlen)
```bash
# Python 3
python3 -m http.server 8000

# Python 2 (falls verfügbar)
python -m SimpleHTTPServer 8000
```

#### Option 2: Node.js Server
```bash
# Mit npx serve
npx serve .

# Mit http-server
npx http-server

# Mit live-server für automatisches Reload
npx live-server --port=8000
```

#### Option 3: PHP Server
```bash
php -S localhost:8000
```

#### Option 4: Ruby Server
```bash
ruby -run -e httpd . -p 8000
```

### 🌐 Zugriff auf die Anwendung

Nach dem Start können Sie die Anwendung im Browser unter folgenden URLs aufrufen:
- **http://localhost:8000**
- **http://127.0.0.1:8000**

### 📋 Nützliche Terminal-Befehle

```bash
# Server stoppen
Ctrl + C

# Anderen Port verwenden
python3 -m http.server 3000

# Mit spezifischem Host
python3 -m http.server 8000 --bind 0.0.0.0

# Live-Server mit automatischem Reload
npx live-server --port=8000

# Browser-Sync für Entwicklung
npx browser-sync start --server --files "*.html, css/*.css, js/*.js"
```

### 🛠️ Entwicklungssetup

```bash
# Projekt klonen
git clone [repository-url]
cd Workshop

# Abhängigkeiten installieren (falls benötigt)
npm install -g live-server
npm install -g browser-sync

# Entwicklungsserver starten
python3 -m http.server 8000
```

### Browser-Kompatibilität:
- Chrome (empfohlen)
- Firefox
- Safari
- Edge

## 📝 Lizenz

© 2025 Nachrichtenportal. Alle Rechte vorbehalten.

## 🤝 Beitragen

1. Fork des Projekts
2. Feature-Branch erstellen
3. Änderungen committen
4. Pull Request erstellen

## 📞 Kontakt

Bei Fragen zur Barrierefreiheit oder technischen Problemen wenden Sie sich an das Entwicklungsteam. 