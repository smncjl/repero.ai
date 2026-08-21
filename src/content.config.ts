import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    lang: z.enum(['en', 'fr']),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog };
