/**
 * Migration Script: Set default goal values for existing users
 * 
 * Usage: node scripts/migrateUserGoals.js
 * 
 * This script updates all existing users in the database that have missing,
 * null, or undefined goal fields with sensible defaults.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const connectDB = require('../src/config/db');

const DEFAULT_GOALS = {
    calorieGoal: 2000,
    proteinGoal: 120,
    carbGoal: 250,
    fatGoal: 70,
};

const migrateUserGoals = async () => {
    try {
        // Connect to database
        await connectDB();
        console.log('[Migration] Connected to database');

        // Find users with missing or null goal fields
        const users = await User.find({
            $or: [
                { calorieGoal: { $exists: false } },
                { calorieGoal: null },
                { proteinGoal: { $exists: false } },
                { proteinGoal: null },
                { carbGoal: { $exists: false } },
                { carbGoal: null },
                { fatGoal: { $exists: false } },
                { fatGoal: null },
            ],
        });

        console.log(`[Migration] Found ${users.length} users needing migration`);

        if (users.length === 0) {
            console.log('[Migration] No users to migrate. All users have goal values.');
            await mongoose.connection.close();
            return;
        }

        // Update each user
        let updated = 0;
        for (const user of users) {
            if (!user.calorieGoal) user.calorieGoal = DEFAULT_GOALS.calorieGoal;
            if (!user.proteinGoal) user.proteinGoal = DEFAULT_GOALS.proteinGoal;
            if (!user.carbGoal) user.carbGoal = DEFAULT_GOALS.carbGoal;
            if (!user.fatGoal) user.fatGoal = DEFAULT_GOALS.fatGoal;

            await user.save();
            updated++;
            console.log(`[Migration] Updated user: ${user.email}`);
        }

        console.log(`[Migration] Successfully migrated ${updated} users`);
        console.log('[Migration] Default goals applied:');
        console.log(`  - Calorie Goal: ${DEFAULT_GOALS.calorieGoal}`);
        console.log(`  - Protein Goal: ${DEFAULT_GOALS.proteinGoal}g`);
        console.log(`  - Carb Goal: ${DEFAULT_GOALS.carbGoal}g`);
        console.log(`  - Fat Goal: ${DEFAULT_GOALS.fatGoal}g`);

        await mongoose.connection.close();
        console.log('[Migration] Database connection closed');
    } catch (error) {
        console.error('[Migration] Error during migration:', error);
        process.exit(1);
    }
};

migrateUserGoals();
