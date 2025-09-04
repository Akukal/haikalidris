import { neon } from "@netlify/neon";
const sql = neon();

export default async (req, res) => {
  try {
    const projects = await sql`SELECT * FROM projects ORDER BY id DESC`;
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
