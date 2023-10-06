import { InputText } from "@/components/helpers/FormInputs.jsx";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";

const ModalAddClient = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v1/client/${itemEdit.client_aid}`
          : "/v1/client",
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["clients"] });
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
    client_aid : itemEdit ? itemEdit.client_aid : "",
    client_name: itemEdit ? itemEdit.client_name : "",
    client_email: itemEdit ? itemEdit.client_email : "",
    client_phone: itemEdit ? itemEdit.client_phone : "",
    client_address: itemEdit ? itemEdit.client_address : "",
    client_name_old: itemEdit ? itemEdit.client_name : "",
  };

  const yupSchema = Yup.object({
    client_name: Yup.string().required("Required"),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
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
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              // mutate data
              mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal__body">
                    <div className="form__wrap">
                      <InputText
                        label="Client Name"
                        type="text"
                        name="client_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="form__wrap">
                      <InputText
                        label="Email"
                        type="email"
                        name="client_email"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="form__wrap">
                      <InputText
                        label="Phone"
                        type="text"
                        name="client_phone"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="form__wrap">
                      <InputText
                        label="Adress"
                        type="text"
                        name="client_address"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="modal__action flex justify-end mt-6 gap-2">
                      <button
                        className="btn btn--accent"
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
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
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddClient;
