import prisma from "@lib/db/prisma";

export default async function handle(req, res) {
  const id = req.query.datatemplate_id;
  console.log("ID", id);
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const user = await prisma.dataTemplates.findUnique({
      where: {
        datatemplate_id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
