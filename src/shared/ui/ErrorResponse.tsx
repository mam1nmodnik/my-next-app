"use client";

type ErrorResponseType = {
  error: Error | null;
  title: string;
};
export default function ErrorResponse({ error, title }: ErrorResponseType) {
  return (
    <div className="flex  items-center justify-center px-6  mt-10 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-white">{title} not found</h1>
        <p className="text-white/50">{error?.message}</p>
      </div>
    </div>
  );
}
