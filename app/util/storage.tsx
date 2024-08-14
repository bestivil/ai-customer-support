import localforage from "localforage";

export var store = localforage.createInstance({
  name: "openai",
});
