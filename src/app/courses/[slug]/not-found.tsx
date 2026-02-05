import Link from "next/link";

export default function CourseNotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-16 text-neutral-900">
      <main className="mx-auto max-w-xl text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <p className="mt-2 text-neutral-600">
          The course you’re looking for doesn’t exist or was removed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block font-medium text-neutral-900 underline underline-offset-2 hover:no-underline"
        >
          Back to courses
        </Link>
      </main>
    </div>
  );
}
