import { useNotification } from "@/hook/notification.hook";
import { Button, ColorInput, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, Ref, useContext, useImperativeHandle, useState } from "react";
import { Delete, Update } from "wails/go/taskhandle/taskHandle";
import { TaskContext, TaskContextType } from ".";
import { model, requestdata } from "wails/go/models";



export type RefModalTaskUpdate = {
  openModal: (Task: model.Task) => void
  closeModal: () => void
  updateSuccess: (cb: () => void) => void
}

const ModalTaskUpdate = forwardRef((_, ref: Ref<RefModalTaskUpdate>) => {
  const [task, setTask] = useState<model.Task | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const noti = useNotification();

  const { users, tags, listTask, setListTask } = useContext<TaskContextType>(TaskContext);

  const form = useForm<FormUpdateTask>({
    initialValues: {
      name: "",
      startAt: undefined,
      finishAt: undefined,
      tagId: "",
      userId: "",
    },
    validate: {
      name: (value) => value.length === 0 ? "Không để trống" : null,
      tagId: (value) => value === "0" ? "Không đc để trống" : null,
      userId: (value) => value === "0" ? "Không đc để trống" : null,
    }
  });

  // handle public
  const openModal = (item: model.Task) => {
    setTask(item);
    setModal(true);
    form.setValues({
      ...form.values,
      name: item.name,
      startAt: item.startAt,
      finishAt: item.finishAt,
      tagId: `${item.tagId}`,
      userId: `${item.userId}`,
    });
  };
  const closeModal = () => setModal(false);
  const updateSuccess = (cb: () => void) => { cb() };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
    updateSuccess,
  }));

  // handle private
  const handleUpdate = async (values: FormUpdateTask) => {
    if(!task) {
      noti.error("Dữ liệu trống");
      return;
    }
    
    try {
      const result = await Update(requestdata.UpdateTaskReq.createFrom({
        id: task.ID,
        name: values.name,
        startAt: values.startAt,
        finishAt: values.finishAt,
        tagId: values.tagId,
        userId: values.userId,
      }));

      console.log(result);
      setModal(false);
      
      const newList = listTask.map(item => item.ID === result.ID ? result : item);
      setListTask(newList);
      noti.success("Sửa thành viên thành công");
    } catch (error) {
      console.log(error);
      noti.error("Sửa thành viên thất bại");
    }

    form.reset();
  }

  const handleDelete = async () => {
    if(!task) {
      noti.error("Dữ liệu trống");
      return;
    }

    try {
      await Delete({ id: task.ID });
      const newList = listTask.filter(item => item.ID !== task.ID);
      setListTask(newList);
      noti.success("Xóa thành viên thành công");
    } catch (error) {
      console.log(error);
      noti.error("Xóa thành viên thất bại");
    }

    form.reset();
  }



  return (
    <>
      <Modal
        title="Chỉnh sửa thành viên"
        opened={modal}
        onClose={() => setModal(false)}
      >
        <form
          id="update-Task"
          onSubmit={form.onSubmit(handleUpdate)}
        >
          <TextInput
            label="Tên Task"
            {...form.getInputProps("name")}
          />
          <Select
            label="Người thực hiện"
            data={users.map((item) => ({
              label: item.name,
              value: `${item.ID}`,
            }))}
            {...form.getInputProps("userId")}
          />
          <Select
            label="Thẻ"
            data={tags.map((item) => ({
              label: item.name,
              value: `${item.ID}`,
            }))}
            {...form.getInputProps("tagId")}
          />
        </form>

        <Group w={"100%"} mt={24} justify="end">
          <Button 
            style={{
              backgroundColor: "red"
            }}
            onClick={handleDelete}
          >Xóa</Button>
          <Button
            type="submit"
            form="update-Task"
          >Hoàn tất</Button>
        </Group>
      </Modal>
    </>
  )
});

export default ModalTaskUpdate;

type FormUpdateTask = {
  name: string;
  startAt?: any;
  finishAt?: any;
  tagId: string;
  userId: string;
}