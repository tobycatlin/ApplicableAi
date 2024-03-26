import { Pool, QueryResultRow } from "pg";

const POOL = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

POOL.on("error", (err) => {
  console.error(
    "Postgres DB POOL ERROR :: Unexpected error on idle client",
    err
  );
  process.exit(-1);
});

export interface PostgresQueryResult {
  boolSuccess: boolean;
  stringError: string;
  stringErrorDetail: string;
  jsonData: any[];
}

/**
 * Run SQL query on the Nakama Postgres database and
 * return query result.
 *
 * @param query PostgresQL query string
 * @param queryParams Postgres query params
 * @returns Postgres query result wrapper
 */
export async function executePostgresQuery(
  query: string,
  queryParams: unknown[] = []
): Promise<PostgresQueryResult> {
  const pgResult = {
    boolSuccess: false,
    stringError: "",
    stringErrorDetail: "",
    jsonData: <any>[],
  };

  const client = await POOL.connect();

  try {
    const res = await client.query(query, queryParams);
    pgResult.boolSuccess = true;
    pgResult.jsonData = res.rows;
    // console.log(`getPostgresQuery for ${stringQuery}:: ${JSON.stringify(pgResult.jsonData)}`)
  } catch (error) {
    pgResult.stringError = "ERR_QUERY";

    if (
      typeof error == "object" &&
      error != null &&
      "stack" in error &&
      typeof error.stack == "string"
    ) {
      pgResult.stringErrorDetail = error.stack;
      console.error(error.stack);
    } else {
      pgResult.stringErrorDetail = `${error}`;
      console.error(error);
    }
  } finally {
    client.release();
  }

  return pgResult;
}

export type PostgresQueryResult2<T = any> =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: T[];
    };

/**
 * Run SQL query on the Nakama Postgres database and
 * return query result.
 *
 * @param sql PostgresQL query string
 * @param params Postgres query params
 * @returns Postgres query result wrapper
 */
export default async function executePostgresQuery2<
  T extends QueryResultRow = any,
>(sql: string, params: unknown[] = []): Promise<PostgresQueryResult2<T>> {
  const client = await POOL.connect();

  try {
    const res = await client.query<T>(sql, params);

    return {
      success: true,
      data: res.rows,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: `${error}`,
    };
  } finally {
    client.release();
  }
}
