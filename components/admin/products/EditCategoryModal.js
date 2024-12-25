import { useState } from "react";
import ModalBox from "../layout/Modal";
import AddCategoryForm from "./AddCategoryForm";
import { Edit } from "@mui/icons-material";
import EditCategoryForm from "./EditCategoryForm";

export default function EditCategoryModal({ cats }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ModalBox
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
      buttonText={"ویرایش دسته بندی ها"}
      buttonVariant={"outlined"}
      icon={<Edit />}
    >
      <EditCategoryForm cats={cats} />
    </ModalBox>
  );
}
