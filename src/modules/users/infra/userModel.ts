import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    roleId: { type: String, required: true, ref: 'Role' },
    refreshToken: { type: String, default: null },
    emailVerificationToken: { type: String, default: null },
    passwordResetToken: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model('User', UserSchema);
