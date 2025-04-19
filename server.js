const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// Koneksi ke MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/meethub')
  .then(() => {
    console.log('🟢 Connected to MongoDB');

    const authRouter = require('./routes/auth');
    const limiter = require('./rateLimiter');
    const throttle = require('./throttle');

    const placesRoutes = require('./routes/places');
    const facilitiesRoutes = require('./routes/facilities');
    const activitiesRoutes = require('./routes/activities');
    const placeFacilitiesRoutes = require('./routes/placeFacilities');
    const placeActivitiesRoutes = require('./routes/placeActivities');
    const cachedReviewsRoutes = require('./routes/cachedReviews');
    const filterRouter = require('./controllers/filter');

    app.use(cors());
    app.use(bodyParser.json());
    app.use(limiter);
    app.use(throttle(2000));

    app.use('/places', placesRoutes);
    app.use('/facilities', facilitiesRoutes);
    app.use('/activities', activitiesRoutes);
    app.use('/place-facilities', placeFacilitiesRoutes);
    app.use('/place-activities', placeActivitiesRoutes);
    app.use('/cached-reviews', cachedReviewsRoutes);
    app.use('/filter', filterRouter);
    app.use('/', authRouter);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  }).catch(err => {
    console.error('🔴 MongoDB connection error:', err);
  });
