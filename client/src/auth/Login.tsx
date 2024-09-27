import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import { userSignInSchema, userSignInTypes } from "../schema/userSchma";

const Login = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const [inputData, setInputData] = useState<userSignInTypes>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<Partial<userSignInTypes>>({})

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = userSignInSchema.safeParse(inputData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<userSignInTypes>);
      return;
    }

    
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => navigate("/"), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 left-0 h-screen w-screen z-50 bg-zinc-200/70 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: isVisible ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-[27rem] bg-white p-5 rounded-md border border-neutral-200 shadow-full"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back!</h1>
          <X onClick={handleCloseModal} className="cursor-pointer" />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex flex-col mt-4">
                <label
                  className=" font-semibold text-neutral-800 py-0.5"
                  htmlFor="email"
                >
                  Email/Cheatmeal ID
                </label>
                <input
                  className="w-full border border-zinc-400 rounded-md px-2 py-1.5"
                  name="email"
                  id="email"
                  value={inputData.email}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="Email or Cheatmeal ID"
                />
                <p className="text-xs font-semibold text-red-600">{error.email}</p>
              </div>

              <div className="pt-2">
                <label
                  className="font-semibold text-neutral-800 py-0.5"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full border border-zinc-400 rounded-md px-2 py-1.5"
                  name="password"
                  id="password"
                  value={inputData.password}
                  onChange={changeEventHandler}
                  type="password"
                  placeholder="Password"
                />
                <p className="text-xs font-semibold text-red-600">{error.password}</p>
              </div>

              <div className="py-1.5 flex gap-1">
                <p className="text-sm font-semibold text-neutral-800">
                  Forgot password?
                </p>
                <Link
                  className="font-semibold text-blue-500 underline"
                  to={"/forgot-password"}
                >
                  reset here...
                </Link>
              </div>
            </div>

            <div className="py-3">
              <button
                type="submit"
                className="w-full py-1.5 border border-neutral-300 rounded-md font-semibold bg-violet-500 hover:bg-violet-400 text-white transition-all duration-200"
              >
                Login
              </button>
            </div>

            <div className="py-1.5 flex gap-1">
              <p className="text-sm font-semibold text-neutral-800">
                Don't have an account?
              </p>
              <Link
                className="text-sm font-semibold text-blue-500 underline"
                to={"/sign-up"}
              >
                create one!
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
