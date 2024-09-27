import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<any>([]);  // Ref to keep track of the input fields

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => navigate('/'), 300);
    };

    const handleChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            setError(null);
        }

        if (value !== "" && index < 5) {
            inputRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                const newOtp = [...otp];
                newOtp[index - 1] = ""; 
                setOtp(newOtp);
                inputRef.current[index - 1]?.focus();
            }
            else {
                const newOtp = [...otp];
                newOtp[index] = ""; 
                setOtp(newOtp);
            }
        }
    };

    const handleSubmit = (e?: FormEvent) => {
        e?.preventDefault();

        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            setError("Please enter a 6-digit OTP.");
            return;
        }

        console.log("Entered OTP:", enteredOtp);
        // Add logic to verify OTP (e.g., API call)
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
                <div className="flex items-center justify-end">
                    <X onClick={closeModal} className="cursor-pointer" />
                </div>
                <div className="pt-7">
                    <form onSubmit={handleSubmit}>
                        <div className="pb-1">
                            <h1 className="text-2xl text-center font-bold text-neutral-900">
                                Verify Your Email
                            </h1>
                            <p className="font-semibold text-center text-neutral-800 py-1">
                                Enter the 6-digit code sent to your email address
                            </p>
                            <div className="flex items-center justify-center gap-5 mt-7">
                                {otp.map((digit: string, idx: number) => (
                                    <input
                                        key={idx}
                                        ref={(element) => (inputRef.current[idx] = element)}
                                        className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl border-2 font-normal md:font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        name="otp"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleChange(idx, e.target.value)
                                        }
                                        id="otp"
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(idx, e)}
                                        type="text"
                                        placeholder="_"
                                    />
                                ))}
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center py-2">{error}</p>
                        )}

                        <div className="py-5 pt-9">
                            <button
                                type="submit"
                                className="w-full py-1.5 border border-neutral-300 rounded-md font-semibold bg-violet-500 hover:bg-violet-600 text-white transition-all duration-200"
                            >
                                Verify
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

export default VerifyEmail;
