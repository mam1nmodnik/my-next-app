export type ApiNotice = "success" | "info" | "warning" | "error";

export type ApiResponse<T = null> = {
  success: boolean;
  notice: ApiNotice;
  message: string;
  data: T | null;
};

export type ApiFeedback = Pick<ApiResponse, "notice" | "message">;
