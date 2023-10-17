import useQueryData from "@/components/custom-hooks/useQueryData";
import { devNavUrl } from "@/components/helpers/functions-general";
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
import {
  MdArchive,
  MdDelete,
  MdEdit,
  MdPreview,
  MdRestorePage,
  MdVibration,
} from "react-icons/md";
import { Link } from "react-router-dom";

const ClientsList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isActive, setActive] = React.useState(null);

  let counter = 1;

  const {
    isLoading,
    isFetching,
    error,
    data: clients,
  } = useQueryData(
    "/v1/client", // endpoint
    "get", // method
    "clients" // key
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.client_aid);
    setData(item);
    setActive(true);
  };

  const handleRestore = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.client_aid);
    setData(item);
    setActive(false);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.client_aid);
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
              <th>Name</th>
              <th>Status</th>
              <th className="header__action text-right"></th>
            </tr>
          </thead>

          <tbody>
            {(isLoading || clients?.data.length === 0) && (
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

            {clients?.data.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{counter++}</td>
                  <td>{item.client_name}</td>

                  <td>
                    {item.client_is_active === 1 ? (
                      <Pills label="Active" />
                    ) : (
                      <Pills bgColor="bg-disable" label="Inactive" />
                    )}
                  </td>
                  <td>
                    <div className="table__action">
                      <HiDotsHorizontal />
                      <ul className="">
                        {item.client_is_active === 1 ? (
                          <>
                            <li className="tooltip" data-tooltip="Edit">
                              <Link
                                to={`${devNavUrl}/clients/profile`}
                                className="text-2xl text-black"
                              >
                                <MdPreview />
                              </Link>
                            </li>

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
          mysqlApiDelete={`/v1/client/${id}`}
          msg="Are you sure you want to delete this record?"
          item={dataItem.client_name}
          queryKey="clients"
        />
      )}
      {store.isConfirm && (
        <ModalArchive
          mysqlApiArchive={`/v1/client/active/${id}`}
          item={dataItem.client_name}
          queryKey="clients"
          isActive={isActive}
        />
      )}
    </>
  );
};

export default ClientsList;
