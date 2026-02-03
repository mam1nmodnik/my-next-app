import { useQuery } from "@tanstack/react-query";
import UsersPosts from "./UsersPosts";
import MyLoader from "../IU/MyLoader";

export default function PopularPost() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const response = await fetch("/api/posts/all-posts");
      const result = await response.json();
      if (!Array.isArray(result)) {
        throw new Error(result.error || "Неверный формат данных");
      }
      return result;
    },
  });

  if (isLoading) {
  return (
    <div className="flex justify-center mt-5">
      <MyLoader />
    </div>
  );
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }
  return (
    Array.isArray(data) && (
      <UsersPosts posts={data} suspens="Постов еще нет, будьте первыми)" />
    )
  );
}
