// скрипт для создания тамнейлс, после создания не нужен?
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fullImagesPath = path.join(__dirname, "../src/assets/images/Gallery/Full");
const thumbsPath = path.join(__dirname, "../src/assets/images/Gallery/Thumbs");

// Читаем все изображения из папки Full
fs.readdir(fullImagesPath, (err, files) => {
  if (err) {
    console.error("❌ Ошибка чтения папки:", err);
    process.exit(1);
  }

  // Фильтруем только изображения
  const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

  if (imageFiles.length === 0) {
    console.log("📁 Нет изображений для обработки в папке Full");
    console.log(`💡 Добавьте изображения в: ${fullImagesPath}`);
    return;
  }

  console.log(`🖼️  Найдено ${imageFiles.length} изображений`);

  let processed = 0;

  imageFiles.forEach((file) => {
    const inputPath = path.join(fullImagesPath, file);
    const outputPath = path.join(thumbsPath, file);

    sharp(inputPath)
      .resize(300, 200, {
        fit: "cover",
        position: "centre",
      })
      .jpeg({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        processed++;
        console.log(`✅ [${processed}/${imageFiles.length}] Создан thumbnail: ${file}`);

        if (processed === imageFiles.length) {
          console.log("🎉 Генерация thumbnails завершена!");
        }
      })
      .catch((err) => console.error(`❌ Ошибка обработки ${file}:`, err.message));
  });
});
