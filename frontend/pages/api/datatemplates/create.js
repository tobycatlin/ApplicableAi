import prisma from "@lib/db/prisma";

export default async function handle(req, res) {
  const { name, description, template } = req.body;
  console.log(name, description, template);
  const result = await prisma.DataTemplates.create({
    data: {
      name: name,
      description: description,
      template: template,
    },
  });
  res.json(result);
}
