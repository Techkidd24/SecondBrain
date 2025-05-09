import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../icons/User";
import { Password } from "../icons/Password";

export function SignUp() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || username.length < 5) {
            alert("Username must be at least 5 characters long");
            return;
        }

        if (!password || password.length < 5) {
            alert("Password must be at least 5 characters long");
            return;
        }

        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            })
            alert("You have signed up!");
            navigate("/signin")
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                alert(e.response.data.message || "Sign up failed. Please try again.")
            } else {
                alert("an unexpected error occurred.")
            }
        }
    }

    return (
        <div>
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-indigo-100">
                {/* Indigo-themed Background Blobs */}
                <div className="absolute w-[60rem] h-[60rem] bg-gradient-to-br from-indigo-300 via-indigo-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob -top-80 -left-40"></div>
                <div className="absolute w-[60rem] h-[60rem] bg-gradient-to-tr from-indigo-200 via-indigo-300 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob top-80 -right-40"></div>

                <div className="z-10 bg-white shadow-2xl rounded-2xl p-8 max-w-md ">
                    <div className="font-medium text-2xl text-center pb-4">
                        Create your account
                    </div>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                            <User />
                        </div>
                        <input className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" ref={usernameRef} placeholder="Username" type="text" onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                passwordRef.current?.focus();
                            }
                        }} />
                    </div>
                    <div className="relative w-full mt-2">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                            <Password />
                        </div>
                        <input className="pl-10 w-full py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" ref={passwordRef} placeholder="Password" type="password" onKeyDown={(e) => e.key === "Enter" && signup()} />
                    </div>
                    <div className="flex justify-center pt-4 font-medium text-white">
                        <Button onClick={signup} variant="primary" text="Sign Up" fullWidth={true} />
                    </div>
                    <div className="flex justify-between pt-2">
                        <div>
                            Already a user?
                        </div>
                        <div className="text-[#5147e4]">
                            <Link to="/signin"> Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}