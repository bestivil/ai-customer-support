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

export default function SelectCard({
  models,
}: //   setModels,
{
  models: { name: string; active: boolean };
  //   setModels: (event: boolean) => void;
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader className="justify-between flex flex-row">
        <CardTitle> {models.name}</CardTitle>
        <Button
          disabled={models.active}
          variant={models.active ? "default" : "outline"}
          //   onClick={handleClick}
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
}: {
  cn: string;
  msg: { role: string; content: string };
}) {
  return (
    <div
      className={cn.concat(
        " ",
        msg.role == "assistant" ? "md:justify-end" : "justify-start"
      )}
    >
      <Card className="">
        <CardHeader className="justify-between flex flex-row">
          <CardContent>
            <p>{msg.content}</p>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
