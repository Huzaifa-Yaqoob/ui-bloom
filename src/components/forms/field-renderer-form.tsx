"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FieldRenderer from "@/registry/field-renderer/field-renderer";
import { Input } from "../ui/input";
import PreviewWrapper from "../common/preview-wrapper";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export default function FieldRendererForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <PreviewWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full border rounded-md p-4 max-w-[500px]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FieldRenderer label="Username">
                <Input placeholder="username" {...field} />
              </FieldRenderer>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </PreviewWrapper>
  );
}
