import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import jwt  from 'jsonwebtoken';

const app = express();
const port = 5000;
const corsOptions = {
    origin: 'http://localhost:3000', // specify the allowed origin(s)
    methods: ['GET', 'POST'], // specify the allowed HTTP methods
    exposedHeaders: ['Content-Type', 'application/json'], // specify the exposed headers
  };
// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    next()
})
app.use(cookieParser());

app.use(
    session({
        secret: 'session-secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, //set to true in production with HTTPS
            httpOnly: true,
            maxAge: 30*60*1000, //30minute
        }
    })
)

// API routes
app.get('/api', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.post('/api/login', (req, res) => {
    // Replace this with your own login logic to authenticate the user
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
      // Generate an access token
      const accessToken = jwt.sign({ username }, 'your-access-token-secret', { expiresIn: '30m' });
    console.log(accessToken);

      // Set the access token as a cookie
      res.cookie('access_token', accessToken, {
        maxAge: 30 * 60 * 1000, // 30 minutes
        httpOnly: true,
        secure: false, // Set to true in a production environment with HTTPS
      });
  
      // Set a session variable to keep track of the user's role or additional data
      req.session.role = 'ADMIN';
  
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  
  app.post('/api/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    // Add your logic to verify and decode the refresh token
    try {
      const decodedToken = jwt.verify(refreshToken, 'your-refresh-token-secret');
      // Assuming you have access to the user ID from the decoded token
      const userId = decodedToken.userId;
  
      // Generate a new access token with an extended expiration time
      const accessToken = jwt.sign({ userId }, 'your-access-token-secret', { expiresIn: '30m' });
  
      // Set the new access token as a cookie
      res.cookie('access_token', accessToken, {
        maxAge: 30 * 60 * 1000, // 30 minutes
        httpOnly: true,
        secure: false, // Set to true in a production environment with HTTPS
      });
  
      res.json({ accessToken });
    } catch (error) {
      // Handle token verification error
      console.error('Failed to verify refresh token', error);
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
