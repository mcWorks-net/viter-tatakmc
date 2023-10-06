import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import Toast from "@/components/partials/Toast.jsx";
import ModalValidate from "@/components/partials/modals/ModalValidate.jsx";
import { setIsAdd } from "@/components/store/StoreAction.jsx";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import ModalAddService from "./ModalAddService.jsx";
import ServicesList from "./ServicesList.jsx";

const Services = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <main className="bg-secondary main__wrapper h-[calc(100vh-48px)]">
        <div className="grid grid-cols-[180px_1fr] gap-10 h-full ">
          <Navigation menu="services" />
          <div className="pr-10 pt-5 relative">
            <div className="flex justify-between items-end mb-10">
              <h1 className="leading-none mb-0">Services</h1>
              <button className="btn btn--accent btn--sm" onClick={handleAdd}>
                <BsPlusCircleFill className="md:hidden" /> Add
              </button>
            </div>
            <ServicesList setItemEdit={setItemEdit}/>
            <Footer />
          </div>
        </div>
      </main>
      {store.isAdd && <ModalAddService itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}
      {store.success && <Toast />}
    </>
  );
};

export default Services;
