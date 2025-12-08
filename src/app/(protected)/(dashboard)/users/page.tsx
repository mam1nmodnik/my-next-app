"use client";
import { useAllUsersContext } from "@/context/all-users-context";
import { Avatar , List, Skeleton } from "antd";
import Link from "next/link";
import React from "react";
import { VscAccount } from "react-icons/vsc";


const Users = React.memo(function Users() {
const {users} = useAllUsersContext()
  if (!users)
    return (
      <div className="flex items-center justify-center">
        <div className="max-w-[768px] w-full ">
          <Skeleton avatar paragraph={{ rows: 3 }} />
        </div>
      </div>
    );
  return (
    <div className="flex items-center justify-center m-4">
      <div className="max-w-[768px] w-full ">
        <List
          dataSource={users}
          bordered
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Link
                  href={`/users-profile?user=${item.id}`}
                  key={`a-${item.id}`}
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
