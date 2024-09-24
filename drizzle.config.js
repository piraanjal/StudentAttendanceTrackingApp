/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:t0vnouP7wNdq@ep-withered-snow-a5osrucv.us-east-2.aws.neon.tech/attendance-tracker?sslmode=require",
  }
};