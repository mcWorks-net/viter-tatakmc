import { devNavUrl } from "@/components/helpers/functions-general";
import ButtonSpinner from "@/components/partials/spinners/ButtonSpinner";
import React from "react";
import { BsCheckCircleFill, BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

const SystemCreatePassword = () => {
  const [password, setPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState(false);

  const handlePassword = () => setPassword(!password);
  const handleConfirmPassword = () => setConfirmPassword(!confirmPassword);

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="login w-full max-w-[380px] border border-gray-200 py-8 px-4 rounded-md shadow-sm">
          <div className="flex flex-col items-center mb-4">
            <h2 className="mb-0 mt-10 text-lg">System Login</h2>
          </div>

          <BsCheckCircleFill className="text-5xl fill-green-600 mx-auto mt-10 mb-2" />
          <h2 className="mb-4 mt-2 text-lg text-center">Success</h2>
          <p className="text-sm mb-6">
            Your new password is set and ready to use. Click the button below to
            continue login
          </p>

          <a
            className="btn btn--accent text-xs  text-center mt-6 flex items-center"
            href={`${devNavUrl}/system/login`}
          >
            Back to Login
          </a>

          <form action="">
            <div className="form__wrap relative">
              <label htmlFor="">Password</label>
              <input type={password ? "text" : "password"} />

              <button
                className="absolute bottom-3 right-2 text-xl"
                onClick={handlePassword}
                type="button"
              >
                {password ? <BsEyeSlashFill /> : <IoEyeSharp />}
              </button>
            </div>

            <div className="form__wrap relative">
              <label htmlFor="">Confirm Password</label>
              <input type={confirmPassword ? "text" : "password"} />

              <button
                className="absolute bottom-3 right-2 text-xl"
                onClick={handleConfirmPassword}
                type="button"
              >
                {confirmPassword ? <BsEyeSlashFill /> : <IoEyeSharp />}
              </button>
            </div>

            <button className="btn btn--accent w-full ">
              Submit <ButtonSpinner />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SystemCreatePassword;
