const fs = require('fs');
const path = require('path');
const Media = require('../models/Media');
const { cloudinary, isConfigured } = require('../config/cloudinary');

// @desc    Upload media file
// @route   POST /api/media/upload
// @access  Private (Admin)
exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided for upload',
      });
    }

    const file = req.file;
    const ext = path.extname(file.originalname).toLowerCase();
    const originalName = file.originalname;
    const size = file.size;

    // Detect resource type
    let resourceType = 'raw';
    if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'].includes(ext)) {
      resourceType = 'image';
    } else if (['.mp4', '.webm', '.mov', '.ogg'].includes(ext)) {
      resourceType = 'video';
    } else if (['.pdf', '.xls', '.xlsx', '.csv', '.doc', '.docx', '.txt'].includes(ext)) {
      resourceType = 'document';
    }

    // 1. Cloudinary upload if configured
    if (isConfigured()) {
      const uploadOptions = {
        folder: 'edux_platform',
        resource_type: 'auto',
        use_filename: true,
      };

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });

      const media = await Media.create({
        originalName,
        cloudinaryPublicId: result.public_id,
        secureUrl: result.secure_url,
        resourceType,
        format: result.format || ext.replace('.', ''),
        size: result.bytes || size,
        mimeType: file.mimetype,
        uploadedBy: req.user ? req.user._id : null,
      });

      return res.status(201).json({
        success: true,
        message: 'File uploaded to Cloudinary successfully',
        media,
      });
    }

    // 2. Local fallback storage
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFilename);
    fs.writeFileSync(filePath, file.buffer);

    const protocol = req.protocol;
    const host = req.get('host');
    const secureUrl = `${protocol}://${host}/uploads/${uniqueFilename}`;

    const media = await Media.create({
      originalName,
      cloudinaryPublicId: `local-${uniqueFilename}`,
      secureUrl,
      resourceType,
      format: ext.replace('.', ''),
      size,
      mimeType: file.mimetype,
      uploadedBy: req.user ? req.user._id : null,
    });

    return res.status(201).json({
      success: true,
      message: 'File uploaded to local storage successfully',
      media,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all uploaded media
// @route   GET /api/media
// @access  Private (Admin)
exports.getMediaList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.type) {
      query.resourceType = req.query.type;
    }

    const total = await Media.countDocuments(query);
    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      count: media.length,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      media,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media file
// @route   DELETE /api/media/:id
// @access  Private (Admin)
exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media record not found',
      });
    }

    // Delete from Cloudinary if applicable
    if (
      isConfigured() &&
      media.cloudinaryPublicId &&
      !media.cloudinaryPublicId.startsWith('local-')
    ) {
      try {
        await cloudinary.uploader.destroy(media.cloudinaryPublicId);
      } catch (err) {
        console.warn('Cloudinary deletion notice:', err.message);
      }
    } else if (media.cloudinaryPublicId.startsWith('local-')) {
      const filename = media.cloudinaryPublicId.replace('local-', '');
      const localPath = path.join(__dirname, '..', 'uploads', filename);
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
    }

    await media.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Media deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
