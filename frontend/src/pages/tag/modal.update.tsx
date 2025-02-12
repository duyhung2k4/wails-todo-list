import { useNotification } from "@/hook/notification.hook";
import { Button, ColorInput, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, Ref, useContext, useImperativeHandle, useState } from "react";
import { Delete, Update } from "wails/go/taghandle/tagHandle";
import { TagContext, TagContextType } from ".";
import { model } from "wails/go/models";



export type RefModalTagUpdate = {
  openModal: (tag: model.Tag) => void
  closeModal: () => void
  updateSuccess: (cb: () => void) => void
}

const ModalTagUpdate = forwardRef((_, ref: Ref<RefModalTagUpdate>) => {
  const [tag, setTag] = useState<model.Tag | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const noti = useNotification();

  const { listTag, setListTag } = useContext<TagContextType>(TagContext);

  const form = useForm<FormUpdateTag>({
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
  const openModal = (item: model.Tag) => {
    setTag(item);
    setModal(true);
    form.setValues({
      ...form.values,
      name: item.name,
      color: item.color,
      code: item.code,
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
  const handleUpdate = async (values: FormUpdateTag) => {
    if(!tag) {
      noti.error("Dữ liệu trống");
      return;
    }
    
    try {
      const result = await Update({
        id: tag.ID,
        name: values.name,
        color: values.color,
        code: values.code,
      });

      console.log(result);
      setModal(false);
      
      const newList = listTag.map(item => item.ID === result.ID ? result : item);
      setListTag(newList);
      noti.success("Sửa tag thành công");
    } catch (error) {
      console.log(error);
      noti.error("Sửa tag thất bại");
    }

    form.reset();
  }

  const handleDelete = async () => {
    if(!tag) {
      noti.error("Dữ liệu trống");
      return;
    }

    try {
      await Delete({ id: tag.ID });
      const newList = listTag.filter(item => item.ID !== tag.ID);
      setListTag(newList);
      noti.success("Xóa tag thành công");
    } catch (error) {
      console.log(error);
      noti.error("Xóa tag thất bại");
    }

    form.reset();
  }



  return (
    <>
      <Modal
        title="Chỉnh sửa tag"
        opened={modal}
        onClose={() => setModal(false)}
      >
        <form
          id="update-tag"
          onSubmit={form.onSubmit(handleUpdate)}
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
            style={{
              backgroundColor: "red"
            }}
            onClick={handleDelete}
          >Xóa</Button>
          <Button
            type="submit"
            form="update-tag"
          >Hoàn tất</Button>
        </Group>
      </Modal>
    </>
  )
});

export default ModalTagUpdate;

type FormUpdateTag = {
  name: string;
  color: string;
  code: string;
}