# نظام التميز المؤسسي - دليل النشر والتشغيل
# Institutional Excellence System - Deployment Guide

## نظرة عامة / Overview

نظام التميز المؤسسي هو تطبيق ويب تفاعلي متقدم مصمم خصيصاً لهيئة الشارقة للإذاعة والتلفزيون لإدارة مبادرات التميز المؤسسي ونقاط الجائزة.

The Institutional Excellence System is an advanced interactive web application designed specifically for Sharjah Broadcasting Authority to manage institutional excellence initiatives and award points.

## المميزات الرئيسية / Key Features

### ✅ الوظائف الأساسية / Core Functionality
- **إدارة المبادرات**: إضافة، تعديل، وحذف المبادرات مع تتبع التقدم
- **نقاط الجائزة**: إدارة نقاط القوة ونقاط التحسين حسب معايير الجائزة
- **التحليلات المتقدمة**: رسوم بيانية تفاعلية وإحصائيات شاملة
- **إدارة البيانات**: واجهة شاملة لإدارة جميع البيانات مع البحث والتصفية

### ✅ الدعم اللغوي / Language Support
- **ثنائي اللغة**: دعم كامل للعربية والإنجليزية
- **التبديل التلقائي**: تغيير اتجاه النص (RTL/LTR) تلقائياً
- **التنسيق المحلي**: تنسيق الأرقام والتواريخ والعملة حسب اللغة

### ✅ العمل بدون اتصال / Offline Capabilities
- **PWA متقدم**: يعمل كتطبيق أصلي على الأجهزة المحمولة
- **التخزين المحلي**: حفظ البيانات محلياً باستخدام IndexedDB
- **المزامنة التلقائية**: مزامنة البيانات عند الاتصال بالإنترنت
- **Service Worker**: تخزين مؤقت ذكي للموارد

### ✅ التصميم والواجهة / Design & UI
- **تصميم متجاوب**: يعمل على جميع الأجهزة والشاشات
- **هوية بصرية**: ألوان وتصميم متوافق مع هيئة الشارقة
- **تجربة مستخدم متقدمة**: انتقالات سلسة وتفاعلات حديثة
- **إمكانية الوصول**: متوافق مع معايير الوصول الرقمي

## المتطلبات التقنية / Technical Requirements

### البيئة المطلوبة / Required Environment
- **Node.js**: الإصدار 18 أو أحدث
- **npm**: الإصدار 8 أو أحدث
- **متصفح حديث**: Chrome, Firefox, Safari, Edge

### التقنيات المستخدمة / Technologies Used
- **Frontend**: React 19 + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Database**: IndexedDB + Dexie.js
- **Charts**: Recharts
- **Icons**: Lucide React
- **PWA**: Service Workers + Web App Manifest

## دليل التثبيت / Installation Guide

### 1. تحضير البيئة / Environment Setup
```bash
# تحديث النظام / Update system
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js / Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# التحقق من الإصدار / Verify installation
node --version
npm --version
```

### 2. تحميل المشروع / Download Project
```bash
# نسخ المشروع / Clone project
git clone <repository-url>
cd award-management-system

# تثبيت التبعيات / Install dependencies
npm install
```

### 3. التشغيل في بيئة التطوير / Development Mode
```bash
# تشغيل الخادم المحلي / Start development server
npm run dev

# الوصول للتطبيق / Access application
# http://localhost:5173
```

### 4. البناء للإنتاج / Production Build
```bash
# بناء التطبيق / Build application
npm run build

# معاينة البناء / Preview build
npm run preview
```

## دليل النشر / Deployment Guide

### النشر على خادم ويب / Web Server Deployment

#### 1. بناء التطبيق / Build Application
```bash
npm run build
```

#### 2. نسخ الملفات / Copy Files
```bash
# نسخ مجلد dist إلى خادم الويب
# Copy dist folder to web server
cp -r dist/* /var/www/html/
```

#### 3. إعداد خادم الويب / Web Server Configuration

**Apache (.htaccess)**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# تفعيل ضغط الملفات / Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# تفعيل التخزين المؤقت / Enable caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

**Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    # دعم SPA / SPA support
    location / {
        try_files $uri $uri/ /index.html;
    }

    # ضغط الملفات / File compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # التخزين المؤقت / Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### النشر السحابي / Cloud Deployment

#### Vercel
```bash
# تثبيت Vercel CLI / Install Vercel CLI
npm i -g vercel

# نشر التطبيق / Deploy application
vercel --prod
```

#### Netlify
```bash
# تثبيت Netlify CLI / Install Netlify CLI
npm i -g netlify-cli

# نشر التطبيق / Deploy application
netlify deploy --prod --dir=dist
```

## إعداد قاعدة البيانات / Database Configuration

### IndexedDB (افتراضي / Default)
التطبيق يستخدم IndexedDB للتخزين المحلي بشكل افتراضي. لا يتطلب إعداد إضافي.

The application uses IndexedDB for local storage by default. No additional setup required.

### ربط قاعدة بيانات خارجية / External Database Integration
لربط قاعدة بيانات خارجية، قم بتعديل ملف `src/lib/database.js`:

To integrate an external database, modify `src/lib/database.js`:

```javascript
// مثال لربط API خارجي / Example for external API integration
const API_BASE_URL = 'https://your-api.com';

export const saveInitiative = async (initiative) => {
  try {
    const response = await fetch(`${API_BASE_URL}/initiatives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(initiative)
    });
    return await response.json();
  } catch (error) {
    // حفظ محلي في حالة فشل الاتصال / Local save on connection failure
    return await saveToIndexedDB(initiative);
  }
};
```

## الأمان / Security

### إعدادات الأمان الموصى بها / Recommended Security Settings

#### 1. HTTPS
```bash
# تفعيل HTTPS باستخدام Let's Encrypt / Enable HTTPS with Let's Encrypt
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d your-domain.com
```

#### 2. Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https:;
">
```

#### 3. إعدادات الخادم / Server Settings
```apache
# إخفاء معلومات الخادم / Hide server information
ServerTokens Prod
ServerSignature Off

# منع الوصول للملفات الحساسة / Prevent access to sensitive files
<Files ".htaccess">
    Require all denied
</Files>
<Files "*.json">
    Require all denied
</Files>
```

## المراقبة والصيانة / Monitoring & Maintenance

### مراقبة الأداء / Performance Monitoring
```javascript
// إضافة مراقبة الأداء / Add performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart);
  });
}
```

### تحديث التطبيق / Application Updates
```bash
# تحديث التبعيات / Update dependencies
npm update

# فحص الثغرات الأمنية / Security audit
npm audit

# إصلاح الثغرات / Fix vulnerabilities
npm audit fix
```

### النسخ الاحتياطي / Backup
```bash
# نسخ احتياطي للبيانات / Data backup
# يتم حفظ البيانات محلياً في متصفح المستخدم
# Data is stored locally in user's browser

# نسخ احتياطي للكود / Code backup
git add .
git commit -m "Backup: $(date)"
git push origin main
```

## استكشاف الأخطاء / Troubleshooting

### مشاكل شائعة / Common Issues

#### 1. التطبيق لا يعمل بدون اتصال / App doesn't work offline
```javascript
// التحقق من Service Worker / Check Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('Service Workers:', registrations);
  });
}
```

#### 2. مشاكل في اللغة / Language issues
```javascript
// التحقق من إعدادات اللغة / Check language settings
console.log('Current Language:', localStorage.getItem('preferred-language'));
console.log('Document Direction:', document.documentElement.dir);
```

#### 3. مشاكل في البيانات / Data issues
```javascript
// مسح البيانات المحلية / Clear local data
localStorage.clear();
indexedDB.deleteDatabase('award_system_db');
location.reload();
```

### سجلات الأخطاء / Error Logging
```javascript
// إعداد تسجيل الأخطاء / Setup error logging
window.addEventListener('error', (event) => {
  console.error('Application Error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});
```

## الدعم والمساعدة / Support & Help

### معلومات الاتصال / Contact Information
- **المطور**: Manus AI Assistant
- **التاريخ**: سبتمبر 2025
- **الإصدار**: 1.0.0

### الموارد المفيدة / Useful Resources
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PWA Guide](https://web.dev/progressive-web-apps/)

### التحديثات المستقبلية / Future Updates
- تكامل مع أنظمة إدارة المحتوى
- تقارير متقدمة وتصدير PDF
- إشعارات فورية
- تكامل مع التقويم
- نظام إدارة المستخدمين

---

**ملاحظة**: هذا التطبيق مصمم خصيصاً لهيئة الشارقة للإذاعة والتلفزيون ويمكن تخصيصه حسب الاحتياجات المحددة.

**Note**: This application is specifically designed for Sharjah Broadcasting Authority and can be customized according to specific requirements.
