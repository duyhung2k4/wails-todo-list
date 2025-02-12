import { forwardRef, Ref, useContext, useImperativeHandle, useState } from "react";
import { useNotification } from "@/hook/notification.hook";
import { Button, ColorInput, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Create } from "wails/go/taskhandle/taskHandle";
import { TaskContext, TaskContextType } from ".";
import { requestdata } from "wails/go/models";



export type ModalCreateTaskRef = {
  openModal: () => void
  closeModal: () => void
  createSuccess: (cb: () => void) => void
}

const ModalCreateTask = forwardRef((_, ref: Ref<ModalCreateTaskRef>) => {
  const [modal, setModal] = useState<boolean>(false);

  const noti = useNotification();

  const { tags, users, listTask, setListTask } = useContext<TaskContextType>(TaskContext);

  const form = useForm<FormCreateTask>({
    initialValues: {
      name: "",
      startAt: null,
      finishAt: null,
      tagId: "",
      userId: "",
    },
    validate: {
      name: (value) => value.length === 0 ? "Không để trống" : null,
      tagId: (value) => value === "" ? "Không đc để trống" : null,
      userId: (value) => value === "" ? "Không đc để trống" : null,
    }
  });

  // handle public
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const createSuccess = (cb: () => void) => { cb() };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
    createSuccess,
  }));

  // handle private
  const handleCreate = async (values: FormCreateTask) => {
    console.log(values);
    try {
      const result = await Create(requestdata.CreateTaskReq.createFrom({
        name: values.name,
        startAt: values.startAt,
        finishAt: values.finishAt,
        tagId: Number(values.tagId),
        userId: Number(values.userId),
      }));

      setModal(false);
      setListTask([...listTask, result]);
      noti.success("Thêm Task thành công");
    } catch (error) {
      console.log(error);
      noti.error("Thêm Task thất bại");
    }

    form.reset();
  }



  return (
    <>
      <Modal
        title="Thêm Task"
        opened={modal}
        onClose={() => setModal(false)}
      >
        <form
          id="create-task"
          onSubmit={form.onSubmit(handleCreate)}
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
            type="submit"
            form="create-task"
          >Hoàn tất</Button>
        </Group>
      </Modal>
    </>
  )
})

export default ModalCreateTask;

type FormCreateTask = {
  name: string;
  startAt?: any;
  finishAt?: any;
  tagId: "";
  userId: "";
}