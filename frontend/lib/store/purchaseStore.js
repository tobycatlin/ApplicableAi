import {
  get,
  set,
  action,
  observable,
  computed,
  runInAction,
  makeObservable,
  toJS,
} from "mobx";

import find from "lodash/find";
import filter from "lodash/filter";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";
import map from "lodash/map";

import {
  subDays,
  startOfYesterday,
  endOfYesterday,
  startOfDay,
  endOfDay,
} from "date-fns";

import { enableStaticRendering } from "mobx-react-lite";
enableStaticRendering(typeof window === "undefined");

export class Store {
  loading = false;
  errors = [];

  // QueryBar
  queryVariables = false;
  startDate = subDays(endOfYesterday(), 3);
  endDate = endOfYesterday();

  constructor() {
    makeObservable(this, {
      loading: observable,
      errors: observable,
      queryVariables: observable,
      searchText: observable,
      searchPreset: observable,
      startDate: observable,
      endDate: observable,

      addError: action,
      setLoading: action,

      setQueryVariables: action,
      setQueryStartDate: action,
      setQueryEndDate: action,

      hydrate: action,
    });
  }

  setLoading = (loading) => {
    this.loading = loading;
  };

  addError = (error) => {
    this.errors.push(error);
  };

  setQueryVariables = () => {
    this.queryVariables = {
      startDate: this.startDate,
      endDate: this.endDate,
      environment: this.environment,
      searchText: this.searchText,
    };
  };

  setQueryStartDate = (startDate) => {
    this.startDate = startDate;
  };

  setQueryEndDate = (endDate) => {
    this.endDate = endDate;
  };

  hydrate = (data) => {
    if (!data) return;
  };
}
