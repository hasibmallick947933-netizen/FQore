const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Content title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    content: {
      type: String,
      default: '',
    },
    contentType: {
      type: String,
      required: [true, 'Content type is required'],
      enum: [
        'article',
        'video',
        'pdf',
        'excel',
        'csv',
        'image',
        'case_study',
        'company_analysis',
        'market_analysis',
        'educational_note',
        'external_resource',
      ],
      default: 'article',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    subcategory: {
      type: String,
      default: '',
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    thumbnail: {
      type: String,
      default: '',
    },
    mediaUrl: {
      type: String,
      default: '',
    },
    mediaDetails: {
      originalName: { type: String, default: '' },
      cloudinaryPublicId: { type: String, default: '' },
      format: { type: String, default: '' },
      size: { type: Number, default: 0 },
      mimeType: { type: String, default: '' },
    },
    externalUrl: {
      type: String,
      default: '',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    authorName: {
      type: String,
      default: 'Admin',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    bookmarkCount: {
      type: Number,
      default: 0,
    },
    readTimeMinutes: {
      type: Number,
      default: 5,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    structuredDetails: {
      companyName: { type: String, default: '' },
      ticker: { type: String, default: '' },
      sector: { type: String, default: '' },
      industry: { type: String, default: '' },
      businessModel: { type: String, default: '' },
      revenueSources: [{ type: String }],
      competitiveAdvantages: [{ type: String }],
      risks: [{ type: String }],
      financialHighlights: { type: String, default: '' },
      lessonsLearned: [{ type: String }],
      problems: { type: String, default: '' },
      solutions: { type: String, default: '' },
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
    seoKeywords: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// slug is automatically indexed by unique: true
contentSchema.index({ category: 1, published: 1, featured: 1 });
contentSchema.index({ contentType: 1, published: 1 });
contentSchema.index({ title: 'text', description: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Content', contentSchema);
