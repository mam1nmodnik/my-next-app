import type { ApiResponse } from "./types";

export class ApiResponseError<T = null> extends Error {
  response: ApiResponse<T>;
  status: number;

  constructor(response: ApiResponse<T>, status: number) {
    super(response.message);
    this.name = "ApiResponseError";
    this.response = response;
    this.status = status;
  }
}

type PartialApiResponse<T> = Partial<ApiResponse<T>> & {
  data?: T | null;
};

function buildFallbackResponse<T>(
  response: Response,
  fallbackMessage: string,
): ApiResponse<T> {
  return {
    success: response.ok,
    notice: response.ok ? "success" : "error",
    message: fallbackMessage,
    data: null,
  };
}

export async function readApiResponse<T>(
  response: Response,
  fallbackMessage = "Некорректный ответ сервера",
): Promise<ApiResponse<T>> {
  const result = (await response.json().catch(() => null)) as PartialApiResponse<T> | null;

  if (!result || typeof result !== "object") {
    return buildFallbackResponse<T>(response, fallbackMessage);
  }

  return {
    success: typeof result.success === "boolean" ? result.success : response.ok,
    notice:
      result.notice === "success" ||
      result.notice === "info" ||
      result.notice === "warning" ||
      result.notice === "error"
        ? result.notice
        : response.ok
          ? "success"
          : "error",
    message:
      typeof result.message === "string" && result.message.trim().length > 0
        ? result.message
        : fallbackMessage,
    data: "data" in result ? (result.data ?? null) : null,
  };
}

export async function requireApiResponse<T>(
  response: Response,
  fallbackMessage = "Ошибка сервера",
): Promise<ApiResponse<T>> {
  const result = await readApiResponse<T>(response, fallbackMessage);

  if (!response.ok || !result.success) {
    throw new ApiResponseError(result, response.status);
  }

  return result;
}

export async function requireApiData<T>(
  response: Response,
  fallbackMessage = "Ошибка сервера",
): Promise<T> {
  const result = await requireApiResponse<T>(response, fallbackMessage);

  if (result.data === null) {
    throw new ApiResponseError(
      {
        ...result,
        success: false,
        notice: "error",
        message: fallbackMessage,
        data: null,
      },
      response.status,
    );
  }

  return result.data;
}

export function getApiErrorResponse(
  error: unknown,
  fallbackMessage = "Ошибка сервера",
): ApiResponse {
  if (error instanceof ApiResponseError) {
    return error.response;
  }

  if (error instanceof Error) {
    return {
      success: false,
      notice: "error",
      message: error.message || fallbackMessage,
      data: null,
    };
  }

  return {
    success: false,
    notice: "error",
    message: fallbackMessage,
    data: null,
  };
}
