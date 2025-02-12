import { useNotification } from "@/hook/notification.hook";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, Ref, useContext, useImperativeHandle, useState } from "react";
import { Delete, Update } from "wails/go/userhandle/userHandle";
import { UserContext, UserContextType } from ".";
import { model } from "wails/go/models";



export type RefModalUserUpdate = {
  openModal: (user: model.User) => void
  closeModal: () => void
  updateSuccess: (cb: () => void) => void
}

const ModalUserUpdate = forwardRef((_, ref: Ref<RefModalUserUpdate>) => {
  const [user, setUser] = useState<model.User | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const noti = useNotification();

  const { listUser, setListUser } = useContext<UserContextType>(UserContext);

  const form = useForm<FormUpdateUser>({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => value.length === 0 ? "Không để trống" : null,
    }
  });

  // handle public
  const openModal = (item: model.User) => {
    setUser(item);
    setModal(true);
    form.setValues({
      ...form.values,
      name: item.name
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
  const handleUpdate = async (values: FormUpdateUser) => {
    if(!user) {
      noti.error("Dữ liệu trống");
      return;
    }
    
    try {
      const result = await Update({
        id: user?.ID,
        name: values.name,
      });

      console.log(result);
      setModal(false);
      
      const newList = listUser.map(u => u.ID === result.ID ? result : u);
      setListUser(newList);
      noti.success("Sửa thành viên thành công");
    } catch (error) {
      console.log(error);
      noti.error("Sửa thành viên thất bại");
    }

    form.reset();
  }

  const handleDelete = async () => {
    if(!user) {
      noti.error("Dữ liệu trống");
      return;
    }

    try {
      await Delete({ id: user.ID });
      const newList = listUser.filter(u => u.ID !== user.ID);
      setListUser(newList);
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
          id="update-user"
          onSubmit={form.onSubmit(handleUpdate)}
        >
          <TextInput
            label="Tên thành viên"
            {...form.getInputProps("name")}
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
            form="update-user"
          >Hoàn tất</Button>
        </Group>
      </Modal>
    </>
  )
});

export default ModalUserUpdate;

type FormUpdateUser = {
  name: string;
}