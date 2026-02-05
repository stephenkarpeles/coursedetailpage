import type { Course } from "@/types/course";

interface CourseJsonLd {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  provider: {
    "@type": string;
    name: string;
    url?: string;
  };
}

export function buildCourseJsonLd(course: Course, baseUrl: string): CourseJsonLd {
  const url = `${baseUrl.replace(/\/$/, "")}/courses/${course.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url,
    provider: {
      "@type": "Organization",
      name: course.provider.name,
      ...(course.provider.url && { url: course.provider.url }),
    },
  };
}
