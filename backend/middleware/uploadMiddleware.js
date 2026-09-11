const multer = require('multer');
const path = require('path');

const allowedExtensions = [
  // Images
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
  // Videos
  '.mp4', '.webm', '.mov', '.ogg',
  // Documents & Data
  '.pdf', '.xls', '.xlsx', '.csv', '.doc', '.docx', '.txt', '.zip'
];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type '${ext}'. Permitted: Images, Videos, PDFs, Excel (.xls/.xlsx), CSV, Documents.`), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
  fileFilter,
});

module.exports = upload;
