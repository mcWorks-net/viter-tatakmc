import { InputSelect, InputText } from "@/components/helpers/FormInputs.jsx";
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

const ModalAddOrder = ({ itemEdit , services , client}) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const [serviceId, setServiceId] = React.useState(null);

  const [clientId, setClientId] = React.useState(null);


  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v1/orders/${itemEdit.client_class_aid}`
          : "/v1/orders",
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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
    client_class_aid: itemEdit ? itemEdit.client_class_aid : "",
    client_class_name: itemEdit ? itemEdit.client_class_name : "",
    client_class_name_old: itemEdit ? itemEdit.client_class_name : "",
  };

  const yupSchema = Yup.object({
    client_class_name: Yup.string().required("Required"),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const handleChangeSelect = (e) => {
    setServiceId(e.target.options[e.target.selectedIndex].value);
  };

  const handleChangeSelectClient = (e) => {
    setClientId(e.target.options[e.target.selectedIndex].value);
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
                        label="Service Name"
                        type="text"
                        name="client_class_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="form__wrap">
                    <InputSelect
                    label="Service Type"
                    name="product_category_id"
                    disabled={mutation.isLoading}
                    onChange={(e) => handleChangeSelect(e)}
                  >
                    <optgroup label="Select Category">
                      <option value="" hidden></option>
                      {services.data.length > 0 ? (
                        services.data.map((item, key) => (
                          <option
                            key={key}
                            value={item.service_aid}
                            title={item.service_type}
                          >
                            {item.service_type}
                          </option>
                        ))
                      ) : (
                        <option value="">No data</option>
                      )}
                    </optgroup>
                  </InputSelect>
                    </div>
                    <div className="form__wrap">
                    <InputSelect
                    label="Client"
                    name="product_category_id"
                    disabled={mutation.isLoading}
                    onChange={(e) => handleChangeSelectClient(e)}
                  >
                    <optgroup label="Select Category">
                      <option value="" hidden></option>
                      {client.data.length > 0 ? (
                        client.data.map((item, key) => (
                          <option
                            key={key}
                            value={item.client_aid}
                            title={item.client_name}
                          >
                            {item.client_name}
                          </option>
                        ))
                      ) : (
                        <option value="">No data</option>
                      )}
                    </optgroup>
                  </InputSelect>
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

export default ModalAddOrder;
