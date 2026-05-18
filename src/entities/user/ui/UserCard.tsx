import Link from "next/link";
import AvatarUser from "./AvatarUser";
import NameUser from "./NameUser";
import { useSession } from "next-auth/react";

export default function UserCard({
  avatar,
  name,
  login,
  isChat,
  className = "",
  link = false,
  id,
}: {
  avatar: string | null | undefined;
  name: string | null | undefined;
  login: string | null | undefined;
  id?: number;
  className?: string;
  isChat?: boolean;
  link?: boolean;
}) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <AvatarUser avatar={avatar} />
      {!isChat && (
        <LinkToUsers
          name={name}
          login={login}
          className={className}
          link={link}
          id={id}
        />
      )}
    </div>
  );
}

function LinkToUsers({
  name,
  login,
  className,
  link,
  id,
}: {
  name: string | null | undefined;
  login: string | null | undefined;
  className?: string;
  link?: boolean;
  id?: number;
}) {
  const { data: session } = useSession();

  return link ? (
    <Link
      href={`${session?.user.id == id ? `/profile` : `/user/${id}`} `}
    >
      <div className={className}>
        <NameUser name={name} login={login} />
      </div>
    </Link>
  ) : (
    <div className={className}>
      <NameUser name={name} login={login} />
    </div>
  );
}
