import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-black text-[#171411]">Page not found</h1>
      <p className="mt-2 text-sm font-medium text-[#6f6255]">
        The course or day you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-[#171411] px-4 py-2 text-sm font-black text-white hover:bg-[#593217]"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
