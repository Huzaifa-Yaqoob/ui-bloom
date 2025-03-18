"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FieldRenderer from "@/registry/field-renderer/field-renderer";
import PreviewWrapper from "../common/preview-wrapper";
import ReactSelect from "@/registry/react-select/react-select";

const formSchema = z.object({
  color: z.any(),
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

export function ReactSelectForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "smoothie",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    // <PreviewWrapper>
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
              <ReactSelect
                options={groupedOptions}
                isMulti
                closeMenuOnSelect={false}
                defaultValue={["smoothie"]}
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
              console.log("as");
              form.reset();
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
    // </PreviewWrapper>
  );
}
