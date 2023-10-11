import {
  InputTextRHF,
  SelectRHF,
  TextAreaRHF,
} from "@/components/helpers/RHFInputs.jsx";
import { queryData } from "@/components/helpers/queryData.jsx";
import ButtonSpinner from "@/components/partials/spinners/ButtonSpinner.jsx";
import Modal from "@/components/partials/wrapper/Modal.jsx";
import {
  setIsAdd,
  setMessage,
  setSuccess,
  setValidate,
} from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

import * as Yup from "yup";

const ModalAddServiceRHF = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) =>
      queryData(
        itemEdit ? `/v1/services/${itemEdit.service_aid}` : "/v1/services",
        itemEdit ? "put" : "post",
        data
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["services"] });
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? `updated` : `added`}.`));
      }
      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const initVal = {
    service_aid: itemEdit ? itemEdit.service_aid : "",
    service_type: itemEdit ? itemEdit.service_type : "",
    service_option: itemEdit ? itemEdit.service_option : "",
    service_description: itemEdit ? itemEdit.service_description : "",
    service_type_old: itemEdit ? itemEdit.service_type : "",
  };

  const yupSchema = Yup.object({
    service_type: Yup.string().required("Required"),
    service_option: Yup.string().required("Required"),
    service_description: Yup.string().required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: initVal,
    resolver: yupResolver(yupSchema),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const onSubmit = (data) => {
    // mutation.mutate(data);
    console.log(data);
  };

  const options = {
    1: "option_val_1",
    2: "option_val_2",
    3: "option_val_3",
  };

  return (
    <>
      <Modal>
        <div className="modal__header relative">
          <h3 className="mb-5"> {itemEdit ? "Update" : "Add"} Service </h3>
          <button className="absolute -top-4 right-0 " onClick={handleClose}>
            <FaTimes className="text-gray-700 text-base" />
          </button>
        </div>
        <div className="modal__body overflow-auto max-h-[50vh]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal__body">
              <div className="form__wrap">
                <InputTextRHF
                  label="Services"
                  name="service_type"
                  type="text"
                  errors={errors?.service_type}
                  register={register}
                />
              </div>

              <div className="form__wrap">
                <SelectRHF
                  label="Options"
                  name="service_option"
                  options={options}
                  errors={errors?.service_option}
                  register={register}
                  onChange={(e) => e}
                />
              </div>

              <div className="form__wrap">
                <TextAreaRHF
                  label="Description"
                  register={register}
                  errors={errors?.service_description}
                  name="service_description"
                />
              </div>

              <div className="modal__action flex justify-end mt-6 gap-2">
                <button
                  className="btn btn--accent"
                  type="submit"
                  disabled={mutation.isLoading || !isDirty}
                >
                  {mutation.isLoading ? (
                    <ButtonSpinner />
                  ) : itemEdit ? (
                    "Save"
                  ) : (
                    "Add"
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn--cancel"
                  disabled={mutation.isLoading}
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddServiceRHF;
