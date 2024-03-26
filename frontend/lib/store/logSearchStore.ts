import { makeAutoObservable } from "mobx";

import {
  subDays,
  getUnixTime,
  startOfYesterday,
  startOfToday,
  endOfHour,
} from "date-fns";

import { enableStaticRendering } from "mobx-react-lite";
import status from "./statusBar";

enableStaticRendering(typeof window === "undefined");

type Environment = "nk1-nakama" | "test-nakama" | "dev-nakama";
type Level = "all" | "debug" | "info" | "warn" | "error";

interface NakamaLog {
  level: string;
  ts: string;
  caller: string;
  msg: string;
  rpc_id?: string;
  id?: string | number;
}

class LogSearchStore {
  loading = false;
  errors: string[] = [];

  client?: undefined;
  queryId = "";
  logs: NakamaLog[] = [];

  cancel = false;

  // QueryBar
  startDate = subDays(startOfToday(), 2);
  endDate = new Date();
  environment: Environment = "nk1-nakama";
  searchText = "";
  level: Level = "all";
  rpc = "";
  limit = 100;

  constructor() {
    makeAutoObservable(this);
  }

  addError = (error: string) => {
    this.errors.push(error);
  };

  setStartDate = (startDate: Date) => {
    this.startDate = startDate;
  };

  setEndDate = (endDate: Date) => {
    this.endDate = endDate;
  };

  setEnvironment = (environment: string) => {
    this.environment = environment as Environment;
  };

  setSearchText = (text: string) => {
    this.searchText = text;
  };

  setLevel = (level: string) => {
    this.level = level as Level;
  };

  setRpc = (rpc: string) => {
    this.rpc = rpc;
  };

  setLimit = (limit: number | string) => {
    this.limit = parseInt(`${limit}`);
  };

  loadAll() {
    return this.searchText === "" && this.level === "all" && this.rpc === "";
  }

  hydrate = (data: this) => {
    if (!data) return;
  };

  getResult = async () => {
    let queryResult;

    // let _results;
    do {
      if (this.cancel) {
        this.cancel = false;
        return;
      }

      await new Promise((res) => setTimeout(res, 1000));

      const logs = [];

      this.logs = logs;
    } while (queryResult.status !== "Complete");
  };

  // query syntax
  // https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html
  // filter @message like /Updated Shot by/ | stats count(*) as shotCount by bin(5m)
  startQuery = async () => {
    // if (store.searchText.length < 3) return;
    this.loading = true;
    const bar = status.loading();

    const filters = [];

    const query =
      filters.length === 0
        ? "sort @timestamp desc"
        : "filter " + filters.join(" and ");

    // const command = new StartQueryCommand({
    //   startTime: getUnixTime(this.startDate),
    //   endTime: getUnixTime(this.endDate),
    //   logGroupName: this.environment,
    //   queryString: query,
    //   limit: this.limit,
    // });

    // const output = await this.client!.send(command);

    this.queryId = "";

    await this.getResult();

    this.loading = false;
    bar.delete();
  };

  cancelSearch = () => {
    this.cancel = true;
  };
}

const logSearchStore = new LogSearchStore();
export default logSearchStore;
