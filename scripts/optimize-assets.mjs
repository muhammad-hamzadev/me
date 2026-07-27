import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

async function optimizeImages() {
    console.log('🖼️  Optimizing ALL project image assets...');

    const targets = [
        {
            file: path.join(rootDir, 'src', 'assets', 'muhammad-hamza-profile.webp'),
            type: 'webp',
            width: 800,
            quality: 80
        },
        {
            file: path.join(rootDir, 'src', 'assets', 'muhammad-hamza-profile.png'),
            type: 'png',
            width: 800
        },
        {
            file: path.join(rootDir, 'src', 'assets', 'hamzax-logo.png'),
            type: 'png',
            width: 160
        },
        {
            file: path.join(rootDir, 'public', 'images', 'muhammad-hamza-profile.jpg'),
            type: 'jpeg',
            width: 800,
            quality: 80
        },
        {
            file: path.join(rootDir, 'public', 'images', 'muhammad-hamza-profile.webp'),
            type: 'webp',
            width: 800,
            quality: 80
        },
        {
            file: path.join(rootDir, 'public', 'images', 'blog', 'quizior-mcq-cover.png'),
            type: 'png',
            width: 800
        },
        {
            file: path.join(rootDir, 'public', 'favicon-512x512.png'),
            type: 'png',
            width: 256
        }
    ];

    for (const target of targets) {
        if (fs.existsSync(target.file)) {
            const inputBuffer = fs.readFileSync(target.file);
            let image = sharp(inputBuffer).resize({ width: target.width, withoutEnlargement: true });

            if (target.type === 'webp') {
                image = image.webp({ quality: target.quality || 80, effort: 6 });
            } else if (target.type === 'jpeg') {
                image = image.jpeg({ quality: target.quality || 80, mozjpeg: true });
            } else if (target.type === 'png') {
                image = image.png({ compressionLevel: 9, palette: true });
            }

            const outputBuffer = await image.toBuffer();
            fs.writeFileSync(target.file, outputBuffer);
            console.log(`✅ Optimized ${path.relative(rootDir, target.file)} (${(outputBuffer.length / 1024).toFixed(1)} KiB)`);
        }
    }
}

optimizeImages().catch(err => {
    console.error('❌ Error optimizing images:', err);
});
