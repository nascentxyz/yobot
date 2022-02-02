// ** Handles Project Requests ** //

import getProjects from "src/lib/Projects";

// ** Request Handler ** //
const handler = async (req, res) => {
  if (req.method === "POST") {
    // TODO: authenticate our post requests
  } else {
    const projects = await getProjects();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ projects: projects });
  }
};

export default handler;
