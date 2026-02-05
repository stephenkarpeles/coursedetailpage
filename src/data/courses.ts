import type { Course } from "@/types/course";

export const courses: Course[] = [
  {
    id: "1",
    slug: "advanced-react-patterns",
    name: "Advanced React Patterns",
    shortDescription: "Master hooks, context, and performance patterns for production React apps.",
    description:
      "Learn advanced React patterns including compound components, render props, custom hooks, and performance optimization. Build scalable, maintainable applications with TypeScript and modern tooling.",
    provider: {
      name: "StartHub",
      url: "https://www.starthub.academy/",
    },
    image: "/course-advanced-react-patterns.jpg",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: "2",
    slug: "nextjs-app-router",
    name: "Next.js App Router & Server Components",
    shortDescription: "Full-stack React with the App Router, RSC, and streaming.",
    description:
      "Deep dive into Next.js App Router, Server Components, streaming, and data fetching. Covers dynamic metadata, layouts, and building SEO-friendly, high-performance web applications.",
    provider: {
      name: "StartHub",
      url: "https://www.starthub.academy/",
    },
    image: "/course-next-router-server-components.jpg",
    duration: "4 weeks",
    level: "Intermediate",
  },
];

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const course = courses.find((c) => c.slug === slug) ?? null;
  return course;
}

export async function getAllCourseSlugs(): Promise<string[]> {
  return courses.map((c) => c.slug);
}
