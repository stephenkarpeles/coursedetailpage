import Link from "next/link";
import { getAllCourseSlugs, getCourseBySlug } from "@/data/courses";

export default async function Home() {
  const slugs = await getAllCourseSlugs();
  const courses = await Promise.all(
    slugs.map((slug) => getCourseBySlug(slug))
  );
  const list = courses.filter(Boolean);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <h1 className="text-3xl font-bold tracking-tight">StartHub</h1>
        <p className="mt-2 text-lg text-neutral-600">
          Browse our courses and start learning today.
        </p>
        <nav aria-label="Course list" className="mt-10">
          <ul className="space-y-4">
            {list.map((course) =>
              course ? (
                <li key={course.id}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="block rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-neutral-300 hover:shadow"
                  >
                    <h2 className="font-semibold">{course.name}</h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      {course.shortDescription}
                    </p>
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </nav>
      </main>
    </div>
  );
}
