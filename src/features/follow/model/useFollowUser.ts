import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFollowUser(userId: number) {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["this-user"] });
  };

  const follow = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/followers/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to follow user");
      }
    },
    onSuccess: handleSuccess,
  });

  const unfollow = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/followers/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }
    },
    onSuccess: handleSuccess,
  });

  return {
    follow: follow.mutate,
    unfollow: unfollow.mutate,
    isLoading: follow.isPending || unfollow.isPending,
  };
}
