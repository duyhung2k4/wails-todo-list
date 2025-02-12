import { forwardRef, Ref, useContext, useImperativeHandle, useState } from "react";
import { useNotification } from "@/hook/notification.hook";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { Create } from "wails/go/userhandle/userHandle";
import { UserContext, UserContextType } from ".";



export type ModalCreateUserRef = {
  openModal: () => void
  closeModal: () => void
  createSuccess: (cb: () => void) => void
}

const ModalCreateUser = forwardRef((_, ref: Ref<ModalCreateUserRef>) => {
  const [modal, setModal] = useState<boolean>(false);

  const noti = useNotification();

  const { listUser, setListUser } = useContext<UserContextType>(UserContext);

  const form = useForm<FormCreateUser>({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => value.length === 0 ? "Không để trống" : null,
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
  const handleCreate = async (values: FormCreateUser) => {
    try {
      const result = await Create({
        name: values.name,
      });

      console.log(result);
      setModal(false);
      setListUser([...listUser, result]);
      noti.success("Thêm thành viên thành công");
    } catch (error) {
      console.log(error);
      noti.error("Thêm thành viên thất bại");
    }
    form.reset();
  }



  return (
    <>
      <Modal
        title="Thêm thành viên"
        opened={modal}
        onClose={() => setModal(false)}
      >
        <form
          id="create-user"
          onSubmit={form.onSubmit(handleCreate)}
        >
          <TextInput
            label="Tên thành viên"
            {...form.getInputProps("name")}
          />
        </form>

        <Group w={"100%"} mt={24} justify="end">
          <Button
            type="submit"
            form="create-user"
          >Hoàn tất</Button>
        </Group>
      </Modal>
    </>
  )
})

export default ModalCreateUser;

type FormCreateUser = {
  name: string;
}