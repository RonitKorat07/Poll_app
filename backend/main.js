import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './config/db.js';
import userRouter from './routes/userRoute.js';
import pollRouter from './routes/pollRoute.js';

dotenv.config();
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/poll' , pollRouter)
    
app.listen(process.env.PORT || 3000, ()=> {
    console.log('Server running in port 3000');
    connection();
})