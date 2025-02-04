import { useState } from "react";
import ModalBox from "../layout/Modal";
import AddProductForm from "./AddProductForm";

function AddProductModal({ product }) {
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
        buttonText={"ایجاد محصول جدید"}
        buttonVariant="contained"
      >
        <AddProductForm closeAfterUpdate={closeAfterUpdate} product={product} />
      </ModalBox>
    </>
  );
}
export default AddProductModal;
