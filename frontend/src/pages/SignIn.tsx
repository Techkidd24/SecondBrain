import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../icons/User";
import { Password } from "../icons/Password";

export function SignIn() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            })
            if (response.data.token) {
                const jwt = response.data.token;
                localStorage.removeItem("token");
                localStorage.setItem("token", jwt)
                navigate("/dashboard")
            } else {
                alert("Login failed: No token received.")
            }
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                // If the error is from Axios and the response contains an error
                alert(e.response.data.message || "Login failed. Please try again.");
            } else {
                // Catch all for unexpected errors
                alert("An unexpected error occurred. Please try again.");
            }
        }
    }
    return (
        <div className="bg-gray-200 h-screen w-screen flex justify-center items-center" >
            <div className="bg-white rounded-xl border min-w-48 p-8">
                Log in to your account
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                        <User/>
                    </div>
                    <input ref={usernameRef} className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Username" type="text" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            passwordRef.current?.focus();
                        }
                    }} />
                </div>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                        <Password/>
                    </div>
                    <input ref={passwordRef} className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Password" type="password" onKeyDown={(e) => e.key === "Enter" && signin()} />
                </div>
                <div className="flex justify-center pt-4">
                    <Button onClick={signin} variant="primary" text="Log in" fullWidth={true} />
                </div>
            </div>
        </div>
    )
}
