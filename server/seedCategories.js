const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL).then(async () => {
  const Category = require('./models/Category');
  await Category.insertMany([
    { name: 'Web Development', description: 'Web dev courses' },
    { name: 'Python', description: 'Python courses' },
    { name: 'Data Science', description: 'Data science courses' },
    { name: 'Android Development', description: 'Android courses' },
    { name: 'Machine Learning', description: 'ML courses' },
  ]);
  console.log('Categories added successfully!');
  process.exit();
});