import React, { createContext, useEffect, useRef, useState } from "react";
import ModalCreateUser, { ModalCreateUserRef } from "./modal.create";
import UserItem from "./user.item";

import { Button, Group, Stack, Text } from "@mantine/core";
import { model } from "wails/go/models";
import { GetAll } from "wails/go/userhandle/userHandle";
import { useNotification } from "@/hook/notification.hook";



const User: React.FC = () => {
  const refModalCreate = useRef<ModalCreateUserRef>(null);
  const [listUser, setListUser] = useState<model.User[]>([]);

  const noti = useNotification();

  // handle private
  const openModal = () => {
    if (!refModalCreate.current) return;
    refModalCreate.current.openModal();
  }

  const getListUser = async () => {
    try {
      const result = await GetAll();
      setListUser(result);
    } catch (error) {
      console.log(error);
      noti.error("Lấy thông tin người dùng thất bại");
    }
  }

  //
  useEffect(() => {
    getListUser();
  }, []);



  return (
    <UserContext.Provider
      value={{
        listUser,
        setListUser,
      }}
    >
      <Stack p={16} gap={16} w={"100%"} mah={"100%"}>
        <Group w={"100%"} justify="space-between">
          <Text>Quản lí thành viên</Text>
          <Button
            onClick={openModal}
          >Thêm mới</Button>
        </Group>

        <Stack
          gap={8}
          justify="start"
          style={{
            flex: 1,
            overflowX: "scroll",
          }}
        >
          {
            listUser.map((u) => <UserItem key={u.ID} data={u} />)
          }
        </Stack>
      </Stack>

      <ModalCreateUser ref={refModalCreate} />
    </UserContext.Provider>
  )
}

export type UserContextType = {
  listUser: model.User[]
  setListUser: (values: model.User[]) => void
}

export const UserContext = createContext<UserContextType>({
  listUser: [],
  setListUser: () => { },
})

export default User;