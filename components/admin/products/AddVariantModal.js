import { useState } from "react";
import ModalBox from "../layout/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddProductVariant from "./AddProductVariant";
function AddVariantModal({ product }) {
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
        icon={<AddCircleIcon />}
        buttonColor={"info"}
      >
        <AddProductVariant product={product} />
      </ModalBox>
    </>
  );
}
export default AddVariantModal;
