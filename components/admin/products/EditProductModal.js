import { useState } from "react";
import ModalBox from "../layout/Modal";
import EditIcon from "@mui/icons-material/Edit";
import EditProductForm from "./EditProductForm";

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
        icon={<EditIcon />}
        buttonColor={"info"}
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
