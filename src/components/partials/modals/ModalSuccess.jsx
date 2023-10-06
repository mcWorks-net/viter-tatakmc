import React from "react";

import { MdOutlineError } from "react-icons/md";
import Modal from "../wrapper/Modal";
import { FaCheckCircle } from "react-icons/fa";

const ModalSuccess = () => {
  return (
    <>
      <Modal>
        <div className="modal__header mb-4 ">
          <h3 className=" flex flex-col items-center justify-center gap-2">
            <FaCheckCircle className="text-4xl text-success" />
            <span className="text-xl">Success</span>
          </h3>
        </div>
        <div className="modal__body text-center">
          <p>Process Completed </p>
          <div className="modal__action flex justify-center gap-4 mt-8">
            <button className="btn btn--success">Close</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalSuccess;
