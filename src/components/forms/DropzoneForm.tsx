"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FieldRenderer } from "@/registry/field-renderer/field-renderer";
import {
  DropzoneProvider,
  DropArea,
  ImagesPreview,
} from "@/registry/react-dropzone-input/react-dropzone-input";

const formSchema = z.object({
  file: z.any(),
});

export default function DropzoneForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
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
        className="space-y-8 w-full border rounded-md p-4 max-w-[500px]"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FieldRenderer label="File">
              <DropzoneProvider options={{ multiple: true }} {...field}>
                <DropArea
                  unstyled={true}
                  renderer={({}) => {
                    return <div className="">Click to select file.</div>;
                  }}
                />
                <ImagesPreview />
              </DropzoneProvider>
            </FieldRenderer>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
