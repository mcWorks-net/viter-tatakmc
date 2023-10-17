import useQueryData from "@/components/custom-hooks/useQueryData";
import { getUrlParam } from "@/components/helpers/functions-general";
import React from "react";

const ProfileList = () => {

  const id = getUrlParam().get('id')
 

  const {
    isLoading,
    isFetching,
    error,
    data: clients,
  } = useQueryData(
    `/v1/client/${id}`, // endpoint
    "get", // method
    "client" // key
  );

  console.log(clients)

  return (
    <>
      <h3 className="mb-5">Contact Info</h3>
      <ul className="profile flex gap-2">
        <li className="font-bold">Name:</li>
        <li>{clients?.data[0].client_name}</li>
      </ul>
      <ul className="profile flex gap-2">
        <li className="font-bold">Email:</li>
        <li>{clients?.data[0].client_email}</li>
      </ul>
      <ul className="profile flex gap-2">
        <li className="font-bold">Phone:</li>
        <li>{clients?.data[0].client_phone}</li>
      </ul>
      <ul className="profile flex gap-2">
        <li className="font-bold">Address:</li>
        <li>{clients?.data[0].client_address}</li>
      </ul>
    </>
  );
};

export default ProfileList;
