import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const hrSchema = new Schema(
  {
    emailId: {
      type: String,
      required: [true, 'EmailId is required'],
      unique: true,
      trim: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [5, 'Minimum 5 characters required for password'],
      max: [10, 'Maximum 10 characters allowed for password'],
    },
    firstName: {
      type: String,
      required: [true, 'FirstName is required'],
    },
    lastName: {
      type: String,
      required: [true, 'LastName is required'],
    },
    birthDate: {
      type: Date,
      required: [true, 'BirthDate is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'PhoneNumber is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
  },
  {
    timestamps: true,
  }
);

const hrModel = mongoose.model('Hr', hrSchema);

export default hrModel;
