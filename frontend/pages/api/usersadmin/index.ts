import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/db/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let response;
    if (req.method === "GET") {
      const id = req.query.id as string | undefined;
      response = await prisma.user.findMany({
        where: { id },
        orderBy: [
          { emailVerified: "asc" },
          { role: "asc" },
        ]
      });

    } else if (req.method === "POST") {
      const user = req.body as Prisma.UserCreateInput;
      user.password = await bcrypt.hash(user.password!, 10);
      // user.emailVerified = false;

      response = await prisma.user.create({
        data: user
      });

    } else if (req.method === "PUT") {
      const { id, data } = req.body as { id: string, data: Prisma.UserCreateInput; };

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      } else {
        delete data.password;
      }

      if (data.emailVerified !== undefined) {
        data.emailVerified = !!data.emailVerified;
      }

      response = await prisma.user.upsert({
        where: { id },
        update: data,
        create: data
      });

    } else if (req.method === "DELETE") {
      const id = req.query.id as string;
      response = await prisma.user.delete({
        where: { id }
      });

    } else {
      res.status(405).end();
    }

    res.json(response);

  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientValidationError) {
      res.status(500).json({ error: "Invalid value" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}