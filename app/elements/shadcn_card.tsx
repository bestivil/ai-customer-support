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
}: {
  cn: string;
  msg: { role?: string; content: string };
  size?: string;
}) {
  return (
    <div
      className={cn.concat(
        " ",
        msg.role == "assistant" ? "md:justify-end" : "justify-start"
      )}
    >
      <Card className={size}>
        <CardHeader className="justify-between flex flex-row">
          <CardContent>
            <p>{msg.content}</p>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
