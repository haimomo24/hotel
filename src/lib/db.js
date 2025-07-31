import sql from "mssql";

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: true,           // Use encryption if connecting to Azure SQL Database or an encrypted SQL Server instance
    trustServerCertificate: true, // Change to 'false' in production if you have a trusted certificate
  },
  pool: { // Add pool configuration here
    max: 10,  // Maximum number of connections in the pool
    min: 0,   // Minimum number of connections in the pool
    idleTimeoutMillis: 30000, // How long a connection can be idle before it's released (30 seconds)
    // acquireTimeoutMillis: 30000 // Optional: How long to wait for an available connection before erroring
  }
};

let pool;
let isConnecting = false; // Flag to prevent multiple concurrent connection attempts

export async function getDbPool() {
  // If a pool already exists and is connected, return it immediately.
  if (pool && pool.connected) {
    return pool;
  }

  // If a connection attempt is already in progress, wait for it to complete.
  if (isConnecting) {
    // A simple busy-waiting or more sophisticated promise-based waiting mechanism can be implemented here.
    // For now, let's just wait a bit and re-check, or let the caller retry.
    // In a real app, you might use a promise that resolves when the connection is ready.
    console.log("Connection is already in progress. Waiting...");
    // A more robust solution would be to return the promise that the current connection attempt is awaiting.
    // For simplicity here, we'll just throw an error or re-check.
    throw new Error("Connection attempt already in progress. Try again soon.");
  }

  try {
    isConnecting = true; // Set flag to indicate connection is in progress
    console.log("Establishing new database connection pool...");
    pool = await sql.connect(config);
    console.log("Database connection pool established.");
    return pool;
  } catch (error) {
    console.error("DB Connection Error:", error);
    // Optionally, perform cleanup if connection fails repeatedly
    if (pool) {
      await pool.close();
      pool = null; // Reset pool on failure
    }
    throw error;
  } finally {
    isConnecting = false; // Reset flag
  }
}

// Optional: Graceful shutdown of the pool
export async function closeDbPool() {
  if (pool && pool.connected) {
    console.log("Closing database connection pool...");
    try {
      await pool.close();
      pool = null;
      console.log("Database connection pool closed.");
    } catch (error) {
      console.error("Error closing DB pool:", error);
    }
  }
}

