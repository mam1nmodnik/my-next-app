import { useMessageContext } from "@/_providers/ui/message-provider";
import { getApiErrorResponse, requireApiResponse } from "@/shared/api/client";
import type { ApiResponse } from "@/shared/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFollowUser(userId?: number) {
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["this-user"] });
    queryClient.invalidateQueries({ queryKey: ["followers"] });
    queryClient.invalidateQueries({ queryKey: ["following"] });
  };

  const follow = useMutation({
    mutationFn: async () => {
      const response  = await fetch("/api/followers/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      return requireApiResponse<{ followingId: number }>(
        response,
        "Не удалось подписаться на пользователя",
      );
    },
    onSuccess: (response) => {
      openMessage(response);
      handleSuccess();
    },
    onError: (error) => {
      openMessage(
        getApiErrorResponse(error, "Не удалось подписаться на пользователя"),
      );
    },
  });

  const unfollow = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/followers/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      return requireApiResponse<{ followingId: number; removed: boolean }>(
        response,
        "Не удалось отменить подписку",
      );
    },
    onSuccess: (response: ApiResponse<{ followingId: number; removed: boolean }>) => {
      openMessage(response);
      handleSuccess();
    },
    onError: (error) => {
      openMessage(getApiErrorResponse(error, "Не удалось отменить подписку"));
    },
  });

  return {
    follow: follow.mutate,
    unfollow: unfollow.mutate,
    isLoading: follow.isPending || unfollow.isPending,
  };
}
