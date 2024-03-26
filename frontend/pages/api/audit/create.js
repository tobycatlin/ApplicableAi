import prisma from "@lib/db/prisma";

export default async function handle(req, res) {
  const { log, user_id, user_ip, type } = req.body;

  const result = await prisma.AuditLog.create({
    data: {
      log: log,
      user_id: user_id,
      user_ip: user_ip,
      type: type,
    },
  });
  res.json(result);
}

// POST https://app.local.awesome-golf.com/api/audit/create HTTP/1.1
// content-type: application/json

// {
//       "log": "{}",
//       "user_id": "123123123",
//       "user_ip": "10.20.30.1",
//       "type": "type"
// }
