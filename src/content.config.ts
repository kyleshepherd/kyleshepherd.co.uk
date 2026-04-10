import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    slug: z.string(),
    projectUrl: z.string().url().optional(),
    image: image(),
    techTags: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { projects };
