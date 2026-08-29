import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'maya.runner', email: 'maya.chen@mergington.edu', firstName: 'Maya', lastName: 'Chen', role: 'student' },
      { username: 'jordan.strength', email: 'jordan.lee@mergington.edu', firstName: 'Jordan', lastName: 'Lee', role: 'student' },
      { username: 'sam.cyclist', email: 'sam.rivera@mergington.edu', firstName: 'Sam', lastName: 'Rivera', role: 'student' },
      { username: 'paul.octo', email: 'paul.octo@mergington.edu', firstName: 'Paul', lastName: 'Octo', role: 'teacher' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Morning Movers', description: 'A before-school team building a consistent cardio habit.', members: [users[0]._id, users[2]._id] },
      { name: 'Power Hour', description: 'Strength-focused students cheering each other on.', members: [users[1]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceMiles: 3.1, caloriesBurned: 304, points: 62, completedAt: new Date('2026-08-27T07:15:00Z') },
      { user: users[1]._id, type: 'strength training', durationMinutes: 45, caloriesBurned: 280, points: 58, completedAt: new Date('2026-08-26T16:30:00Z') },
      { user: users[2]._id, type: 'cycling', durationMinutes: 50, distanceMiles: 10.4, caloriesBurned: 410, points: 76, completedAt: new Date('2026-08-28T07:00:00Z') },
      { user: users[0]._id, type: 'walking', durationMinutes: 38, distanceMiles: 2.2, caloriesBurned: 170, points: 30, completedAt: new Date('2026-08-28T17:10:00Z') },
    ]);

    await Leaderboard.insertMany([
      { user: users[2]._id, points: 286, rank: 1, period: 'August 2026' },
      { user: users[0]._id, points: 264, rank: 2, period: 'August 2026' },
      { user: users[1]._id, points: 241, rank: 3, period: 'August 2026' },
    ]);

    await Workout.insertMany([
      { name: 'Trail Starter', description: 'An approachable cardio circuit for building endurance.', category: 'cardio', difficulty: 'beginner', durationMinutes: 20, exercises: ['Brisk walk', 'Step-ups', 'Easy jog', 'Cool down'] },
      { name: 'Full Body Circuit', description: 'A balanced strength session using bodyweight movements.', category: 'strength', difficulty: 'intermediate', durationMinutes: 30, exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'] },
      { name: 'Post-Run Reset', description: 'A gentle mobility routine to help muscles recover.', category: 'flexibility', difficulty: 'beginner', durationMinutes: 15, exercises: ['Hamstring stretch', 'Quad stretch', 'Figure-four stretch', 'Child pose'] },
    ]);

    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
    console.log(`Database seeding complete: ${users.length} users, ${teams.length} teams`);
    console.log(`Verify API data at ${baseUrl}/api/users/ and ${baseUrl}/api/teams/`);
    console.log(`Verify API data at ${baseUrl}/api/activities/, ${baseUrl}/api/leaderboard/, and ${baseUrl}/api/workouts/`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
