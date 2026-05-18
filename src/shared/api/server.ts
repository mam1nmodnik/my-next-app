import { NextResponse } from "next/server";
import type { ApiNotice, ApiResponse } from "./types";

type ApiSuccessOptions = {
  status?: number;
  notice?: ApiNotice;
};

type ApiErrorOptions = {
  status?: number;
  notice?: ApiNotice;
};

export function apiSuccess<T>(
  message: string,
  data: T | null = null,
  options: ApiSuccessOptions = {},
) {
  const body: ApiResponse<T> = {
    success: true,
    notice: options.notice ?? "success",
    message,
    data,
  };

  return NextResponse.json(body, {
    status: options.status ?? 200,
  });
}

export function apiError(
  message: string,
  options: ApiErrorOptions = {},
) {
  const body: ApiResponse = {
    success: false,
    notice: options.notice ?? "error",
    message,
    data: null,
  };

  return NextResponse.json(body, {
    status: options.status ?? 400,
  });
}
