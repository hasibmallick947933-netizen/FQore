const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      default: '',
    },
    secureUrl: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      enum: ['image', 'video', 'raw', 'document'],
      default: 'image',
    },
    format: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 0,
    },
    mimeType: {
      type: String,
      default: '',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Media', mediaSchema);
