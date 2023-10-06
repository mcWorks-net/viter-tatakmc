import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaQuestionCircle } from "react-icons/fa";

import {
  setIsConfirm,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";

import { queryData } from "@/components/helpers/queryData.jsx";
import Modal from "../wrapper/Modal";

const ModalArchive = ({ mysqlApiArchive, item, queryKey, isActive }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  let activeValue = isActive;

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiArchive, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      dispatch(setIsConfirm(false));

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage("Archived succesfully."));
      }
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsConfirm(false));
  };

  const handleYes = async () => {
    // mutate data
    mutation.mutate({
      isActive: activeValue,
    });
  };

  // handleEscape(() => handleClose());

  return (
    <>
      <Modal width="max-w-[480px]">
        <div className="modal__header mb-4 ">
          <h3 className="text-warning flex  items-end  gap-2">
            <FaQuestionCircle className="text-3xl" />
            <span className="text-lg">Confirm</span>
          </h3>
        </div>
        <div className="modal__body ">
          <p>{`You are about to ${
            activeValue ? "restore" : "archive"
          } this record, do you want to proceed?`}</p>
          <div className="modal__action flex justify-end gap-4 mt-8">
            <button
              className="btn btn--warning"
              disabled={mutation.isLoading}
              onClick={handleYes}
              type="submit"
            >
              {mutation.isLoading ? (
                <ButtonSpinner />
              ) : activeValue ? (
                "Restore"
              ) : (
                "Archive"
              )}
            </button>
            <button
              className="btn btn--cancel"
              disabled={mutation.isLoading}
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalArchive;
