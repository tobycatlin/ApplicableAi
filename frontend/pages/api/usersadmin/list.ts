import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/db/prisma";
import { Prisma } from "@prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response;
  response = await prisma.user.findMany();
  res.status(200).json(response);
}
