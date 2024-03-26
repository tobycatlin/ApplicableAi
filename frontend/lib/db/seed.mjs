import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await upsertUsers();
  } catch (e) {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  }

  prisma.$disconnect();
}

async function upsertUsers() {
  await prisma.user.upsert({
    where: { email: "tobycatlin@gmail.com" },
    update: {},
    create: {
      user_id: 1,
      name: "Toby Catlin",
      email: "tobycatlin@gmail.com",
      password: "$2b$10$fwvk5lmo/H71gfZQ.riVFOgn17Ss91tb3yjH.77BAoUB76SCG70my",
      image: "",
      createdAt: "2023-02-09T20:25:11.526Z",
      updatedAt: "2023-02-15T12:13:12.113Z",
      verified: true,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "simon.kincaid@kintronix.com" },
    update: {},
    create: {
      user_id: 2,
      name: "Simon Kincaid",
      email: "simon.kincaid@kintronix.com",
      password: "$2b$10$fwvk5lmo/H71gfZQ.riVFOgn17Ss91tb3yjH.77BAoUB76SCG70my",
      image: "",
      createdAt: "2024-02-09T20:25:11.526Z",
      updatedAt: "2024-02-15T12:13:12.113Z",
      verified: true,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "tester@test.com" },
    update: {},
    create: {
      user_id: 3,
      name: "Test USER",
      email: "tester@test.com",
      password: "$2b$10$fwvk5lmo/H71gfZQ.riVFOgn17Ss91tb3yjH.77BAoUB76SCG70my",
      image: "",
      createdAt: "2024-02-09T20:25:11.526Z",
      updatedAt: "2024-02-15T12:13:12.113Z",
      verified: true,
      role: "USER",
    },
  });

  // Add Runs
  // await prisma.runs.upsert({
  //   where: { run_id: 1 },
  //   update: {},
  //   create: {
  //     name: "Q1 2024",
  //     description: "Quarter One 2024 Solvency 2 run",
  //     startDate: "2024-02-09T20:25:11.526Z",
  //     endDate: "2024-02-09T20:25:11.526Z",
  //   },
  // });

  // Add DataTemplate
  // await prisma.dataTemplates.upsert({
  //   where: { datatemplate_id: 1 },
  //   update: {},
  //   create: {
  //     name: "Q1 2024",
  //     description: "Quarter One 2024 Solvency 2 run",
  //     template: ourFundsTemplate,
  //   },
  // });

  // Add DataSet
  // await prisma.datasets.upsert({
  //   where: { dataset_id: 1 },
  //   update: {},
  //   create: {
  //     name: "Q1 2024",
  //     description: "Quarter One 2024 Solvency 2 run",
  //     hash: "",
  //     status: "DRAFT",
  //     dataTemplates: { connect: [{ datatemplate_id: 1 }] },
  //     users: { connect: [{ user_id: 1 }, { user_id: 2 }] },
  //   },
  // });

  // posts: {
  //   connect: [{ id: 8 }, { id: 9 }, { id: 10 }],
  // },
  // await prisma.Datasets.upsert({
  //   where: { datatemplate_id: 1 },
  //   update: {},
  //   create: {
  //     name: "Test 1",
  //     description: "Please upload a file",
  //     template: "{}",
  //   },
  // });
}

const ourFundsTemplate = `
{
  "$schema":"http://json-schema.org/draft-07/schema#",
  "$id":"http://example.com/person.schema.json",
  "title":"Our Funds",
  "description":"A person",
  "type":"object",
  "properties":{
     "region":{
        "description":"Region EEA or EFTA",
        "type":"string",
        "enum":[
           "EEA",
           "EFTA"
        ],
        "enum_titles":[
           "EEA",
           "EFTA"
        ]
     },
     "reference_period":{
        "description":"Reference period - Year & Quarter",
        "type":"string"
     },
     "item":{
        "description":"Item name",
        "type":"string"
     },
     "item_code":{
        "description":"Item Code",
        "type":"string"
     },
     "value":{
        "description":"Value of fund in GBP",
        "type":"number"
     },
     "date":{
        "description":"Date of extraction (yyyymmdd)",
        "type":"date"
     },
     "submissions":{
        "description":"Count of submissions",
        "type":"number"
     }
  },
  "required":[
     "item_code",
     "value"
  ]
}
`;
main();
