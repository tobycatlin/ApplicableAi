import prisma from "@lib/db/prisma";

export default async function handle(req, res) {
  res.json(await prisma.datasets.findMany());
}
