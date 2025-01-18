const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rushroomreact',
  password: '12345',
  port: 5432,
});

// Initialize DB
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS toilets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        latitude DECIMAL,
        longitude DECIMAL,
        address TEXT,
        is_accessible BOOLEAN,
        is_free BOOLEAN,
        opening_hours TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        toilet_id INTEGER REFERENCES toilets(id),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

module.exports = {
  initDb,
  pool,
};
