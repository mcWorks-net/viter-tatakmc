import React from "react";

import { MdOutlineError } from "react-icons/md";
import Modal from "../wrapper/Modal";
import { StoreContext } from "@/store/StoreContext";
import { setError } from "@/store/StoreAction";

const ModalError = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setError(false));
  };
  return (
    <>
      <Modal>
        <div className="modal__header mb-4 ">
          <h3 className=" flex flex-col items-center justify-center gap-2">
            <MdOutlineError className="text-4xl text-alert" />
            <span className="text-xl">Error</span>
          </h3>
        </div>
        <div className="modal__body text-center">
          <p>{store.message} </p>
          <div className="modal__action flex justify-center gap-4 mt-8">
            <button className="btn btn--alert" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalError;
