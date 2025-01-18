// // server.js
// const express = require('express');

// const cors = require('cors');
// const {pool , initDb} = require("./db")
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// // 1. Get all toilets with optional filters
// app.get('/api/toilets', async (req, res) => {
//   const { accessible, free, minRating } = req.query;
//   let query = `
//     SELECT t.*, 
//            COALESCE(AVG(r.rating), 0) as average_rating,
//            COUNT(r.id) as review_count
//     FROM toilets t
//     LEFT JOIN reviews r ON t.id = r.toilet_id
//   `;
  
//   const conditions = [];
//   if (accessible) conditions.push('t.is_accessible = true');
//   if (free) conditions.push('t.is_free = true');
  
//   if (conditions.length) {
//     query += ' WHERE ' + conditions.join(' AND ');
//   }
  
//   query += ' GROUP BY t.id';
  
//   if (minRating) {
//     query += ` HAVING COALESCE(AVG(r.rating), 0) >= ${minRating}`;
//   }
  
//   const { rows } = await pool.query(query);
//   res.json(rows);
// });

// // 2. Add new toilet
// app.post('/api/toilets', async (req, res) => {
//   const { name, latitude, longitude, address, is_accessible, is_free, opening_hours } = req.body;
//   const { rows } = await pool.query(
//     'INSERT INTO toilets (name, latitude, longitude, address, is_accessible, is_free, opening_hours) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
//     [name, latitude, longitude, address, is_accessible, is_free, opening_hours]
//   );
//   res.json(rows[0]);
// });

// // 3. Add review
// app.post('/api/toilets/:id/reviews', async (req, res) => {
//   const { rating, comment } = req.body;
//   const toiletId = req.params.id;
//   const { rows } = await pool.query(
//     'INSERT INTO reviews (toilet_id, rating, comment) VALUES ($1, $2, $3) RETURNING *',
//     [toiletId, rating, comment]
//   );
//   res.json(rows[0]);
// });

// // 4. Get reviews for a toilet
// app.get('/api/toilets/:id/reviews', async (req, res) => {
//   const toiletId = req.params.id;
//   const { rows } = await pool.query(
//     'SELECT * FROM reviews WHERE toilet_id = $1 ORDER BY created_at DESC',
//     [toiletId]
//   );
//   res.json(rows);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   initDb();
// });




const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Dummy toilet data
const toilets = [
  {
    id: 1,
    name: "Oxford Street Restroom",
    location: "Near Oxford Circus",
    condition: "Clean",
    facilities: {
      baby_changing: true,
      wheelchair_accessible: true,
    },
    coordinates: {
      lat: 9.964779,
      lng : 76.24215
    },
  },
  {
    id: 2,
    name: "Hyde Park Public Toilet",
    location: "Near Serpentine Lake",
    condition: "Moderate",
    facilities: {
      baby_changing: false,
      wheelchair_accessible: true,
    },
    coordinates: {
      lat: 9.955779,
      lng : 76.251115
    },
  },
  {
    id: 3,
    name: "Downtown Plaza Restroom",
    location: "Near Parking Lot B",
    condition: "Poor",
    facilities: null,
    coordinates: {
      lat: 9.965129,
      lng : 76.245425
    },
  },
];

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Rushroom API!");
});

// Endpoint to get the list of toilets
app.get("/api/list", (req, res) => {
  res.json(toilets);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
