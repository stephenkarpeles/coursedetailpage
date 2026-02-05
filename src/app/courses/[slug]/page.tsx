import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourseSlugs } from "@/data/courses";
import { buildCourseJsonLd } from "@/lib/json-ld";
import type { Course } from "@/types/course";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  const title = `${course.name} | ${course.provider.name}`;
  const description = course.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(course.image && {
        images: [
          {
            url: course.image,
            width: 1200,
            height: 630,
            alt: course.name,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function CourseJsonLdScript({ course }: { course: Course }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const jsonLd = buildCourseJsonLd(course, baseUrl);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <>
      <CourseJsonLdScript course={course} />
      <article className="min-h-screen bg-neutral-50 text-neutral-900">
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8">
            <p className="text-sm font-medium text-neutral-500">
              {course.provider.name}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {course.name}
            </h1>
            {(course.duration || course.level) && (
              <dl className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600">
                {course.duration && (
                  <>
                    <dt className="sr-only">Duration</dt>
                    <dd>{course.duration}</dd>
                  </>
                )}
                {course.level && (
                  <>
                    <dt className="sr-only">Level</dt>
                    <dd>{course.level}</dd>
                  </>
                )}
              </dl>
            )}
          </div>
        </header>
        <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8">
          <section aria-labelledby="course-description">
            <h2 id="course-description" className="sr-only">
              Course description
            </h2>
            <p className="text-lg leading-relaxed text-neutral-700">
              {course.description}
            </p>
          </section>
          <footer className="mt-12 border-t border-neutral-200 pt-8">
            <p className="text-sm text-neutral-500">
              Offered by{" "}
              {course.provider.url ? (
                <a
                  href={course.provider.url}
                  className="font-medium text-neutral-900 underline underline-offset-2 hover:no-underline"
                  rel="noopener noreferrer"
                >
                  {course.provider.name}
                </a>
              ) : (
                <span className="font-medium">{course.provider.name}</span>
              )}
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
