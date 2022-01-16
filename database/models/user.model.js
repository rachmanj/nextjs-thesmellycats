import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
  email: {
    required: [true, 'Email is required'],
    type: String,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    required: [true, 'The password is required'],
    type: String,
    trim: true,
  },
  firstname: {
    type: String,
    maxlength: 150,
    trim: true,
    default: 'User Name',
  },
  lastname: {
    type: String,
    maxlength: 150,
    trim: true,
    default: 'User Last Name',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
