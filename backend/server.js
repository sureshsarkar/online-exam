const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongo = require('./db/mongoDb');


const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());



const userRoutes = require('../backend/routes/userRoutes');
app.use('/api/auth',userRoutes)

// Connect to MongoDB

app.listen(PORT, () => {
  connectToMongo(); 
  console.log(`Server is running on port ${PORT}`);
});
