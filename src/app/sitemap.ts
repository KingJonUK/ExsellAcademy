import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { courses } from "@/lib/data/courses";

/**
 * Static marketing routes that should be indexed. Authenticated, admin and API
 * routes are intentionally excluded (see robots.ts).
 */
const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/courses", changeFrequency: "weekly", priority: 0.9 },
  { path: "/funded-training", changeFrequency: "monthly", priority: 0.8 },
  { path: "/apply", changeFrequency: "monthly", priority: 0.8 },
  { path: "/employers", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sponsors", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${siteConfig.url}/courses/${course.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...coursePages];
}
