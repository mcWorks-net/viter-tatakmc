import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import Toast from "@/components/partials/Toast.jsx";
import ModalValidate from "@/components/partials/modals/ModalValidate.jsx";
import { setIsAdd } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import ModalAddOrder from "./ModalAddOrder.jsx";
import OrdersList from "./OrdersList.jsx";
import useQueryData from "@/components/custom-hooks/useQueryData.jsx";

const Orders = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const {
    isLoading,
    isFetching,
    error,
    data: services,
  } = useQueryData(
    "/v1/services", // endpoint
    "get", // method
    "services" // key
  );

  const { 
    data:client
  } =  useQueryData(
    "/v1/client", // endpoint
    "get", // method
    "client" // key
  );

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <main className="bg-secondary main__wrapper h-[calc(100vh-48px)]">
        <div className="grid grid-cols-[180px_1fr] gap-10 h-full ">
          <Navigation menu="orders" />
          <div className="pr-10 pt-5 relative">
            <div className="flex justify-between items-end mb-10">
              <h1 className="leading-none mb-0">Orders</h1>
              <button className="btn btn--accent btn--sm" onClick={handleAdd}>
                <BsPlusCircleFill className="md:hidden" /> Add
              </button>
            </div>
            <OrdersList setItemEdit={setItemEdit}/>
            <Footer />
          </div>
        </div>
      </main>
      {store.isAdd && <ModalAddOrder itemEdit={itemEdit} services={services} client={client}/>}
      {store.validate && <ModalValidate />}
      {store.success && <Toast />}
    </>
  );
};

export default Orders;
