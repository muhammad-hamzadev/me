import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '..', 'src', 'assets');

async function optimizeImages() {
    console.log('🖼️  Optimizing local image assets...');

    // 1. Optimize Profile WebP (1200x2133 -> 800px width max)
    const profilePath = path.join(assetsDir, 'muhammad-hamza-profile.webp');
    if (fs.existsSync(profilePath)) {
        const inputBuffer = fs.readFileSync(profilePath);
        const outputBuffer = await sharp(inputBuffer)
            .resize({ width: 800, withoutEnlargement: true })
            .webp({ quality: 80, effort: 6 })
            .toBuffer();
        fs.writeFileSync(profilePath, outputBuffer);
        console.log(`✅ Optimized muhammad-hamza-profile.webp (${(outputBuffer.length / 1024).toFixed(1)} KiB)`);
    }

    // 2. Optimize Logo (500x500 -> 160x160)
    const logoPath = path.join(assetsDir, 'hamzax-logo.png');
    if (fs.existsSync(logoPath)) {
        const inputBuffer = fs.readFileSync(logoPath);
        const outputBuffer = await sharp(inputBuffer)
            .resize({ width: 160, height: 160, fit: 'contain' })
            .png({ compressionLevel: 9, palette: true })
            .toBuffer();
        fs.writeFileSync(logoPath, outputBuffer);
        console.log(`✅ Optimized hamzax-logo.png (${(outputBuffer.length / 1024).toFixed(1)} KiB)`);
    }
}

optimizeImages().catch(err => {
    console.error('❌ Error optimizing images:', err);
});
