import useQueryData from "@/components/custom-hooks/useQueryData";
import { devNavUrl } from "@/components/helpers/functions-general";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import Loadmore from "@/components/partials/Loadmore";
import NoData from "@/components/partials/NoData.jsx";
import Pills from "@/components/partials/Pills.jsx";
import SearchBar from "@/components/partials/SearchBar";
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
import { useInfiniteQuery } from "@tanstack/react-query";
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


  const [isDel, setDel] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef({ value: "" });

  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["client", search.current.value, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/client/search`, // search endpoint
        `/v1/client/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean
        "post",
        { search: search.current.value }
      ),
    getNextPageParam: (lastPage) => {
     
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: true,
  });

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
      <SearchBar 
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
      />
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
          {(status === "loading" ||
                  result?.pages[0].data.length === 0) && (
                  <tr className="text-center ">
                    <td colSpan="100%" className="p-2 md:p-10">
                      {status === "loading" ? (
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

            {result?.pages.map((page, key) => (
                  <React.Fragment key={key}>
                    {page.data.map((item, key) => {
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
                                to={`${devNavUrl}/clients/profile?id=${item.client_aid}`}
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
        </React.Fragment>
      ))}
          </tbody>
        </table>
      </div>
      <div className="loadmore flex justify-center flex-col items-center pb-10">
            <Loadmore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
            />
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
