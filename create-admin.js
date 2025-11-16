// Script to create admin user in MongoDB
import mongoose from 'mongoose';
import config from './config/config.js';
import User from './server/models/user.model.js';

// Connect to MongoDB
mongoose.connect(config.mongoUri)
    .then(() => {
        console.log('Connected to database!');
        return createAdmin();
    })
    .then(() => {
        console.log('\nAdmin setup complete!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });

async function createAdmin() {
    // Delete existing admin if exists
    await User.deleteOne({ email: 'admin@portfolio.com' });

    // Create new admin user
    const admin = new User({
        name: 'Admin User',
        email: 'admin@portfolio.com',
        password: 'admin123'
    });

    await admin.save();
    console.log('\n=== ADMIN CREDENTIALS CREATED ===');
    console.log('Email: admin@portfolio.com');
    console.log('Password: admin123');
    console.log('==================================\n');
    console.log('You can now sign in with these credentials!');
}
