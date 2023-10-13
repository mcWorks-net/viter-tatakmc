import { devNavUrl } from "@/components/helpers/functions-general";
import ButtonSpinner from "@/components/partials/spinners/ButtonSpinner";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";

const SystemForgotPassword = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="login w-full max-w-[380px] border border-gray-200 py-8 px-4 rounded-md shadow-sm">
        <div className="flex flex-col items-center mb-4">
          <h2 className="mb-0 mt-10 text-lg">System Login</h2>
        </div>

        <MdMarkEmailRead className="text-5xl fill-green-600 mx-auto mt-10 mb-2" />
        <h2 className="mb-4 mt-2 text-lg text-center"> Instruction Sent!</h2>
        <p className="text-sm mb-6">
          We have successfully sent an instruction to reset your password. If
          you haven't received any email, please also check your spam/junk
          folder.
        </p>

        <form action="">
          <div className="form__wrap relative">
            <label htmlFor="">Registered Email</label>
            <input type="email" />
          </div>

          <button className="btn btn--accent w-full ">
            Submit Instruction <ButtonSpinner />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SystemForgotPassword;
