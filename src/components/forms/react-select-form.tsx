"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FieldRenderer } from "@/registry/field-renderer/field-renderer";
import {
  ReactSelect,
  convertToOptions,
  ReactAsyncSelect,
  MyOption,
  ReactCreatableSelect,
  ReactAsyncCreatableSelect,
} from "@/registry/react-select/react-select";

const formSchema = z.object({
  color: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(3),
  color2: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(3),
  color3: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(3),
  color4: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(3),
});

const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
      { value: "grape", label: "Grape" },
      { value: "mango", label: "Mango" },
      { value: "orange", label: "Orange" },
      { value: "pear", label: "Pear" },
      { value: "pineapple", label: "Pineapple" },
      { value: "strawberry", label: "Strawberry" },
      { value: "watermelon", label: "Watermelon" },
      { value: "blueberry", label: "Blueberry" },
      { value: "pomegranate", label: "Pomegranate" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "cabbage", label: "Cabbage" },
      { value: "spinach", label: "Spinach" },
      { value: "lettuce", label: "Lettuce" },
      { value: "tomato", label: "Tomato" },
      { value: "cucumber", label: "Cucumber" },
      { value: "bell_pepper", label: "Bell Pepper" },
      { value: "zucchini", label: "Zucchini" },
      { value: "cauliflower", label: "Cauliflower" },
      { value: "onion", label: "Onion" },
      { value: "garlic", label: "Garlic" },
    ],
  },
  {
    label: "Dairy",
    options: [
      { value: "milk", label: "Milk" },
      { value: "cheese", label: "Cheese" },
      { value: "yogurt", label: "Yogurt" },
      { value: "butter", label: "Butter" },
      { value: "cream", label: "Cream" },
      { value: "ice_cream", label: "Ice Cream" },
    ],
  },
  {
    label: "Meat & Seafood",
    options: [
      { value: "chicken", label: "Chicken" },
      { value: "beef", label: "Beef" },
      { value: "pork", label: "Pork" },
      { value: "fish", label: "Fish" },
      { value: "shrimp", label: "Shrimp" },
      { value: "lamb", label: "Lamb" },
    ],
  },
  {
    label: "Grains",
    options: [
      { value: "rice", label: "Rice" },
      { value: "wheat", label: "Wheat" },
      { value: "oats", label: "Oats" },
      { value: "corn", label: "Corn" },
      { value: "barley", label: "Barley" },
      { value: "quinoa", label: "Quinoa" },
    ],
  },
  {
    label: "Beverages",
    options: [
      { value: "water", label: "Water" },
      { value: "coffee", label: "Coffee" },
      { value: "tea", label: "Tea" },
      { value: "juice", label: "Juice" },
      { value: "soda", label: "Soda" },
      { value: "smoothie", label: "Smoothie" },
    ],
  },
];

const options = [
  { value: "water", label: "Water" },
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "juice", label: "Juice" },
  { value: "soda", label: "Soda" },
  { value: "smoothie", label: "Smoothie" },
];

const filterColors = (inputValue: string) => {
  return options.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string) =>
  new Promise<MyOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export function ReactSelectForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: convertToOptions(["smoothie", "juice"], groupedOptions),
      color2: [],
      color3: [],
      color4: [],
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
            <FieldRenderer label="Color">
              <ReactSelect {...field} options={groupedOptions} isMulti />
            </FieldRenderer>
          )}
        />
        <FormField
          control={form.control}
          name="color2"
          render={({ field }) => (
            <FieldRenderer label="Color2">
              <ReactAsyncSelect
                {...field}
                isMulti
                defaultOptions={groupedOptions}
                closeMenuOnSelect={false}
                loadOptions={promiseOptions}
              />
            </FieldRenderer>
          )}
        />
        <FormField
          control={form.control}
          name="color3"
          render={({ field }) => (
            <FieldRenderer label="Color3">
              <ReactCreatableSelect
                {...field}
                isMulti
                options={groupedOptions}
              />
            </FieldRenderer>
          )}
        />
        <FormField
          control={form.control}
          name="color4"
          render={({ field }) => (
            <FieldRenderer label="Color4">
              <ReactAsyncCreatableSelect
                {...field}
                isMulti
                defaultOptions={groupedOptions}
                loadOptions={promiseOptions}
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
