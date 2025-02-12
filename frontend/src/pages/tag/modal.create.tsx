import { forwardRef, Ref, useContext, useImperativeHandle, useState } from "react";
import { useNotification } from "@/hook/notification.hook";
import { Button, ColorInput, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { Create } from "wails/go/taghandle/tagHandle";
import { TagContext, TagContextType } from ".";



export type ModalCreateTagRef = {
  openModal: () => void
  closeModal: () => void
  createSuccess: (cb: () => void) => void
}

const ModalCreateTag = forwardRef((_, ref: Ref<ModalCreateTagRef>) => {
  const [modal, setModal] = useState<boolean>(false);

  const noti = useNotification();

  const { listTag, setListTag } = useContext<TagContextType>(TagContext);

  const form = useForm<FormCreateTag>({
    initialValues: {
      name: "",
      color: "",
      code: "",
    },
    validate: {
      name: (value) => value.length === 0 ? "Không để trống" : null,
      color: (value) => value.length === 0 ? "Không để trống" : null,
      code: (value) => value.length === 0 ? "Không để trống" : null,
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
  const handleCreate = async (values: FormCreateTag) => {
    try {
      const result = await Create({
        name: values.name,
        color: values.color,
        code: values.code,
      });

      console.log(result);
      setModal(false);
      setListTag([...listTag, result]);
      noti.success("Thêm tag thành công");
    } catch (error) {
      console.log(error);
      noti.error("Thêm tag thất bại");
    }
    form.reset();
  }



  return (
    <>
      <Modal
        title="Thêm tag"
        opened={modal}
        onClose={() => setModal(false)}
      >
        <form
          id="create-tag"
          onSubmit={form.onSubmit(handleCreate)}
        >
          <TextInput
            label="Tên tag"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Mã"
            {...form.getInputProps("code")}
          />
          <ColorInput
            label="Mã màu"
            {...form.getInputProps("color")}
          />
        </form>

        <Group w={"100%"} mt={24} justify="end">
          <Button
            type="submit"
            form="create-tag"
          >Hoàn tất</Button>
        </Group>
      </Modal>
    </>
  )
})

export default ModalCreateTag;

type FormCreateTag = {
  name: string;
  color: string;
  code: string;
}