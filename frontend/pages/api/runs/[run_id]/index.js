import prisma from "@lib/db/prisma";

export default async function handle(req, res) {
  const userId = req.query.dataset_id;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const user = await prisma.datasets.findUnique({
      where: {
        dataset_id: parseInt(userId),
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
