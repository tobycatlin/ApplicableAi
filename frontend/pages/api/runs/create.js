import prisma from "@lib/db/prisma";

export default async function handle(req, res) {
  const { name, description, startDate, endDate } = req.body;

  // users: {
  //   connect: userData.map((user) => ({ user_id: user.user_id })),
  // },

  const result = await prisma.runs.create({
    data: {
      name,
      description,
      startDate,
      endDate,
      user: {
        connect: {
          user_id: 1,
        },
      },
      dataset: {
        connect: {
          dataset_id: 1,
        },
      },
    },
  });

  res.json(result);
}
