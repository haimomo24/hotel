import sql from "mssql";

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: true,
    trustServerCertificate:true,
  },
};

let pool;

export async function getDbPool() {
  if (pool) return pool;
  try {
    pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error("DB Connection Error:", error);
    throw error;
  }
}
