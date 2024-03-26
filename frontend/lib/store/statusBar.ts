import { makeAutoObservable } from "mobx";
import { ReactNode } from "react";

/**
 * Default delay (in milliseconds) before auto-removal
 */
const DELAY = 15_000;

export class Status {
  constructor(
    public status: "loading" | "error" | "success" | "warning",
    public title?: string,
    public message?: ReactNode,
    expire = DELAY
  ) {
    makeAutoObservable(this);

    if (expire > 0) this.delete(expire);
  }

  /**
   * Change status to error, with an optional message and auto-removal
   * 
   * @param title Status title
   * @param message Status message
   * @param expire Delay (in milliseconds) before auto-removal. 15 secs default
   */
  error = (title: string, message: ReactNode = "", expire = DELAY) => {
    this.status = "error";
    this.title = title;
    this.message = message;

    if (expire > 0) this.delete(expire);
  };

  /**
   * Change status to success, with an optional message and auto-removal
   * 
   * @param title Status title
   * @param message Status message
   * @param expire Delay (in milliseconds) before auto-removal. 15 secs default
   */
  success = (title: string, message: ReactNode = "", expire = DELAY) => {
    this.status = "success";
    this.title = title;
    this.message = message;

    if (expire > 0) this.delete(expire);
  };

  /**
   * Change status to warning, with an optional message and auto-removal
   * 
   * @param title Status title
   * @param message Status message
   * @param expire Delay (in milliseconds) before auto-removal. 15 secs default
   */
  warn = (title: string, message: ReactNode = "", expire = DELAY) => {
    this.status = "warning";
    this.title = title;
    this.message = message;

    if (expire > 0) this.delete(expire);
  };

  /**
   * Change status to loading, with an optional message
   * 
   * @param title Status title
   * @param message Status message
   */
  loading = (title: string, message: ReactNode = "") => {
    this.status = "loading";
    this.title = title;
    this.message = message;
  };

  /**
   * Delete bar, after an optional delay (in milliseconds)
   * 
   * @param delay Delay in milliseconds before removing the status
   */
  delete = (delay = 0) => {
    if (delay > 0) {
      setTimeout(() => {
        status.remove(this);
      }, delay);
    } else {
      status.remove(this);
    }
  };
}

class StatusBar {
  statuses: Status[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Create a new loading status bar and return a handle to it
   * 
   * @param title Loading message
   * @returns Status bar object
   */
  loading = (title?: string, message?: ReactNode) => {
    const status = new Status("loading", title, message);
    this.statuses.push(status);
    return status;
  };

  /**
   * Create a new success status bar and return a handle to it
   * 
   * @param title Success title
   * @param message Success message
   * @param expire Delay (in milliseconds) before auto-removal. 15 secs default
   * @returns Status bar object
   */
  success = (title: string, message?: string, expire = DELAY) => {
    const status = new Status("success", title, message, expire);
    this.statuses.push(status);
    return status;
  };

  /**
   * Create a new error status bar and return a handle to it
   * 
   * @param title Error title
   * @param message Error message
   * @param expire Delay (in milliseconds) before auto-removal. 15 secs default
   * @returns Status bar object
   */
  error = (title: string, message?: string, expire = DELAY) => {
    const status = new Status("error", title, message, expire);
    this.statuses.push(status);
    return status;
  };

  /**
   * Create a new warning status bar and return a handle to it
   * 
   * @param title Warning title
   * @param message Warning message
   * @param expire Delay (in milliseconds) before auto-removal. 15 secs default
   * @returns Status bar object
   */
  warn = (title: string, message?: string, expire = DELAY) => {
    const status = new Status("warning", title, message, expire);
    this.statuses.push(status);
    return status;
  };

  /**
   * Remove a status bar from the list
   * 
   * @param status Status object to remove
   */
  remove = (status: Status) => {
    const index = this.statuses.indexOf(status);
    if (index > -1) {
      this.statuses.splice(index, 1);
    }
  };

  /**
   * Are any status bars in loading state?
   */
  get isLoading() {
    return this.statuses.some((status) => status.status === "loading");
  }

  /**
   * Get all status bars to display
   */
  get bars() {
    return this.statuses.filter((status) => status.title);
  }
}

const status = new StatusBar();
export default status;