const selectAsyncCreatableCode = `"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FieldRenderer } from "@/components/ui/bloom/field-renderer";
import {
  ReactAsyncCreatableSelect,
  convertToOptions,
  MyOption,
  flattenOptions,
  convertToOption,
} from "@/components/ui/bloom/react-select-input";
import { options, groupedOptions } from "@/data/options";

const formSchema = z.object({
  color: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable(),
  color2: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(3),
});

const filterOptions = (inputValue: string) => {
  const options = flattenOptions(groupedOptions);
  return options.filter((i) => {
    if (typeof i.label === "string") {
      return i.label.toLowerCase().includes(inputValue.toLowerCase());
    }
    return;
  });
};

const promiseOptions = (inputValue: string) =>
  new Promise<MyOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterOptions(inputValue));
    }, 1000);
  });

export function AsyncCreatableForm() {
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
              <ReactAsyncCreatableSelect
                defaultOptions={options}
                loadOptions={promiseOptions}
                {...field}
              />
            </FieldRenderer>
          )}
        />
        <FormField
          control={form.control}
          name="color2"
          render={({ field }) => (
            <FieldRenderer label="Multi Select">
              <ReactAsyncCreatableSelect
                isMulti
                defaultOptions={options}
                loadOptions={promiseOptions}
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
`;

export default selectAsyncCreatableCode;
