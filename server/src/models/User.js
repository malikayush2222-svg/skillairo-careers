import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },

    phone: {
      type: String,
      default: ''
    },

    location: {
      type: String,
      default: ''
    },

    education: {
      type: String,
      default: ''
    },

    skills: {
      type: [String],
      default: []
    },

    resumeUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', schema);