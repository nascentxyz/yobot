import { getProject } from "src/lib";

const handler = async (req, res) => {
  const { id } = req.query

  if (req.method === "POST") {
    // TODO: authenticate our post requests
    // TODO: should allow user to update a project
  } else {
    const project = await getProject(id);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    console.log("Returning json: ", project);
    res.json({ project: project });
  }
}

export default handler;