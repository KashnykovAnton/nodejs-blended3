const { connect } = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_DB_URI;
  const db = await connect(uri);
  const { name, port, host } = db.connection;
  console.log(
    `MongoDB connected: db-name: ${name}, PORT: ${port}, host: ${host}`.cyan
  );
};

module.exports = connectDB;
