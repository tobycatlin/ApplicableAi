import prisma from "@lib/db/prisma";

export default async function handle(req, res) {
  const {
    name,
    hash,
    description,
    status = "DRAFT",
    datatemplate_id,
  } = req.body;

  // if (!datatemplate_id) {
  //   return res
  //     .status(500)
  //     .json({ message: "Invalid params: no datatemplate_id" });
  // }

  // users: {
  //   connect: userData.map((user) => ({ user_id: user.user_id })),
  // },

  // const result = await prisma.datasets.create({
  //   data: {
  //     name: name,
  //     hash: hash,
  //     description: description,
  //     status: status,
  //     // dataTemplate: {
  //     //   connect: {
  //     //     datatemplate_id: datatemplate_id,
  //     //   },
  //     // },
  //     users: {
  //       connect: [{ user_id: 1 }, { user_id: 2 }],
  //     },
  //   },
  //   include: {
  //     users: true,
  //   },
  // });
  const result = await prisma.datasets.create({
    data: {
      name: "Your Dataset Name",
      description: "Your Dataset Description",
      hash: "Your Dataset Hash",
      status: "DRAFT",
      // createdAt and updatedAt are automatically handled by Prisma
      // If you have an array of user IDs and run IDs, you can provide them here
      users: {
        connect: [
          { user_id: "1" },
          { user_id: "2" },
          // Add more user IDs if needed
        ],
      },
    },
  });

  res.json(result);
}
