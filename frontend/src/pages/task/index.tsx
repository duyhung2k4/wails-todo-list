import React, { createContext, useEffect, useRef, useState } from "react";
import ModalCreateTask, { ModalCreateTaskRef } from "./modal.create";
import TaskItem from "./task.item";

import { Button, Group, Stack, Text } from "@mantine/core";
import { model } from "wails/go/models";
import { GetAll as GetAllTask } from "wails/go/taskhandle/taskHandle";
import { GetAll as GetAllTags} from "wails/go/taghandle/tagHandle";
import { GetAll as GetAllUsers} from "wails/go/userhandle/userHandle";
import { useNotification } from "@/hook/notification.hook";



const Task: React.FC = () => {
  const refModalCreate = useRef<ModalCreateTaskRef>(null);
  const [listTask, setListTask] = useState<model.Task[]>([]);
  const [tags, setTags] = useState<model.Tag[]>([]);
  const [users, setUsers] = useState<model.User[]>([]);

  const noti = useNotification();

  // handle private
  const openModal = () => {
    if (!refModalCreate.current) return;
    refModalCreate.current.openModal();
  }

  const getListTask = async () => {
    try {
      const result = await GetAllTask();
      setListTask(result);
    } catch (error) {
      console.log(error);
      noti.error("Lấy thông tin người dùng thất bại");
    }
  }

  const getTags = async () => {
    try {
      const result = await GetAllTags();
      setTags(result);
    } catch (error) {
      console.log(error);
      noti.error("Lấy thông tin tag thất bại");
    }
  }

  const getUSers = async () => {
    try {
      const result = await GetAllUsers();
      setUsers(result);
    } catch (error) {
      console.log(error);
      noti.error("Lấy thông tin thành viên thất bại");
    }
  }

  //
  useEffect(() => {
    getListTask();
    getTags();
    getUSers();
  }, []);



  return (
    <TaskContext.Provider
      value={{
        tags,
        users,
        listTask,
        setListTask,
      }}
    >
      <Stack p={16} gap={16} w={"100%"} mah={"100%"}>
        <Group w={"100%"} justify="space-between">
          <Text>Quản lí task</Text>
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
            listTask.map((item) => <TaskItem key={item.ID} data={item} />)
          }
        </Stack>
      </Stack>

      <ModalCreateTask ref={refModalCreate} />
    </TaskContext.Provider>
  )
}

export type TaskContextType = {
  tags: model.Tag[]
  users: model.User[]
  listTask: model.Task[]
  setListTask: (values: model.Task[]) => void
}

export const TaskContext = createContext<TaskContextType>({
  tags: [],
  users: [],
  listTask: [],
  setListTask: () => { },
})

export default Task;