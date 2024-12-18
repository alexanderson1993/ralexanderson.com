import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const collections = {
  work: defineCollection({
    // Load Markdown files in the src/content/work directory.
    loader: glob({ base: "./src/content/work", pattern: "**/*.md" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
    }),
  }),
  blog: defineCollection({
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
      title: z.string(),
      excerpt: z.string(),
      publishDate: z.coerce.date(),
      featureImage: z.object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      }),
      tags: z.array(z.string()).optional(),
    }),
  }),
};
