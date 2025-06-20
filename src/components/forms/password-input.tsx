'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { FieldRenderer } from '@/registry/field-renderer/field-renderer';
import { PasswordInput } from '@/registry/password-input/password-input';

const formSchema = z.object({
  password: z.string().min(8).max(50),
});

export function PasswordInputForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
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
        className="w-full max-w-[500px] space-y-8 rounded-md border p-4"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FieldRenderer label="Password">
              <PasswordInput placeholder="password" {...field} />
            </FieldRenderer>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
