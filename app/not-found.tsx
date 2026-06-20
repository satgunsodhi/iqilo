import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-black text-[--border-strong]">404</p>
      <h1 className="mt-4 text-2xl font-black text-[--text-primary]">
        Page not found
      </h1>
      <p className="mt-2 text-sm font-medium text-[--text-muted]">
        The course or day you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[--accent-purple] to-[--accent-blue] px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:opacity-90 hover:shadow-md active:scale-95"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
