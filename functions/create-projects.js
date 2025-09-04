import { neon } from "@netlify/neon";
const sql = neon();

export default async (req, res) => {
  try {
    const { title, description, image_url, link_url } = JSON.parse(req.body);

    const [project] = await sql`
      INSERT INTO projects (title, description, image_url, link_url)
      VALUES (${title}, ${description}, ${image_url}, ${link_url})
      RETURNING *
    `;

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
