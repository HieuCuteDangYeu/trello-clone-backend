import bcrypt from 'bcryptjs';
import 'dotenv/config';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../src/config';
import { RoleModel } from '../src/modules/auth/infra/roleModel';
import { UserModel } from '../src/modules/users/infra/userModel';

const seed = async () => {
  console.log('Starting Database Seed...');

  try {
    if (!config.databaseURL) {
      throw new Error('MONGODB_URI is not defined in .env');
    }
    await mongoose.connect(config.databaseURL);
    console.log('Connected to MongoDB');

    const roles = ['user', 'admin'];

    for (const roleName of roles) {
      const exists = await RoleModel.findOne({ name: roleName });
      if (!exists) {
        const newRole = new RoleModel({
          _id: uuidv4(),
          name: roleName,
        });
        await newRole.save();

        console.log(`Created role: ${roleName}`);
      } else {
        console.log(`Role already exists: ${roleName}`);
      }
    }

    const adminEmail = 'admin@trello.com';
    const adminPassword = 'admin123';

    const adminExists = await UserModel.findOne({ email: adminEmail });

    if (!adminExists) {
      const adminRole = await RoleModel.findOne({ name: 'admin' });

      if (!adminRole) {
        throw new Error('Admin role was not created properly');
      }

      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      const newAdmin = new UserModel({
        _id: uuidv4(),
        email: adminEmail,
        username: 'SuperAdmin',
        password: hashedPassword,
        isEmailVerified: true,
        roleId: adminRole._id,
        emailVerificationToken: null,
        refreshToken: null,
        createdAt: new Date(),
      });

      await newAdmin.save();

      console.log(`Created Admin User: ${adminEmail} / ${adminPassword}`);
    } else {
      if (!adminExists.isEmailVerified) {
        adminExists.isEmailVerified = true;
        await adminExists.save();
        console.log(`Updated Admin User (Verified Email)`);
      } else {
        console.log(`Admin user already exists`);
      }
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
