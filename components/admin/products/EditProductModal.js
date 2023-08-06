import { useState } from "react";
import ModalBox from "../layout/Modal";
import EditIcon from "@mui/icons-material/Edit";
import EditProductForm from "./EditProdcutForm";

function EditProductModal({ product }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {" "}
      <ModalBox
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        // buttonText={"ویرایش محصول"}
        buttonVariant="contained"
        buttonStyle={{
          padding: "20px  0",
          position: "absolute",
          left: "10px",
          bottom: "5px",
          borderRadius: "50%",
        }}
        icon={<EditIcon />}
      >
        <EditProductForm product={product} />
      </ModalBox>
    </>
  );
}
export default EditProductModal;
