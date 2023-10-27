import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs.jsx";
import { consoleLog } from "@/components/helpers/functions-general";
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
import { data } from "autoprefixer";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";

const ModalAddOrder = ({ itemEdit , services , client}) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();


  const [serviceId, setServiceId] = React.useState(null);
  const [clientId, setClientId] = React.useState(null);

  const [selectedService, setSelectedService] = React.useState([])




 
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v1/orders/${itemEdit.order_aid}`
          : "/v1/orders",
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      console.log(data.success)
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
    order_client_id: itemEdit ? itemEdit.order_client_id : "",
    order_service_id: itemEdit ? itemEdit.order_service_id : "",
    order_price: itemEdit ? itemEdit.order_price : "",
    order_quantity: itemEdit ? itemEdit.order_quantity : "",
    order_payment_status: itemEdit ? itemEdit.order_payment_status : "",
  };

  const yupSchema = Yup.object({
    order_service_id: Yup.string().required("Required"),
    order_client_id: Yup.string().required("Required"),
    // order_price: Yup.string().required("Required"),
    order_quantity: Yup.string().required("Required"),
    order_payment_status: Yup.string().required("Required"),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  
    
  const [serviceCost , setServiceCost] = React.useState(null)
    const handleChangeSelect = (e) => {
       setServiceCost(e.target.options[e.target.selectedIndex].getAttribute('data-price'))
  }


  const handleChangeSelectClient = (e) => {
    setClientId(e.target.options[e.target.selectedIndex].value);
  };

  // const [quantity , setQuantity] = React.useState("");
  // const handleQuantity = (event) => {
  //   setQuantity(event.target.value);
  // }


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
              console.log(values)
              mutation.mutate({...values, order_status:"Pending"});
            }}
          >
            {(props) => {
              if(props.values.oprder_price){
                props.values.order_price = serviceCost;
              }else{
                itemEdit.order_price
              }
              return (
                <Form>
                  <div className="modal__body">
                    <div className="form__wrap">
                    <InputSelect
                    label="Service Type"
                    name="order_service_id"
                    disabled={itemEdit || mutation.isLoading ? true : false}
                    onChange={(e) => handleChangeSelect(e)}
                  >
                    <optgroup label="Service Type">
                      <option value="" hidden></option>
                      {services.data.length > 0 ? (
                        services.data.map((item, key) => (
                          <option
                            key={key}
                            value={item.service_aid}
                            title={item.service_type}
                            data-price={item.service_cost}
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
                    name="order_client_id"
                    disabled={itemEdit || mutation.isLoading ? true : false}
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
                    <div className="form__wrap">
                      <InputText
                        label="Order Quantity"
                        type="text"
                        name="order_quantity"
                        disabled={mutation.isLoading}
                        // onChange= {handleQuantity}
                        // value = {quantity}
                      />
                    </div>
                    <div className="form__wrap">
                      <InputText
                        label="Price Per/Piece"
                        type="text"
                        name="order_price"
                        disabled={true}
                        // value={serviceCost}
                      />
                    </div>
                    <div className="form__wrap">
                      <InputText
                        label="Payment Type"
                        type="text"
                        name="order_payment_status"
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

export default ModalAddOrder;
