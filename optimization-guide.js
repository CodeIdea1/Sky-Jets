const fs = require('fs');
const path = require('path');

console.log('\n🎨 دليل تحسين الصور والأداء\n');
console.log('='.repeat(60));

console.log('\n📋 الخطوات المطلوبة:\n');

console.log('1️⃣  تثبيت أدوات التحسين:');
console.log('   npm install -D sharp svgo imagemin imagemin-webp\n');

console.log('2️⃣  تحسين ملفات SVG الكبيرة:');
console.log('   - mainPlane.svg (3.75 MB) → يمكن تقليله إلى ~500KB');
console.log('   - 111.svg (3.20 MB) → يمكن تقليله إلى ~400KB');
console.log('   استخدم: https://jakearchibald.github.io/svgomg/\n');

console.log('3️⃣  تحويل الصور PNG إلى WebP:');
const publicPath = path.join(__dirname, 'public');
const pngFiles = fs.readdirSync(publicPath).filter(f => f.endsWith('.png'));
console.log(`   عدد ملفات PNG: ${pngFiles.length}`);
pngFiles.forEach(file => {
  const size = fs.statSync(path.join(publicPath, file)).size;
  const sizeMB = (size / (1024 * 1024)).toFixed(2);
  console.log(`   - ${file} (${sizeMB} MB)`);
});

console.log('\n4️⃣  تحديث next.config.ts:');
console.log(`
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};
`);

console.log('\n5️⃣  استبدال <img> بـ <Image> من Next.js:');
console.log(`
import Image from 'next/image';

// قبل:
<img src="/mainPlane.svg" alt="Aircraft" />

// بعد:
<Image 
  src="/mainPlane.svg" 
  alt="Aircraft"
  width={800}
  height={600}
  priority={true}
  quality={85}
/>
`);

console.log('\n6️⃣  إضافة Dynamic Imports:');
console.log(`
import dynamic from 'next/dynamic';

const AircraftDetails = dynamic(
  () => import('./sections/AircraftDetails'),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);
`);

console.log('\n7️⃣  تحسين GSAP:');
console.log(`
// في AircraftDetails.tsx
useEffect(() => {
  // استخدم will-change بحذر
  gsap.set(element, { 
    force3D: true,
    willChange: 'transform'
  });
  
  // نظف بعد الانتهاء
  return () => {
    gsap.set(element, { willChange: 'auto' });
  };
}, []);
`);

console.log('\n8️⃣  إضافة Loading States:');
console.log(`
// في page.tsx
import { Suspense } from 'react';

<Suspense fallback={<LoadingSpinner />}>
  <AircraftDetails />
</Suspense>
`);

console.log('\n' + '='.repeat(60));
console.log('\n💡 نصائح إضافية:\n');
console.log('✓ استخدم Chrome DevTools Lighthouse لقياس الأداء');
console.log('✓ فعّل Gzip/Brotli compression على السيرفر');
console.log('✓ استخدم CDN للملفات الثابتة (Cloudflare, AWS CloudFront)');
console.log('✓ أضف Service Worker للتخزين المؤقت');
console.log('✓ قلل استخدام الرسوم المتحركة على الأجهزة الضعيفة\n');

console.log('📊 لقياس الأداء الحالي:');
console.log('   npm run dev');
console.log('   افتح Chrome DevTools → Lighthouse → Run Analysis\n');

console.log('✅ تم إنشاء الدليل بنجاح!\n');
