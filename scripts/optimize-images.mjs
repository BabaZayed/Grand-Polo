import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const FLOORPLANS_DIR = '/home/z/grand-polo/public/images/floorplans';
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;
const JPG_QUALITY = 80;
const RESIZE_THRESHOLD = 2000;

async function getFileSize(filePath) {
  const s = await stat(filePath);
  return s.size;
}

async function getTotalJpgSize(dir) {
  const files = await readdir(dir);
  // Only count original JPGs (exclude -optimized.jpg versions)
  const jpgFiles = files.filter(f =>
    (f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg')) &&
    !f.endsWith('-optimized.jpg')
  );
  let total = 0;
  for (const f of jpgFiles) {
    total += await getFileSize(join(dir, f));
  }
  return { total, count: jpgFiles.length, files: jpgFiles };
}

async function getTotalSizeByExt(dir, ext) {
  const files = await readdir(dir);
  const matching = files.filter(f => f.toLowerCase().endsWith(ext));
  let total = 0;
  for (const f of matching) {
    total += await getFileSize(join(dir, f));
  }
  return { total, count: matching.length };
}

async function processImage(inputPath, outputPath, format, quality, maxWidth, resizeThreshold) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  let pipeline = sharp(inputPath);
  
  // Resize if wider than threshold
  if (metadata.width > resizeThreshold) {
    pipeline = pipeline.resize(maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside',
    });
  }
  
  if (format === 'webp') {
    pipeline = pipeline.webp({ quality });
  } else if (format === 'jpg' || format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true });
  }
  
  await pipeline.toFile(outputPath);
  
  return {
    originalWidth: metadata.width,
    originalHeight: metadata.height,
    resized: metadata.width > resizeThreshold,
  };
}

function formatBytes(bytes) {
  const abs = Math.abs(bytes);
  if (abs === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(abs) / Math.log(k));
  const val = parseFloat((abs / Math.pow(k, i)).toFixed(2));
  return (bytes < 0 ? '-' : '') + val + ' ' + sizes[i];
}

async function main() {
  console.log('='.repeat(60));
  console.log('Floor Plan Image Optimization');
  console.log('='.repeat(60));
  
  // Get original sizes
  const { total: originalTotal, count: imageCount, files: jpgFiles } = await getTotalJpgSize(FLOORPLANS_DIR);
  console.log(`\n📁 Found ${imageCount} JPG images`);
  console.log(`📦 Original total size: ${formatBytes(originalTotal)}`);
  
  let processed = 0;
  let errors = 0;
  let resizedCount = 0;
  
  // Process each image
  for (const file of jpgFiles.sort()) {
    const inputPath = join(FLOORPLANS_DIR, file);
    const nameWithoutExt = basename(file, extname(file));
    
    try {
      // Generate WebP version
      const webpPath = join(FLOORPLANS_DIR, `${nameWithoutExt}.webp`);
      const result = await processImage(inputPath, webpPath, 'webp', WEBP_QUALITY, MAX_WIDTH, RESIZE_THRESHOLD);
      
      // Generate optimized JPG version
      const optimizedJpgPath = join(FLOORPLANS_DIR, `${nameWithoutExt}-optimized.jpg`);
      await processImage(inputPath, optimizedJpgPath, 'jpg', JPG_QUALITY, MAX_WIDTH, RESIZE_THRESHOLD);
      
      if (result.resized) resizedCount++;
      
      processed++;
      if (processed % 10 === 0 || processed === imageCount) {
        console.log(`  Processed ${processed}/${imageCount}...`);
      }
    } catch (err) {
      console.error(`  ❌ Error processing ${file}: ${err.message}`);
      errors++;
    }
  }
  
  // Get new sizes
  const webpStats = await getTotalSizeByExt(FLOORPLANS_DIR, '.webp');
  const optimizedJpgStats = await getTotalSizeByExt(FLOORPLANS_DIR, '-optimized.jpg');
  
  console.log('\n' + '='.repeat(60));
  console.log('RESULTS');
  console.log('='.repeat(60));
  console.log(`  Images processed:     ${processed}`);
  console.log(`  Errors:               ${errors}`);
  console.log(`  Images resized:       ${resizedCount} (width > ${RESIZE_THRESHOLD}px → max ${MAX_WIDTH}px)`);
  console.log('');
  console.log(`  Original JPG total:   ${formatBytes(originalTotal)} (${imageCount} files)`);
  console.log(`  WebP total:           ${formatBytes(webpStats.total)} (${webpStats.count} files)`);
  console.log(`  Optimized JPG total:  ${formatBytes(optimizedJpgStats.total)} (${optimizedJpgStats.count} files)`);
  console.log('');
  console.log(`  WebP savings:         ${formatBytes(originalTotal - webpStats.total)} (${((1 - webpStats.total / originalTotal) * 100).toFixed(1)}% reduction)`);
  console.log(`  Opt. JPG savings:     ${formatBytes(originalTotal - optimizedJpgStats.total)} (${((1 - optimizedJpgStats.total / originalTotal) * 100).toFixed(1)}% reduction)`);
  console.log('');
  console.log('  ✅ Original JPG files preserved as fallbacks');
  console.log('  ✅ WebP versions created with .webp extension');
  console.log('  ✅ Optimized JPG versions created with -optimized.jpg suffix');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
