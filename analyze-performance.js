const fs = require('fs');
const path = require('path');

function getDirectorySize(dirPath) {
  let totalSize = 0;
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  });
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeProject() {
  console.log('\n🔍 تحليل حجم وأداء المشروع\n');
  console.log('='.repeat(60));
  
  // Public folder
  const publicPath = path.join(__dirname, 'public');
  const publicSize = getDirectorySize(publicPath);
  console.log(`\n📁 مجلد Public: ${formatBytes(publicSize)}`);
  
  const publicFiles = fs.readdirSync(publicPath);
  console.log(`   عدد الملفات: ${publicFiles.length}`);
  
  // Analyze images
  const images = publicFiles.filter(f => /\.(png|jpg|jpeg|webp|svg|avif)$/i.test(f));
  console.log(`   الصور: ${images.length} ملف`);
  
  let imageDetails = [];
  images.forEach(img => {
    const imgPath = path.join(publicPath, img);
    const size = fs.statSync(imgPath).size;
    imageDetails.push({ name: img, size });
  });
  
  imageDetails.sort((a, b) => b.size - a.size);
  console.log('\n   أكبر 5 صور:');
  imageDetails.slice(0, 5).forEach(img => {
    console.log(`   - ${img.name}: ${formatBytes(img.size)}`);
  });
  
  // Source code
  const srcPath = path.join(__dirname, 'src');
  const srcSize = getDirectorySize(srcPath);
  console.log(`\n📝 مجلد المصدر (src): ${formatBytes(srcSize)}`);
  
  // Build folder
  const buildPath = path.join(__dirname, '.next');
  if (fs.existsSync(buildPath)) {
    const buildSize = getDirectorySize(buildPath);
    console.log(`\n🏗️  مجلد البناء (.next): ${formatBytes(buildSize)}`);
  }
  
  // Dependencies
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    const nodeModulesSize = getDirectorySize(nodeModulesPath);
    console.log(`\n📦 المكتبات (node_modules): ${formatBytes(nodeModulesSize)}`);
  }
  
  // Package.json analysis
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log(`\n📚 المكتبات المستخدمة:`);
  console.log(`   Dependencies: ${Object.keys(packageJson.dependencies || {}).length}`);
  console.log(`   DevDependencies: ${Object.keys(packageJson.devDependencies || {}).length}`);
  
  console.log('\n' + '='.repeat(60));
  console.log('\n✅ تم التحليل بنجاح!\n');
}

analyzeProject();
