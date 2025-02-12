import React, { createContext, useEffect, useRef, useState } from "react";
import ModalCreateTag, { ModalCreateTagRef } from "./modal.create";
import TagItem from "./tag.item";

import { Button, Group, Stack, Text } from "@mantine/core";
import { model } from "wails/go/models";
import { GetAll } from "wails/go/taghandle/tagHandle";
import { useNotification } from "@/hook/notification.hook";



const Tag: React.FC = () => {
  const refModalCreate = useRef<ModalCreateTagRef>(null);
  const [listTag, setListTag] = useState<model.Tag[]>([]);

  const noti = useNotification();

  // handle private
  const openModal = () => {
    if (!refModalCreate.current) return;
    refModalCreate.current.openModal();
  }

  const getListTag = async () => {
    try {
      const result = await GetAll();
      setListTag(result);
    } catch (error) {
      console.log(error);
      noti.error("Lấy thông tin người dùng thất bại");
    }
  }

  //
  useEffect(() => {
    getListTag();
  }, []);



  return (
    <TagContext.Provider
      value={{
        listTag,
        setListTag,
      }}
    >
      <Stack p={16} gap={16} w={"100%"} mah={"100%"}>
        <Group w={"100%"} justify="space-between">
          <Text>Quản lí tag</Text>
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
            listTag.map((item) => <TagItem key={item.ID} data={item} />)
          }
        </Stack>
      </Stack>

      <ModalCreateTag ref={refModalCreate} />
    </TagContext.Provider>
  )
}

export type TagContextType = {
  listTag: model.Tag[]
  setListTag: (values: model.Tag[]) => void
}

export const TagContext = createContext<TagContextType>({
  listTag: [],
  setListTag: () => { },
})

export default Tag;