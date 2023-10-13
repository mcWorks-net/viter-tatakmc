import { devNavUrl } from "@/components/helpers/functions-general";
import ButtonSpinner from "@/components/partials/spinners/ButtonSpinner";
import React from "react";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

const SystemLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="login w-full max-w-[380px] border border-gray-200 py-8 px-4 rounded-md shadow-sm">
          <div className="flex flex-col items-center mb-4">
            <h2 className="mb-0 mt-10 text-lg">System Login</h2>
          </div>

          <form action="">
            <div className="form__wrap">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>

            <div className="form__wrap relative">
              <label htmlFor="">Password</label>
              <input type={showPassword ? "text" : "password"} />

              <button
                className="absolute bottom-3 right-2 text-xl"
                onClick={handleShowPassword}
                type="button"
              >
                {showPassword ? <BsEyeSlashFill /> : <IoEyeSharp />}
              </button>
            </div>

            <button className="btn btn--accent w-full ">
              Submit <ButtonSpinner />
            </button>
          </form>

          <a
            className="text-dark text-xs block text-center mt-6"
            href={`${devNavUrl}/system/forgot-password`}
          >
            Forgot Password
          </a>
        </div>
      </div>
    </>
  );
};

export default SystemLogin;
