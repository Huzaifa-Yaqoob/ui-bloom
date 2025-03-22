"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FieldRenderer } from "@/registry/field-renderer/field-renderer";
import {
  ReactCreatableSelect,
  convertToOptions,
  convertToOption,
} from "@/registry/react-select-input/react-select-input";
import { options, groupedOptions } from "@/data/options";

const formSchema = z.object({
  color: z.object({
    value: z.string(),
    label: z.string(),
  }),
  color2: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(3),
});

export function CreatableForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: convertToOption("", options),
      color2: convertToOptions(["smoothie", "juice"], groupedOptions),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full border rounded-md p-8"
      >
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FieldRenderer label="Single Select">
              <ReactCreatableSelect options={options} {...field} />
            </FieldRenderer>
          )}
        />
        <FormField
          control={form.control}
          name="color2"
          render={({ field }) => (
            <FieldRenderer label="Multi Select">
              <ReactCreatableSelect
                isMulti
                options={groupedOptions}
                {...field}
              />
            </FieldRenderer>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit">Submit</Button>
          <Button
            type="button"
            onClick={() => {
              form.reset();
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
