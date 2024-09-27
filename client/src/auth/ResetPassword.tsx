import { Lock, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";


const ResetPassword = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    const [newPassword, setNewPassword] = useState("")

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => navigate('/'), 300);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

    }

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
                    <h1 className="text-2xl font-bold text-neutral-900">
                        Reset Your password
                    </h1>
                    <X onClick={closeModal} className="cursor-pointer" />
                </div>
                <div className="pt-7">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="pb-1 relative">
                                <label
                                    className="font-semibold text-neutral-800"
                                    htmlFor="email"
                                >
                                    Create new password
                                </label>
                                <input
                                    className="w-full border border-zinc-400 rounded-md px-2 pl-10 py-1.5"
                                    name="password"
                                    id="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    type="password"
                                    placeholder="Enter new password"
                                />
                                <Lock className="absolute inset-y-[1.9rem] left-2 text-neutral-600 text-[1rem] pointer-events-none"  />
                                <p className="text-xs font-semibold text-red-600"></p>
                            </div>
                        </div>
                        <div className="py-5 pt-9">
                            <button type="submit" className="w-full py-1.5 border border-neutral-300 rounded-md font-semibold bg-violet-500 hover:bg-violet-600 text-white transition-all duration-200">
                                Reset
                            </button>
                        </div>
                        <div className="py-1.5 flex gap-1">
                            <p className="text-sm font-semibold text-neutral-800">
                                Back to
                            </p>
                            <Link
                                className="text-sm font-semibold text-blue-500 underline"
                                to={"/login"}
                            >
                                login
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ResetPassword;
