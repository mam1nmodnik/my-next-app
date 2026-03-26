import Link from "next/link";

export default function InfoProfile({
  login,
  name,
  bio,
  _count,
}: {
  login?: string;
  name?: string | null;
  bio?: string | null;
  _count?: { followers?: number; following?: number } | null;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="text-[20px] text-white font-bold w-fit">{name}</h1>
        <p className="text-[#6D6D71] w-fit">@{login}</p>
      </div>
      <p className="w-fit text-white whitespace-pre-wrap">{bio}</p>
      <div className="flex flex-row gap-4 mt-2">
        <Link href={`/follow/${login}/followers`}>
          <p className="text-[#6D6D71] text-sm">
            <span className="font-bold text-white">{_count?.followers}</span>{" "}
            Followers
          </p>
        </Link>
        <Link href={`/follow/${login}/following`}>
          <p className="text-[#6D6D71] text-sm">
            <span className="font-bold text-white">{_count?.following}</span>{" "}
            Following
          </p>
        </Link>
      </div>
    </div>
  );
}
