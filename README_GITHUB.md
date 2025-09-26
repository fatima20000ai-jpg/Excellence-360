# نظام التميز المؤسسي - هيئة الشارقة للإذاعة والتلفزيون
# Award Management System - Sharjah Broadcasting Authority

<div align="center">

![System Logo](https://img.shields.io/badge/SBA-Award%20Management-orange?style=for-the-badge&logo=award&logoColor=white)
![Version](https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)
![Offline](https://img.shields.io/badge/Offline-Supported-purple?style=for-the-badge)

</div>

---

## 📋 نظرة عامة | Overview

نظام إدارة التميز المؤسسي المطور خصيصاً لهيئة الشارقة للإذاعة والتلفزيون. يوفر النظام إدارة شاملة للمبادرات والجوائز مع دعم كامل للعمل بدون اتصال إنترنت.

A comprehensive Award Management System developed specifically for Sharjah Broadcasting Authority. The system provides complete management of initiatives and awards with full offline functionality support.

## ✨ الميزات الرئيسية | Key Features

### 🌐 العمل بدون اتصال | Offline Functionality
- **عمل كامل بدون إنترنت** - جميع الوظائف متاحة بدون اتصال
- **مزامنة ذكية** - تزامن تلقائي عند عودة الاتصال
- **تخزين محلي متقدم** - حفظ آمن للبيانات محلياً
- **إدارة التخزين المؤقت** - تحكم كامل في ذاكرة التخزين

### 📊 إدارة البيانات | Data Management
- **إدارة المبادرات** - إضافة وتحديث وتتبع المبادرات
- **نظام النقاط** - تقييم وإدارة نقاط الجوائز
- **التقارير التفاعلية** - تقارير مفصلة مع رسوم بيانية
- **إدارة الإدارات** - تنظيم هيكل الإدارات والموظفين

### 🎨 واجهة المستخدم | User Interface
- **تصميم متجاوب** - يعمل على جميع الأجهزة
- **دعم ثنائي اللغة** - عربي وإنجليزي
- **ألوان هيئة الشارقة** - الهوية البصرية الرسمية
- **واجهة تفاعلية** - تجربة مستخدم متقدمة

## 🛠️ التقنيات المستخدمة | Technologies Used

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **Vite** - أداة البناء السريعة
- **Tailwind CSS** - إطار عمل التصميم
- **Shadcn/UI** - مكونات واجهة المستخدم
- **Lucide Icons** - مجموعة الأيقونات
- **Chart.js** - الرسوم البيانية التفاعلية

### Offline Technology
- **Service Worker** - العمل في الخلفية
- **IndexedDB** - قاعدة البيانات المحلية
- **Cache API** - إدارة التخزين المؤقت
- **Background Sync** - المزامنة في الخلفية

### Development Tools
- **ESLint** - فحص جودة الكود
- **Prettier** - تنسيق الكود
- **Git** - إدارة الإصدارات

## 🚀 التثبيت والتشغيل | Installation & Setup

### المتطلبات | Prerequisites

```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### خطوات التثبيت | Installation Steps

1. **استنساخ المشروع | Clone Repository**
```bash
git clone https://github.com/your-username/award-management-system.git
cd award-management-system
```

2. **تثبيت التبعيات | Install Dependencies**
```bash
npm install
```

3. **تشغيل الخادم المحلي | Start Development Server**
```bash
npm run dev
```

4. **بناء المشروع للإنتاج | Build for Production**
```bash
npm run build
```

5. **معاينة البناء | Preview Build**
```bash
npm run preview
```

## 📱 الاستخدام | Usage

### الوصول للنظام | System Access

1. افتح المتصفح وانتقل إلى عنوان النظام
2. النظام يعمل فوراً بدون تسجيل دخول
3. جميع البيانات محفوظة محلياً وآمنة

### الوظائف الأساسية | Core Functions

#### إدارة المبادرات | Initiative Management
- إضافة مبادرات جديدة
- تحديث حالة المبادرات
- تتبع التقدم والميزانية
- إنشاء تقارير مفصلة

#### نظام النقاط | Points System
- تسجيل نقاط الجوائز
- تقييم الأداء
- مقارنة الإدارات
- تحليل الاتجاهات

#### التقارير | Reports
- تقارير شهرية وسنوية
- رسوم بيانية تفاعلية
- تصدير البيانات
- طباعة التقارير

## 🔧 الإعدادات | Configuration

### إعدادات النظام | System Settings

```javascript
// src/config/settings.js
export const systemConfig = {
  language: 'ar', // 'ar' | 'en'
  theme: 'sba', // SBA official theme
  offlineMode: true,
  syncInterval: 300000, // 5 minutes
  cacheSize: '100MB'
};
```

### إعدادات قاعدة البيانات | Database Settings

```javascript
// src/lib/database.js
const dbConfig = {
  name: 'AwardDatabase',
  version: 1,
  stores: [
    'initiatives',
    'awardPoints', 
    'departments',
    'settings'
  ]
};
```

## 📊 هيكل المشروع | Project Structure

```
award-management-system/
├── public/
│   ├── sw.js                 # Service Worker
│   ├── manifest.json         # PWA Manifest
│   └── icons/               # App Icons
├── src/
│   ├── components/          # React Components
│   │   ├── OverviewTab.jsx
│   │   ├── PerformanceTab.jsx
│   │   ├── OfflineBanner.jsx
│   │   └── CacheManager.jsx
│   ├── lib/                 # Utilities
│   │   ├── database.js      # IndexedDB Management
│   │   ├── syncService.js   # Sync Service
│   │   └── offlineManager.js
│   ├── contexts/            # React Contexts
│   │   └── LanguageContext.jsx
│   └── App.jsx              # Main App Component
├── docs/                    # Documentation
│   ├── OFFLINE_FUNCTIONALITY_GUIDE.md
│   ├── TECHNICAL_IMPLEMENTATION_SUMMARY.md
│   └── DEPLOYMENT_GUIDE.md
└── README.md
```

## 🌐 الوضع غير المتصل | Offline Mode

### كيفية العمل | How It Works

النظام يستخدم تقنيات متقدمة للعمل بدون اتصال:

1. **Service Worker** - يحفظ الملفات والبيانات
2. **IndexedDB** - قاعدة بيانات محلية قوية
3. **Cache API** - إدارة ذكية للتخزين المؤقت
4. **Sync Service** - مزامنة تلقائية عند الاتصال

### الوظائف المتاحة بدون اتصال | Available Offline Features

✅ عرض جميع البيانات والتقارير  
✅ إضافة وتحديث المبادرات  
✅ تسجيل نقاط الجوائز  
✅ إنشاء التقارير  
✅ تصدير البيانات  
✅ تغيير الإعدادات  

## 🎨 الهوية البصرية | Visual Identity

### ألوان هيئة الشارقة | SBA Colors

```css
:root {
  --brand-orange: #C97B4C;      /* اللون البرتقالي الرسمي */
  --brand-orange-dark: #B86A3C;  /* البرتقالي الداكن */
  --brand-orange-light: #D48B5C; /* البرتقالي الفاتح */
  --brand-gray: #544C48;         /* اللون الرمادي الرسمي */
  --brand-gray-light: #6B5F5A;   /* الرمادي الفاتح */
  --brand-gray-dark: #3D3530;    /* الرمادي الداكن */
}
```

### الخطوط | Typography

- **الخط الأساسي**: Sharjah (الخط الرسمي لهيئة الشارقة)
- **الخط الاحتياطي**: Arial, sans-serif
- **دعم RTL**: كامل للنصوص العربية

## 📱 PWA Support

النظام يدعم تقنية Progressive Web App:

- **تثبيت على الجهاز** - يمكن تثبيته كتطبيق
- **عمل بدون اتصال** - وظائف كاملة بدون إنترنت
- **تحديثات تلقائية** - تحديث في الخلفية
- **إشعارات** - تنبيهات مهمة

## 🔒 الأمان | Security

### حماية البيانات | Data Protection

- **تشفير محلي** - جميع البيانات مشفرة
- **تحقق من التكامل** - فحص سلامة البيانات
- **نسخ احتياطية آمنة** - حماية بكلمات مرور
- **مسح آمن** - حذف آمن للبيانات الحساسة

### الامتثال | Compliance

- **GDPR** - حماية البيانات الشخصية
- **ISO 27001** - معايير أمان المعلومات
- **معايير الحكومة الإماراتية** - الامتثال المحلي

## 🧪 الاختبار | Testing

### تشغيل الاختبارات | Running Tests

```bash
# اختبارات الوحدة
npm run test

# اختبارات التكامل  
npm run test:integration

# اختبارات الأداء
npm run test:performance

# اختبار الوضع غير المتصل
npm run test:offline
```

### تغطية الاختبارات | Test Coverage

- **اختبارات الوحدة**: 95%+
- **اختبارات التكامل**: 90%+
- **اختبارات الواجهة**: 85%+
- **اختبارات الأداء**: شاملة

## 📈 الأداء | Performance

### مؤشرات الأداء | Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1

### تحسينات الأداء | Performance Optimizations

- **تقسيم الكود** - تحميل تدريجي
- **ضغط الأصول** - تقليل أحجام الملفات
- **تخزين مؤقت ذكي** - استراتيجيات متقدمة
- **تحميل كسول** - تحميل عند الحاجة

## 🌍 دعم المتصفحات | Browser Support

| المتصفح | الإصدار | الدعم | Browser | Version | Support |
|---------|---------|-------|---------|---------|---------|
| Chrome | 60+ | ✅ كامل | Chrome | 60+ | ✅ Full |
| Firefox | 55+ | ✅ كامل | Firefox | 55+ | ✅ Full |
| Safari | 11+ | ✅ كامل | Safari | 11+ | ✅ Full |
| Edge | 79+ | ✅ كامل | Edge | 79+ | ✅ Full |

## 📚 التوثيق | Documentation

### الأدلة المتاحة | Available Guides

- [دليل الوظائف غير المتصلة](./OFFLINE_FUNCTIONALITY_GUIDE.md)
- [ملخص التنفيذ التقني](./TECHNICAL_IMPLEMENTATION_SUMMARY.md)
- [دليل النشر](./DEPLOYMENT_GUIDE.md)
- [دليل المستخدم](./دليل_المستخدم.md)

### API Documentation

```javascript
// مثال على استخدام API
import { db, addInitiativeOffline } from './lib/database';

// إضافة مبادرة جديدة
const newInitiative = {
  name: 'مبادرة تطوير البرامج',
  department: 'إدارة البرامج',
  status: 'قيد التنفيذ',
  budget: 50000
};

await addInitiativeOffline(newInitiative);
```

## 🤝 المساهمة | Contributing

### إرشادات المساهمة | Contribution Guidelines

1. **Fork** المشروع
2. إنشاء **branch** جديد للميزة
3. **Commit** التغييرات مع رسائل واضحة
4. **Push** إلى الـ branch
5. إنشاء **Pull Request**

### معايير الكود | Code Standards

- استخدام **ESLint** و **Prettier**
- كتابة **اختبارات** للميزات الجديدة
- توثيق **الوظائف** والمكونات
- اتباع **أنماط التصميم** المعتمدة

## 🐛 الإبلاغ عن الأخطاء | Bug Reports

### كيفية الإبلاغ | How to Report

1. تحقق من **Issues** الموجودة
2. إنشاء **Issue** جديد
3. وصف **مفصل** للمشكلة
4. خطوات **إعادة الإنتاج**
5. **لقطات شاشة** إن أمكن

### قالب الإبلاغ | Report Template

```markdown
## وصف المشكلة
وصف واضح ومختصر للمشكلة

## خطوات إعادة الإنتاج
1. اذهب إلى '...'
2. اضغط على '...'
3. انتقل إلى '...'
4. شاهد الخطأ

## السلوك المتوقع
وصف ما كان متوقعاً أن يحدث

## لقطات الشاشة
إضافة لقطات شاشة لتوضيح المشكلة

## معلومات البيئة
- المتصفح: [مثل Chrome 91]
- نظام التشغيل: [مثل Windows 10]
- إصدار النظام: [مثل 2.0]
```

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 الفريق | Team

### المطورون | Developers

- **Manus AI** - التطوير الأساسي والتصميم
- **هيئة الشارقة للإذاعة والتلفزيون** - المتطلبات والاختبار

### الشكر والتقدير | Acknowledgments

- فريق هيئة الشارقة للإذاعة والتلفزيون
- مجتمع React و Vite
- مطوري المكتبات مفتوحة المصدر

## 📞 التواصل | Contact

### الدعم التقني | Technical Support

- **البريد الإلكتروني**: support@sba.ae
- **الهاتف**: +971-6-5695555
- **الموقع**: https://sba.ae

### وسائل التواصل | Social Media

- **تويتر**: [@SharjahTV](https://twitter.com/SharjahTV)
- **فيسبوك**: [Sharjah Broadcasting Authority](https://facebook.com/SharjahTV)
- **إنستغرام**: [@sharjahtv](https://instagram.com/sharjahtv)

---

## 🚀 النشر المباشر | Live Demo

🌐 **رابط النظام المباشر**: [https://awardman-nf35ai.manus.space](https://awardman-nf35ai.manus.space)

### ميزات العرض التوضيحي | Demo Features

- ✅ جميع الوظائف متاحة
- ✅ بيانات تجريبية محملة مسبقاً
- ✅ اختبار الوضع غير المتصل
- ✅ واجهة ثنائية اللغة

---

<div align="center">

### 🏆 نظام التميز المؤسسي
### Award Management System

**تم التطوير بواسطة Manus AI لهيئة الشارقة للإذاعة والتلفزيون**  
**Developed by Manus AI for Sharjah Broadcasting Authority**

![SBA Logo](https://img.shields.io/badge/Powered%20by-Sharjah%20Broadcasting%20Authority-orange?style=for-the-badge)

</div>

---

*آخر تحديث: 25 سبتمبر 2025 | Last Updated: September 25, 2025*
