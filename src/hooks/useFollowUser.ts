import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFollowUser(userId: number) {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"]});
    queryClient.invalidateQueries({ queryKey: ["user"]});
    queryClient.invalidateQueries({ queryKey: ["this-user"]});
  };

  const follow = useMutation({
    mutationFn: async () => {
      await fetch("/api/followers/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
    },
    onSuccess: handleSuccess,
  });

  const unfollow = useMutation({
    mutationFn: async () => {
      await fetch("/api/followers/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
    },
    onSuccess: handleSuccess,
  });

  return {
    follow: follow.mutate,
    unfollow: unfollow.mutate,
    isLoading: follow.isPending || unfollow.isPending,
  };
}
