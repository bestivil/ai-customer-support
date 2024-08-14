import { useEffect, useState } from "react";

const d = new Date();

export default function DateTime() {
  const [dateTime, setDateTime] = useState<string>("");

  setDateTime(dformat);

  return dateTime;
}

export var dformat =
  [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
  " " +
  [d.getHours(), d.getMinutes()]
    .map((num) => num.toString().padStart(2, "0"))
    .join(":");
