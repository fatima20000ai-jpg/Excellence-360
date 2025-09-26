# دليل المساهمة في نظام التميز المؤسسي
# Contributing to Award Management System

مرحباً بك في مشروع نظام التميز المؤسسي لهيئة الشارقة للإذاعة والتلفزيون! نحن نرحب بمساهماتك ونقدر وقتك وجهدك في تحسين هذا النظام.

Welcome to the Award Management System project for Sharjah Broadcasting Authority! We welcome your contributions and appreciate your time and effort in improving this system.

## كيفية المساهمة | How to Contribute

### الإبلاغ عن الأخطاء | Reporting Bugs

عند العثور على خطأ في النظام، يرجى التأكد من أن الخطأ لم يتم الإبلاغ عنه مسبقاً من خلال البحث في قائمة المشاكل المفتوحة. إذا لم تجد مشكلة مماثلة، يمكنك إنشاء تقرير خطأ جديد باستخدام القالب المخصص.

When you find a bug in the system, please ensure that the bug has not been reported previously by searching through the open issues. If you don't find a similar issue, you can create a new bug report using the dedicated template.

### اقتراح الميزات الجديدة | Suggesting New Features

نحن نرحب بالأفكار الجديدة لتحسين النظام. قبل اقتراح ميزة جديدة، يرجى مراجعة الميزات المطلوبة الحالية للتأكد من عدم وجود طلب مماثل. استخدم قالب طلب الميزة لتقديم اقتراحك بشكل مفصل.

We welcome new ideas for improving the system. Before suggesting a new feature, please review the current feature requests to ensure there isn't a similar request. Use the feature request template to submit your suggestion in detail.

### المساهمة في الكود | Contributing Code

#### إعداد بيئة التطوير | Development Environment Setup

لبدء المساهمة في الكود، تحتاج إلى إعداد بيئة التطوير المحلية. تأكد من توفر المتطلبات التالية على نظامك:

To start contributing code, you need to set up a local development environment. Ensure the following requirements are available on your system:

**المتطلبات الأساسية | Basic Requirements:**
- Node.js الإصدار 18 أو أحدث
- npm الإصدار 8 أو أحدث  
- Git لإدارة الإصدارات
- محرر نصوص يدعم JavaScript و React

**خطوات الإعداد | Setup Steps:**

```bash
# استنساخ المستودع
git clone https://github.com/your-username/award-management-system.git

# الانتقال إلى مجلد المشروع
cd award-management-system

# تثبيت التبعيات
npm install

# تشغيل الخادم المحلي
npm run dev
```

#### معايير الكود | Code Standards

نحن نتبع معايير صارمة لضمان جودة الكود وسهولة صيانته. يجب على جميع المساهمات الالتزام بالمعايير التالية:

We follow strict standards to ensure code quality and maintainability. All contributions must adhere to the following standards:

**تنسيق الكود | Code Formatting:**
النظام يستخدم ESLint و Prettier لضمان تنسيق موحد للكود. قم بتشغيل الأوامر التالية قبل إرسال أي تغييرات:

The system uses ESLint and Prettier to ensure consistent code formatting. Run the following commands before submitting any changes:

```bash
# فحص جودة الكود
npm run lint

# إصلاح مشاكل التنسيق تلقائياً
npm run lint:fix

# تنسيق الكود
npm run format
```

**اصطلاحات التسمية | Naming Conventions:**
- استخدم أسماء وصفية للمتغيرات والوظائف
- اتبع نمط camelCase للمتغيرات والوظائف
- استخدم PascalCase لأسماء المكونات
- أضف تعليقات واضحة للكود المعقد

**هيكل المكونات | Component Structure:**
عند إنشاء مكونات React جديدة، اتبع الهيكل التالي:

When creating new React components, follow this structure:

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * وصف المكون وغرضه
 * Component description and purpose
 */
const ComponentName = ({ prop1, prop2 }) => {
  // حالة المكون
  const [state, setState] = useState(initialValue);
  
  // تأثيرات جانبية
  useEffect(() => {
    // منطق التأثير
  }, [dependencies]);
  
  // وظائف المعالجة
  const handleAction = () => {
    // منطق المعالجة
  };
  
  return (
    <div className="component-container">
      {/* محتوى المكون */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

ComponentName.defaultProps = {
  prop2: 0
};

export default ComponentName;
```

#### الاختبارات | Testing

جميع المساهمات يجب أن تتضمن اختبارات مناسبة لضمان استقرار النظام. نحن نستخدم Jest و React Testing Library للاختبارات.

All contributions must include appropriate tests to ensure system stability. We use Jest and React Testing Library for testing.

**أنواع الاختبارات | Types of Tests:**
- اختبارات الوحدة للوظائف المفردة
- اختبارات التكامل للمكونات
- اختبارات الواجهة للتفاعلات
- اختبارات الوضع غير المتصل

**تشغيل الاختبارات | Running Tests:**

```bash
# تشغيل جميع الاختبارات
npm test

# تشغيل الاختبارات مع تغطية الكود
npm run test:coverage

# تشغيل الاختبارات في وضع المراقبة
npm run test:watch
```

### عملية المراجعة | Review Process

جميع طلبات الدمج تخضع لعملية مراجعة دقيقة لضمان جودة الكود والتوافق مع معايير المشروع. عملية المراجعة تشمل الجوانب التالية:

All pull requests undergo a thorough review process to ensure code quality and compliance with project standards. The review process includes the following aspects:

**مراجعة الكود | Code Review:**
- التحقق من اتباع معايير الكود
- فحص منطق البرمجة وكفاءة الخوارزميات
- التأكد من وجود التعليقات المناسبة
- مراجعة أمان الكود

**مراجعة الوظائف | Functionality Review:**
- اختبار الميزات الجديدة أو المحدثة
- التحقق من عمل الوضع غير المتصل
- اختبار التوافق مع المتصفحات المختلفة
- فحص دعم اللغة العربية

**مراجعة التصميم | Design Review:**
- التأكد من اتباع الهوية البصرية لهيئة الشارقة
- فحص التصميم المتجاوب
- مراجعة تجربة المستخدم
- التحقق من معايير الوصولية

### الالتزام بالهوية البصرية | SBA Branding Compliance

جميع المساهمات يجب أن تلتزم بالهوية البصرية الرسمية لهيئة الشارقة للإذاعة والتلفزيون. هذا يشمل استخدام الألوان الرسمية والخطوط المعتمدة والحفاظ على الطابع المهني للواجهة.

All contributions must comply with the official visual identity of Sharjah Broadcasting Authority. This includes using official colors, approved fonts, and maintaining the professional character of the interface.

**الألوان الرسمية | Official Colors:**
- البرتقالي الأساسي: `#C97B4C`
- الرمادي الأساسي: `#544C48`
- تدرجات مشتقة من الألوان الأساسية

**الخطوط المعتمدة | Approved Fonts:**
- الخط الأساسي: Sharjah (للنصوص العربية)
- الخط الاحتياطي: Arial, sans-serif

### دعم اللغة العربية | Arabic Language Support

النظام يدعم اللغتين العربية والإنجليزية بشكل كامل. عند إضافة نصوص جديدة أو تعديل النصوص الموجودة، يجب التأكد من توفير الترجمة المناسبة وضمان عمل النصوص العربية بشكل صحيح مع اتجاه RTL.

The system fully supports both Arabic and English languages. When adding new text or modifying existing text, ensure appropriate translation is provided and Arabic text works correctly with RTL direction.

### الأمان والخصوصية | Security and Privacy

نحن نأخذ أمان البيانات والخصوصية على محمل الجد. جميع المساهمات يجب أن تتبع أفضل الممارسات الأمنية وتحترم خصوصية المستخدمين.

We take data security and privacy seriously. All contributions must follow security best practices and respect user privacy.

**إرشادات الأمان | Security Guidelines:**
- تجنب تخزين البيانات الحساسة في الكود
- استخدم التشفير المناسب للبيانات المحلية
- تحقق من صحة جميع المدخلات
- اتبع مبدأ الحد الأدنى من الصلاحيات

### التوثيق | Documentation

التوثيق الجيد أساسي لنجاح أي مشروع برمجي. عند إضافة ميزات جديدة أو تعديل الموجود، يجب تحديث التوثيق المناسب.

Good documentation is essential for the success of any software project. When adding new features or modifying existing ones, appropriate documentation must be updated.

**أنواع التوثيق | Types of Documentation:**
- تعليقات الكود للوظائف المعقدة
- ملفات README للمكونات الجديدة
- أدلة المستخدم للميزات الجديدة
- التوثيق التقني للمطورين

### الحصول على المساعدة | Getting Help

إذا كنت بحاجة إلى مساعدة أو لديك أسئلة حول المساهمة، لا تتردد في التواصل معنا من خلال القنوات التالية:

If you need help or have questions about contributing, don't hesitate to contact us through the following channels:

- إنشاء مشكلة جديدة في GitHub للأسئلة التقنية
- التواصل مع فريق التطوير عبر البريد الإلكتروني
- المشاركة في النقاشات المفتوحة

### شكر وتقدير | Acknowledgments

نحن نقدر جميع المساهمين الذين يساعدون في تطوير وتحسين نظام التميز المؤسسي. مساهماتكم تجعل النظام أفضل وأكثر فائدة لهيئة الشارقة للإذاعة والتلفزيون.

We appreciate all contributors who help develop and improve the Award Management System. Your contributions make the system better and more useful for Sharjah Broadcasting Authority.

---

**ملاحظة مهمة:** هذا المشروع يخضع لرخصة MIT. بمساهمتك في هذا المشروع، فإنك توافق على أن تكون مساهماتك مرخصة تحت نفس الرخصة.

**Important Note:** This project is licensed under the MIT License. By contributing to this project, you agree that your contributions will be licensed under the same license.

---

*شكراً لك على اهتمامك بالمساهمة في نظام التميز المؤسسي!*  
*Thank you for your interest in contributing to the Award Management System!*
