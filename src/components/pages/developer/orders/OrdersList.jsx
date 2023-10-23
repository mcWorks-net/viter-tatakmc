import useQueryData from "@/components/custom-hooks/useQueryData";
import NoData from "@/components/partials/NoData.jsx";
import Pills from "@/components/partials/Pills.jsx";
import ServerError from "@/components/partials/ServerError.jsx";
import TableLoading from "@/components/partials/TableLoading.jsx";
import ModalArchive from "@/components/partials/modals/ModalArchive.jsx";
import ModalDelete from "@/components/partials/modals/ModalDelete.jsx";
import { setIsAdd, setIsConfirm, setIsDelete } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext.jsx";
import { data } from "autoprefixer";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdArchive, MdDelete, MdEdit, MdRestorePage } from "react-icons/md";

const OrdersList = ({setItemEdit}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isActive, setActive] = React.useState(null);

  let counter = 1;

  
  const {
    isLoading,
    isFetching,
    error,
    data: orders,
  } = useQueryData(
    "/v1/orders", // endpoint
    "get", // method
    "orders" // key
  );

  
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.order_aid);
    setData(item);
    setActive(true);
  };

  const handleRestore = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.order_aid);
    setData(item);
    setActive(false);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setId(item.order_aid);
    setData(item);
  };

  const seperateDateAndTime = (theDate) =>{
    const [date , time] = theDate.split(/ /);
    const sliceDate = date.split(/-/);
    const year = sliceDate[0];
    const month = sliceDate[1];
    const day = sliceDate[2];
    return `${month}-${day}-${year}`;
  }

  return (
    <>
      <div className="table__wrapper bg-white p-2 rounded-md ">
        <table>
          <thead>
            <tr>
              <th className="w-[40px]">#</th>
              <th>Order Date</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Order Status</th>
              <th>Order Price</th>
              <th>Order Quantity</th>
              <th>Total Amount</th>
              <th>Payment Type</th>
              <th>Status</th>
              <th className="header__action text-right"></th>
            </tr>
          </thead>

          <tbody>
            {(isLoading || orders?.data.length === 0) && (
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

            {orders?.data.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{counter++}</td>
                  <td>{seperateDateAndTime(item.order_created)}</td>
                  <td>{item.client_name}</td>
                  <td>{item.client_email}</td>
                  <td>{item.order_status}</td>
                  <td>{item.order_price}</td>
                  <td>{item.order_quantity}</td>
                  <td>{new Intl.NumberFormat('tl-PH', { style: 'currency', currency: 'PHP' }).format(item.order_quantity*item.order_price)}</td>
                  <td>{item.order_payment_status}</td>
                  <td>
                    {item.order_is_active === 1 ? (
                      <Pills label="Active" />
                    ) : (
                      <Pills bgColor="bg-disable" label="Inactive" />
                    )}
                  </td>
                  <td>
                    <div className="table__action">
                      <HiDotsHorizontal />
                      <ul className="">
                        {item.order_is_active === 1 ? (
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
          mysqlApiDelete={`/v1/orders/${id}`}
          msg="Are you sure you want to delete this record?"
          item={dataItem.category_name}
          queryKey="orders"
        />
      )}
      {store.isConfirm && (
        <ModalArchive
          mysqlApiArchive={`/v1/orders/active/${id}`}
          item={dataItem.category_name}
          queryKey="orders"
          isActive={isActive}
        />
      )}
    </>
  );
};

export default OrdersList;
