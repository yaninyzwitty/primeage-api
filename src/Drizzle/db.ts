import { drizzle } from "drizzle-orm/neon-http"
  import { neon } from '@neondatabase/serverless'
  import * as schema from "./schema"
   import "dotenv/config"



const sql = neon(process.env.Database_URL!)

  const db = drizzle(sql, { schema, logger: false })
 console.log("Connected to the database")


  export default db;