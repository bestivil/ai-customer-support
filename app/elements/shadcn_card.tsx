import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dformat } from "../util/datetime";

import { InfoCircledIcon } from "@radix-ui/react-icons";

interface Model {
  name: string;
  active: boolean;
}

export default function SelectCard({
  models,
  setModels,
}: {
  models: { name: string; active: boolean };
  setModels: React.Dispatch<React.SetStateAction<Model[]>>; // function returns new model based on old model
}) {
  const handleClick = () => {
    setModels((prevModels: Model[]) =>
      prevModels.map((model: { name: any; active: any }) =>
        model.name === models.name
          ? { ...model, active: true }
          : { ...model, active: false }
      )
    );
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="justify-between flex flex-row">
        <CardTitle> {models.name} </CardTitle>
        <Button
          disabled={models.active}
          variant={models.active ? "default" : "outline"}
          onClick={handleClick}
        >
          {models.active ? "Selected" : "Select"}
        </Button>
      </CardHeader>
    </Card>
  );
}

export function BaseCard({
  cn,
  msg,
  size,
  isHistory = false,
}: {
  cn: string;
  msg: { role?: string; content: string };
  size?: string;
  isHistory?: boolean;
}) {
  return (
    <div
      className={cn.concat(
        " ",
        msg.role == "assistant" ? "md:justify-end" : "justify-start"
      )}
    >
      <Card className={size}>
        <CardHeader className=" flex flex-col gap-3 md:flex-row items-center justify-center text-center">
          <p className="">{msg.content}</p>
          {isHistory ? <InfoCircledIcon className="justify-end" /> : undefined}
        </CardHeader>
      </Card>
    </div>
  );
}
