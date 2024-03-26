import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/db/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, name, password } = req.body as {
      email: string;
      name: string;
      password: string;
    };

    const passwordHash = await bcrypt.hash(password, 10);
    const response = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        emailVerified: false,
        role: "USER",
      },
    });
    console.log(response);
    res.json(response);
  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ error: "Invalid value" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
