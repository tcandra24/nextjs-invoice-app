"use client";

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// import { parseWithZod } from "@conform-to/zod";

import { SubmitButton } from "../components/SubmitButton";
import { useActionState } from "react";
import { onBoardUser } from "../action";
import { useForm } from "@conform-to/react";
import { onBoardingSchema } from "../utils/zodSchemas";

export default function OnBoarding() {
  const [lastResult, action] = useActionState(onBoardUser, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onBoardingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">You are almost finished!</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input name={fields.firstName.name} key={fields.firstName.key} value={fields.firstName.initialValue} placeholder="Your First Name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input name={fields.lastName.name} key={fields.lastName.key} value={fields.lastName.initialValue} placeholder="Your Last Name" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <Input name={fields.address.name} key={fields.address.key} value={fields.address.initialValue} placeholder="Your Address" />
            </div>

            <SubmitButton text="Finish Onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
