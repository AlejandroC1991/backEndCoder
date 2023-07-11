import mongoose from 'mongoose';


const ResetPasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1h'
  }
});

const ResetPassword = mongoose.model('ResetPassword', ResetPasswordSchema);

export default ResetPassword;