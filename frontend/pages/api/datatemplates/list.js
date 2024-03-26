import prisma from "@lib/db/prisma";

export default async function handler(req, res) {
  res.json(await prisma.DataTemplates.findMany());
}
