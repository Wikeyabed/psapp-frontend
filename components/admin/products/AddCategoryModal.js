import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ModalBox from "../layout/Modal";
import AddCategoryForm from "./AddCategoryForm";

export default function AddCategoryModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ModalBox
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
      buttonText={"دسته بندی ها"}
      buttonVariant={"outlined"}
      icon={<AddIcon />}
    >
      <AddCategoryForm />
    </ModalBox>
  );
}
