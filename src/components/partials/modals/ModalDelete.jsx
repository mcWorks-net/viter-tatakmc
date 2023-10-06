import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

import {
  setIsDelete,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { queryData } from "../../helpers/queryData";
import ButtonSpinner from "../spinners/ButtonSpinner";
import Modal from "../wrapper/Modal";

const ModalDelete = ({ mysqlApiDelete, msg, item, queryKey }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiDelete, "delete", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      dispatch(setIsDelete(false));

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage("Deleted succesfully."));
      }
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsDelete(false));
  };

  const handleYes = async () => {
    mutation.mutate({
      item: item,
    });
  };

  return (
    <>
      <Modal width="max-w-[480px]">
        <div className="modal__header mb-4 ">
          <h3 className="text-alert flex  items-end  gap-2">
            <FaTrash className="text-3xl" />
            <span className="text-lg">Delete</span>
          </h3>
        </div>
        <div className="modal__body ">
          <p>{msg}</p>
          <div className="modal__action flex justify-end gap-4 mt-8">
            <button
              className="btn btn--cancel"
              type="submit"
              onClick={handleYes}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? <ButtonSpinner /> : "Delete"}
            </button>
            <button
              className="btn btn--alert"
              type="button"
              disabled={mutation.isLoading}
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDelete;
