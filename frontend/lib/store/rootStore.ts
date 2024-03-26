import { makeAutoObservable } from "mobx";

type THEME = "light" | "dark" | "system";

class RootStore {
  theme: any;
  run: any;

  constructor() {
    this.theme = new ThemeStore();
    this.run = new RunStore();
  }
}

class ThemeStore {
  mode: THEME = "system";

  constructor() {
    makeAutoObservable(this);
  }

  toggle = () => {
    this.mode =
      this.mode === "light" ? "dark" : this.mode === "dark" ? "light" : "light";
    this.save();
  };

  save() {
    if (typeof window !== "undefined") {
      localStorage.setItem("mode", this.mode);
    }
  }

  load() {
    if (typeof window !== "undefined") {
      const mode = localStorage.getItem("mode");
      if (mode) {
        this.mode = mode as THEME;
      }
    }
  }
}

class RunStore {
  user: String = "user1";
  users: Array<any> = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users) {
    console.log("ST", users);
  }

  load() {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("mode");
      if (user) {
        this.user = "user2";
      }
    }
  }
}

const rootStore = new RootStore();
// const themeStore = new ThemeStore();
export default rootStore;
