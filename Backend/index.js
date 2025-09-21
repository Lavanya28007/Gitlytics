const express = require('express');
const app =express();
const cors = require('cors');
const developerRoutes = require('./routers/developerRouter');
const UserRouter = require('./routers/UserRouter');
const comparisonRouter = require('./routers/ComparisonRouter');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:['http://localhost:3000']
}));
app.use(express.json()); // tp parse json bodies
app.use('/user', UserRouter);
app.use('/developer', developerRoutes);
app.use('/comparison', comparisonRouter);
app.use('/api', developerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Github NodeJS API app!');
});

// Developer routes (all routes in developerRoutes.js will be prefixed with /api)

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}...`));
