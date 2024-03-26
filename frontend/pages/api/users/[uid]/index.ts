import { executePostgresQuery } from "@lib/db/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryResult = await executePostgresQuery(
    `
      SELECT 
        username, 
        display_name, 
        email,metadata, 
        metadata->'gs_playerId' as gs_playerId, 
        id, 
        update_time 
      FROM users 
      WHERE id = $1 
      LIMIT 1
    `,
    [req.query.uid]
  );

  if (queryResult.boolSuccess) {
    res.status(200).json(queryResult);
  } else {
    res.status(500).json(queryResult);
  }
}
