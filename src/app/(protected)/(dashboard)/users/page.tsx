"use client";
import { useAllUsersContext } from "@/context/all-users-context";
import { Avatar, List } from "antd";
import Link from "next/link";
import React from "react";
import { VscAccount } from "react-icons/vsc";

const Users = React.memo(function Users() {
  const { users } = useAllUsersContext();

  return (
    <div className="flex items-center justify-center m-4">
      <div className="max-w-[768px] w-full flex flex-col gap-5 ">
        <h1 className="text-white text-4xl lg:hidden block">Пользователи</h1>
        <List
          dataSource={users}
          bordered
          loading={users.length == 0 ? true : false}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Link
                  href={`/users-profile?user=${item.id}`}
                  key={`${item.id}`}
                >
                  View Profile
                </Link>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.avatar ? item.avatar : <VscAccount size={35} />}
                  />
                }
                title={<span className="text-white">{item.login}</span>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
});
export default Users;
