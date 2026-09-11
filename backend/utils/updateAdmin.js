const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const updateAdminUser = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is required.');
      process.exit(1);
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    const targetEmail = 'fqorein@gmail.com';
    const newPassword = 'sunny005';

    let user = await User.findOne({ email: targetEmail });
    if (user) {
      console.log(`User ${targetEmail} exists. Updating password and ensuring admin role...`);
      user.password = newPassword;
      user.role = 'admin';
      await user.save();
      console.log(`Successfully updated ${targetEmail} with admin role and password.`);
    } else {
      console.log(`User ${targetEmail} does not exist. Creating new admin user...`);
      user = await User.create({
        name: 'FQore Administrator',
        email: targetEmail,
        password: newPassword,
        role: 'admin',
        bio: 'Platform founder, institutional equity analyst and educational director.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      });
      console.log(`Successfully created admin user ${targetEmail}!`);
    }

    // Verify authentication
    const verifyUser = await User.findOne({ email: targetEmail }).select('+password');
    const isMatch = await verifyUser.comparePassword(newPassword);
    console.log(`Password verification test: ${isMatch ? 'PASSED ✅' : 'FAILED ❌'}`);

    await mongoose.disconnect();
    console.log('Database disconnected.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin user:', error);
    process.exit(1);
  }
};

updateAdminUser();
