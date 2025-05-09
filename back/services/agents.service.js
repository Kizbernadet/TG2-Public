// services/agents.service.js

const db = require('../models/db.js');

exports.fetchAllAgents = async () => {
  const result = await db.query('SELECT * FROM agents ORDER BY id');
  return result.rows; // .rows si tu es bien avec PostgreSQL
};
