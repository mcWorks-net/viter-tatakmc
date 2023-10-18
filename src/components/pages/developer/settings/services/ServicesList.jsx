import useQueryData from "@/components/custom-hooks/useQueryData";
import NoData from "@/components/partials/NoData.jsx";
import Pills from "@/components/partials/Pills.jsx";
import ServerError from "@/components/partials/ServerError.jsx";
import TableLoading from "@/components/partials/TableLoading.jsx";
import ModalArchive from "@/components/partials/modals/ModalArchive.jsx";
import ModalDelete from "@/components/partials/modals/ModalDelete.jsx";
import {
  setIsAdd,
  setIsConfirm,
  setIsDelete,
} from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdArchive, MdDelete, MdEdit, MdRestorePage } from "react-icons/md";

const ServicesList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isActive, setActive] = React.useState(null);

  let counter = 1;

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

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.service_aid);
    setData(item);
    setActive(true);
  };

  const handleRestore = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.service_aid);
    setData(item);
    setActive(false);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.service_aid);
    setData(item);
  };

  // const category = {
  //   data: [
  //     {
  //       id: "1",
  //       name: "name",
  //     },
  //   ],
  // };

  return (
    <>
      <div className="table__wrapper bg-white p-2 rounded-md ">
        <table>
          <thead>
            <tr>
              <th className="w-[40px]">#</th>
              <th>Service Name</th>
              <th className="text-center">Servie Cost</th>
              <th>Status</th>
              <th className="header__action text-right"></th>
            </tr>
          </thead>

          <tbody>
            {(isLoading || services?.data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {isLoading ? (
                    <TableLoading count={20} cols={3} />
                  ) : (
                    <NoData />
                  )}
                </td>
              </tr>
            )}

            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {services?.data.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{counter++}</td>
                  <td>{item.service_type}</td>
                  <td className="text-center">{item.service_cost}</td>
                  <td>
                    {item.service_is_active === 1 ? (
                      <Pills label="Active" />
                    ) : (
                      <Pills bgColor="bg-disable" label="Inactive" />
                    )}
                  </td>
                  <td>
                    <div className="table__action">
                      <HiDotsHorizontal />
                      <ul className="">
                        {item.service_is_active === 1 ? (
                          <>
                            <li className="tooltip" data-tooltip="Edit">
                              <button onClick={() => handleEdit(item)}>
                                <MdEdit />
                              </button>
                            </li>

                            <li className="tooltip" data-tooltip="Archive">
                              <button onClick={() => handleArchive(item)}>
                                <MdArchive />
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="tooltip" data-tooltip="Delete">
                              <button onClick={() => handleDelete(item)}>
                                <MdDelete />
                              </button>
                            </li>

                            <li className="tooltip" data-tooltip="Restore">
                              <button onClick={() => handleRestore(item)}>
                                <MdRestorePage />
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/v1/services/${id}`}
          msg="Are you sure you want to delete this record?"
          item={dataItem.service_type}
          queryKey="services"
        />
      )}
      {store.isConfirm && (
        <ModalArchive
          mysqlApiArchive={`/v1/services/active/${id}`}
          item={dataItem.service_type}
          queryKey="services"
          isActive={isActive}
        />
      )}
    </>
  );
};

export default ServicesList;
