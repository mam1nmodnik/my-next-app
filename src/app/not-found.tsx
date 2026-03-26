import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-white/45 text-[20px]">Page not found</p>
        <Link
          href="/"
          className=" bg-white px-4 py-2 text-black hover:bg-white/65 rounded-3xl"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
