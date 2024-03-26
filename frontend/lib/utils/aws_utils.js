import {
  CloudWatchLogsClient,
  StartQueryCommand,
  GetQueryResultsCommand,
} from "@aws-sdk/client-cloudwatch-logs";

import parseISO from "date-fns/parseISO";
import getUnixTime from "date-fns/getUnixTime";

export function getClient() {
  const creds = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };

  const client = new CloudWatchLogsClient({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: creds,
  });
  return client;
}

export async function getResult(client, queryId) {
  try {
    const data = await client.send(new GetQueryResultsCommand({ queryId }));
    return data; //For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}

//   filter @message like /Updated Shot by/ | stats count(*) as shotCount by bin(5m)
export async function startQuery(client, query) {
  //   query = {
  //     queryString:
  //       "filter @message like /ags_loginSuccess playerId/ | stats count(*) as logins by bin(30m)",
  //     startTime: getUnixTime(),
  //     endTime: getUnixTime(),
  //     logGroupName: "nk1-nakama",
  //   };
  query =
    "filter @message like /ags_loginSuccess playerId/ | stats count(*) as logins by bin(30m)";
  try {
    const start = getUnixTime();
    const end = getUnixTime();
    const input = {
      startTime: 1669217062,
      endTime: 1669303462,
      logGroupName: "nk1-nakama",
      queryString: query,
    };
    const command = new StartQueryCommand(input);
    const data = await client.send(command);
    return data; //For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
