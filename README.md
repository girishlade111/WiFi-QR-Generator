# 📶 Wi-Fi QR Code Generator

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-2563eb?style=for-the-badge&logo=github)](https://girishlade111.github.io/WiFi-QR-Generator/)
[![License](https://img.shields.io/badge/📜_License-MIT-green?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/📦_Version-1.1.0-blue?style=for-the-badge)](https://github.com/girishlade111/WiFi-QR-Generator/releases)
[![Last Commit](https://img.shields.io/github/last-commit/girishlade111/WiFi-QR-Generator?style=for-the-badge&logo=git)](https://github.com/girishlade111/WiFi-QR-Generator/commits/main)
[![Issues](https://img.shields.io/github/issues/girishlade111/WiFi-QR-Generator?style=for-the-badge&logo=github)](https://github.com/girishlade111/WiFi-QR-Generator/issues)
[![Stars](https://img.shields.io/github/stars/girishlade111/WiFi-QR-Generator?style=for-the-badge&logo=github)](https://github.com/girishlade111/WiFi-QR-Generator/stargazers)

### 🔗 **Create professional Wi-Fi QR codes in seconds — 100% free, private, and offline-ready**

</div>

---

## 📸 Preview

<div align="center">

![App Screenshot](https://imgur.com/yQKomWE.png)

*Generate scannable QR codes for instant Wi-Fi access*

</div>

---

## ✨ Key Features

### 🔐 **Security & Privacy**
- **🔒 100% Client-Side Processing** — All data stays in your browser; nothing is transmitted to servers
- **🚫 No Tracking** — Zero analytics, cookies, or third-party trackers
- **🗑️ Auto-Clear** — All data is cleared when you close the tab
- **🔓 Open Source** — Fully auditable codebase under MIT License

### 📡 **Network Support**
- **✅ WPA/WPA2** — Modern security standard (8-63 character passwords)
- **✅ WEP** — Legacy support (5/13 ASCII or 10/26 hex characters)
- **✅ Open Networks** — No password required option
- **📡 Hidden SSID** — Support for non-broadcast networks

### 🎨 **Customization Options**
- **📏 Adjustable Size** — Range from 38px to 1100px (default: 480px)
- **🛡️ Error Correction** — 4 levels (L: 7%, M: 15%, Q: 25%, H: 30%)
- **📁 Export Formats** — PNG (raster) or SVG (vector)
- **🎯 High Contrast** — Black on white for optimal scanning

### 🚀 **User Experience**
- **⚡ Instant Generation** — Real-time QR code creation
- **📱 Responsive Design** — Works flawlessly on mobile and desktop
- **🎨 Modern UI** — Clean, professional interface with smooth animations
- **📋 Copy Payload** — Copy raw Wi-Fi string for advanced use
- **⬇️ One-Click Download** — Save QR codes instantly

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Vanilla JavaScript (ES6+ Modules) |
| **Styling** | CSS3 with Custom Properties (Variables) |
| **Markup** | HTML5 with Semantic Elements |
| **QR Library** | Self-contained QRCode.js (browser-ready) |
| **Testing** | Node.js native test runner (`node:test`) |
| **Hosting** | GitHub Pages / Vercel |
| **CI/CD** | GitHub Actions |

### 📦 Dependencies

```json
{
  "dependencies": {
    "qrcode": "^1.5.4"
  },
  "devDependencies": {},
  "type": "module"
}
```

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| **Total Lines of Code** | ~2,500+ |
| **Core Files** | 4 (index.html, script.js, style.css, wifi-qr.js) |
| **QR Library Size** | ~25 KB (minified) |
| **Test Coverage** | 6 unit tests (100% core logic) |
| **Browser Support** | Chrome, Edge, Firefox, Safari (latest) |
| **License** | MIT (Free for personal & commercial use) |
| **Bundle Size** | < 50 KB (gzipped) |

---

## 🚀 Quick Start

### **Option 1: Use the Live Demo**
1. Visit **[Wi-Fi QR Code Generator](https://girishlade111.github.io/WiFi-QR-Generator/)**
2. Enter your Wi-Fi details
3. Click **"Generate QR Code"**
4. Scan or download!

### **Option 2: Run Locally**
```bash
# Clone the repository
git clone https://github.com/girishlade111/WiFi-QR-Generator.git

# Navigate to project directory
cd WiFi-QR-Generator

# Open in browser (no build required!)
# Option A: Double-click index.html
# Option B: Use a local server
python -m http.server 8080
# Visit: http://localhost:8080
```

### **Option 3: Deploy to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 📖 Detailed Instructions

### **Step 1: Enter Network Details**

| Field | Description | Requirements |
|-------|-------------|--------------|
| **Wi-Fi Name (SSID)** | Your network name | Max 32 characters |
| **Password** | Network password | Varies by security type |
| **Security Type** | Authentication method | WPA/WPA2, WEP, or Open |
| **Hidden Network** | Non-broadcast SSID | Checkbox (optional) |

### **Step 2: Configure QR Settings**

| Setting | Options | Recommendation |
|---------|---------|----------------|
| **QR Size** | 38px – 1100px | 480px for most uses |
| **Error Correction** | L (7%), M (15%), Q (25%), H (30%) | **M** for balance |
| **Export Format** | PNG or SVG | PNG for digital, SVG for print |

### **Step 3: Generate & Export**

1. Click **"Generate QR Code"**
2. Preview appears instantly
3. **Download** as PNG/SVG or **Copy Payload**

---

## 🔧 Configuration

### **Password Requirements by Security Type**

| Security Type | Password Length | Format |
|---------------|-----------------|--------|
| **WPA/WPA2** | 8 – 63 characters | ASCII or 64 hex |
| **WEP** | 5 or 13 characters | ASCII |
| **WEP** | 10 or 26 characters | Hexadecimal (0-9, A-F) |
| **Open (No Password)** | N/A | Leave blank |

### **Error Correction Levels**

| Level | Recovery Capacity | Use Case |
|-------|-------------------|----------|
| **L (Low)** | ~7% | Clean environments, digital display |
| **M (Medium)** | ~15% | **Recommended** for general use |
| **Q (Quartile)** | ~25% | Potentially damaged codes |
| **H (High)** | ~30% | Harsh conditions, industrial use |

### **Wi-Fi Payload Format**

The generator creates standardized Wi-Fi QR payloads:

```
WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;;
```

| Component | Description | Example |
|-----------|-------------|---------|
| `T:` | Security type | `WPA`, `WEP`, `nopass` |
| `S:` | SSID (network name) | `HomeWiFi` |
| `P:` | Password | `SecretPass123` |
| `H:` | Hidden network flag | `true` or `false` |

**Special Character Escaping:**
- Backslash `\` → `\\`
- Semicolon `;` → `\;`
- Colon `:` → `\:`
- Quote `"` → `\"`

---

## 📁 Project Structure

```
WiFi-QR-Generator/
├── 📄 index.html              # Main application page
├── 🎨 style.css               # Styles (1,400+ lines)
├── ⚙️ script.js               # App logic (300+ lines)
├── 📚 lib/
│   ├── qrcode.min.js          # QR generation library
│   └── wifi-qr.js             # Wi-Fi payload utilities
├── 🧪 tests/
│   └── wifi-string.test.js    # Unit tests (6 tests)
├── 📄 about.html              # About page
├── ❓ faq.html                # FAQ page
├── 📬 contact.html            # Contact page
├── 🔒 privacy-policy.html     # Privacy policy
├── 📜 terms-of-service.html   # Terms of service
├── 📦 package.json            # NPM configuration
├── 🤖 vercel.json             # Vercel deployment config
├── 🕷️ robots.txt              # SEO robots file
├── 🗺️ sitemap.xml             # SEO sitemap
└── 📖 README.md               # This file
```

---

## 🧪 Development

### **Run Tests**
```bash
# Using npm
npm test

# Or directly with Node.js
node --test tests/wifi-string.test.js
```

### **Test Coverage**
The test suite covers:
- ✅ Escape function for special characters
- ✅ Payload generation for WPA networks
- ✅ Hidden network handling
- ✅ Open network (nopass) support
- ✅ WPA password validation
- ✅ WEP password validation

### **Local Development Server**
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js (with http-server)
npx http-server -p 8080
```

### **Build Process**
**No build step required!** This is a vanilla JavaScript project that runs directly in the browser.

---

## 🔒 Privacy & Security

### **Data Handling**
- ✅ **Zero Data Collection** — No personal information is collected
- ✅ **No Server Storage** — All processing happens client-side
- ✅ **No Transmission** — Wi-Fi credentials never leave your device
- ✅ **No Persistence** — Data is cleared on tab close

### **Security Headers** (via Vercel)
```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block"
}
```

### **Third-Party Services**
| Service | Purpose | Data Shared |
|---------|---------|-------------|
| **GitHub Pages** | Hosting | IP address (standard) |
| **Google Fonts** | Typography | Browser user-agent |
| **None** | Analytics | ❌ No analytics used |
| **None** | Tracking | ❌ No trackers used |

---

## 🌐 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| **Google Chrome** | 80+ | ✅ Full |
| **Mozilla Firefox** | 75+ | ✅ Full |
| **Microsoft Edge** | 80+ | ✅ Full |
| **Apple Safari** | 13+ | ✅ Full |
| **Opera** | 67+ | ✅ Full |

**Requirements:**
- JavaScript enabled
- ES6 module support
- Canvas API support
- Modern CSS3 support

---

## 🐛 Troubleshooting

### **Common Issues**

| Issue | Cause | Solution |
|-------|-------|----------|
| **QR not generating** | Library not loaded | Check browser console; ensure `qrcode.min.js` loads |
| **WPA password rejected** | Too short/long | Must be 8-63 characters |
| **WEP password rejected** | Invalid length | Use 5/13 ASCII or 10/26 hex |
| **QR won't scan** | Low contrast/size | Increase size or error correction level |
| **Form clears on submit** | JavaScript error | Check console for errors; update browser |

### **Debug Mode**
Open browser DevTools (F12) and check the Console tab for detailed logs.

---

## 🤝 Contributing

### **Ways to Contribute**
- 🐛 **Report Bugs** — Open an issue with reproduction steps
- 💡 **Feature Requests** — Suggest improvements via GitHub Discussions
- 📖 **Documentation** — Improve README, comments, or FAQ
- 🌍 **Translations** — Add support for other languages
- 🎨 **Design** — Enhance UI/UX
- 👥 **Spread the Word** — Star the repo and share!

### **Development Workflow**
```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/WiFi-QR-Generator.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# 5. Test thoroughly
npm test

# 6. Commit with clear messages
git commit -m "feat: add amazing feature"

# 7. Push and create PR
git push origin feature/amazing-feature
```

---

## 📞 Support

| Channel | Link |
|---------|------|
| **📧 Email** | admin@ladestack.in |
| **🐛 Issues** | [GitHub Issues](https://github.com/girishlade111/WiFi-QR-Generator/issues) |
| **💬 Discussions** | [GitHub Discussions](https://github.com/girishlade111/WiFi-QR-Generator/discussions) |
| **🌐 Website** | [ladestack.in](https://ladestack.in) |
| **📸 Instagram** | [@girish_lade_](https://www.instagram.com/girish_lade_) |
| **💼 LinkedIn** | [girish-lade](https://www.linkedin.com/in/girish-lade-075bba201/) |

---

## 📜 License

**MIT License** — Free for personal and commercial use

```
Copyright (c) 2026 Wi-Fi QR Code Generator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **QRCode.js** — QR code generation library
- **GitHub Pages** — Free hosting
- **Vercel** — Deployment platform
- **Community Contributors** — Bug reports and feature suggestions

---

<div align="center">

### ⭐ **If you find this project helpful, please give it a star!**

**Made with ❤️ by [ladestack.in](https://ladestack.in)**

[Live Demo](https://girishlade111.github.io/WiFi-QR-Generator/) • [Report Bug](https://github.com/girishlade111/WiFi-QR-Generator/issues) • [Request Feature](https://github.com/girishlade111/WiFi-QR-Generator/discussions)

</div>
