import { NextApiRequest, NextApiResponse } from "next";

// /v2/rpc/pr?http_key=8366a1ce17294f589cf2f71350ed7bd1&unwrap&t=toby&e=test.ten@greatdetail.com&p=12234565
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, token, password } = req.body;

  const NAKAMA_URL = process.env.NAKAMA_API_URL;
  const HTTP_KEY = process.env.HTTP_KEY;
  const response = await fetch(
    `${NAKAMA_URL}/v2/rpc/ags_resetPasswordToken?http_key=${HTTP_KEY}&unwrap`,
    {
      method: "POST",
      body: JSON.stringify({ email, token, password }),
    }
  );

  if (!response.ok) {
    // console.log("Error: ", await response.text());
    res.status(500).json({ success: false, error: "Internal error" });
    return;
  }

  const data = await response.json();

  if ("error" in data) {
    res.status(400).json({ success: false, error: data.error });
  } else {
    res.status(200).json({ success: true });
  }
}
