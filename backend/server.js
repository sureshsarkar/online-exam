const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongo = require('./db/mongoDb');

const cookieParser = require('cookie-parser'); // Ensure cookie-parser is required
const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;
app.use(cors()); 
app.use(express.json());
app.use(cookieParser()); 


const userRoutes = require('../backend/routes/userRoutes');
const studentRoutes = require('../backend/routes/studentRoutes');
const subjectRoutes = require('../backend/routes/subjectRoutes');
const courseRoutes = require('../backend/routes/courseRoutes');
const questionRoutes = require('../backend/routes/questionRoutes');
const examRoutes = require('../backend/routes/examRoutes');
app.use('/api/user',userRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/subject',subjectRoutes);
app.use('/api/course',courseRoutes);
app.use('/api/question',questionRoutes);
app.use('/api/exam',examRoutes);

// Connect to MongoDB

app.listen(PORT, () => {
  connectToMongo(); 
  console.log(`Server is running on port ${PORT}`);
});
