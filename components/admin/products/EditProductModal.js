import { useState } from "react";
import ModalBox from "../layout/Modal";
import EditIcon from "@mui/icons-material/Edit";
import EditProductForm from "./EditProdcutForm";
import { useEffect } from "react";

function EditProductModal({ product }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const closeAfterUpdate = (value) => {
    if (value) {
      setOpen(false);
    }
  };

  // useEffect(() => {
  //   handleClose();
  // }, [product]);

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
        <EditProductForm
          closeAfterUpdate={closeAfterUpdate}
          product={product}
        />
      </ModalBox>
    </>
  );
}
export default EditProductModal;
