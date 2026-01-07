import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './config/dbs.js';
import thoughtRouter from './routes/ThoughtRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Ensure required env vars are present early
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set. Please set it in server/.env');
  process.exit(1);
}

if (!process.env.Mongo_URL) {
  console.error('❌ Mongo_URL is not set. Please set it in server/.env');
  process.exit(1);
}

await connectDB();
// Auto-detect environment and set allowed origins
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction 
  ? ['https://echo-space-nine.vercel.app']
  : ['http://localhost:5173']



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}));

// Mount API routers
app.use('/api', thoughtRouter);
app.use('/auth', authRouter);
app.use('/user', userRoutes);

// Health route
app.get('/', (req, res) => {res.send('Server is Running');})

// // Serve client static files and fallback to index.html in production to support SPA routing
// if (isProduction) {
//   const clientDistPath = path.join(process.cwd(), 'client', 'dist');
//   app.use(express.static(clientDistPath));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(clientDistPath, 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

export default app;