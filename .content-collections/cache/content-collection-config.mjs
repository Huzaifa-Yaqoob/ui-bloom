// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var posts = defineCollection({
  name: "posts",
  directory: "content/docs",
  include: ["**/*.md", "**/*.mdx"],
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string()
  })
});
var content_collections_default = defineConfig({
  content: [posts]
});
export {
  content_collections_default as default
};
