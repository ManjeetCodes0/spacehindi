import type { MetadataRoute } from "next";
import { createClient } from "@sanity/client";

import { spaceTools } from "@/data/tools";

const SITE_URL = "https://sciencehindi.in";

async function getBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;

  if (!projectId) return [];

  const client = createClient({
    projectId,
    dataset:
      process.env.NEXT_PUBLIC_SANITY_DATASET ||
      process.env.SANITY_DATASET ||
      "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });

  const posts = await client.fetch<{ slug: string; publishedAt: string | null }[]>(
    `*[_type == "deepDivePost" && defined(slug.current)] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt
    }`
  );

  return posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/universe`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/affiliate-disclosure`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = spaceTools
    .filter((tool) => tool.available)
    .map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const blogRoutes = await getBlogRoutes();

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
