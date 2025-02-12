import React, { useRef } from "react";

import { model } from "wails/go/models";
import { Group, Text, Tooltip } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import ModalTaskUpdate, { RefModalTaskUpdate } from "./modal.update";

import classes from "./styles.module.css";



export type UserItemProps = {
  data: model.Task
}

const UserItem: React.FC<UserItemProps> = (props) => {
  const refModalUpdate = useRef<RefModalTaskUpdate>(null);

  const openModal = () => {
    if (!refModalUpdate.current) return;
    refModalUpdate.current.openModal(props.data);
  }



  return (
    <>
      <Group key={props.data.ID} className={classes.user_item}>
        <Text>{props.data.ID}.</Text>
        <Text flex={1}>{props.data.name}</Text>
        <Tooltip label="Chi tiết">
          <IconEdit
            style={{ cursor: "pointer" }}
            onClick={openModal}
          />
        </Tooltip>
      </Group>

      <ModalTaskUpdate ref={refModalUpdate} />
    </>
  )
}

export default UserItem;