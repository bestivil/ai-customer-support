const d = new Date();

export var dformat =
  [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
  " " +
  [d.getHours(), d.getMinutes()]
    .map((num) => num.toString().padStart(2, "0"))
    .join(":");
