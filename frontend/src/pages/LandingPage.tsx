import { Link } from "../icons/Link";
import { Note } from "../icons/Note";
import { Secure } from "../icons/Secure";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../icons/SignUp";
import { AddNotes } from "../icons/AddNotes";
import { CrossDevice } from "../icons/CrossDevice";
import { Hero } from "../icons/Hero";

export function LandingPage() {
    const navigate = useNavigate();

    return <div>
        <div className="bg-gradient-to-br from-purple-100 via-indigo-100 to-white ">
            <div className="flex justify-between top-0 left-0 h-20 text-[#5147e4]">
                <div className="flex items-center">
                    <div className="pl-32 text-2xl font-bold ">
                        <button className="text-[#25267b]">Brainly.</button>
                    </div>

                    {/* <div className="pl-5">
                    Think less. Store more.
                </div> */}
                </div>
                <div className="mt-6 mr-32 font-medium">
                    <button className="px-4 py-2 mr-3 rounded-md border border-[#25267b] bg-white hover:bg-slate-100" onClick={() => { navigate("/signin") }}>Log In</button>
                    <button className="px-4 py-2 rounded-md bg-white border border-[#25267b]" onClick={() => { navigate("/signup") }}>Get Started</button>
                </div>
            </div>
            <div className="flex">
                <div>
                    <div className="pl-32 pt-20 pb-5 text-[#25267b] text-left font-medium text-7xl">Your Second Brain in the cloud.</div>
                    <div className="pl-32 text-left font-light text-2xl">
                        <div>Capture notes, ideas, or tasks in one place —</div>
                        <div>accessible anytime, anywhere.</div>
                    </div>
                    <div className="pl-32 text-left pt-3 space-x-4">
                        <button className="py-4 px-6 bg-indigo-600 text-white rounded-xl" onClick={() => { navigate("/signup") }}>Get Started</button>
                        <button className="py-4 px-6 bg-[#e0e7ff] rounded-xl border border-[#25267b]">Learn More</button>
                    </div>
                </div>
                <div className="mr-28">
                    <Hero />
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <div className="bg-white/30 backdrop-blur-xl rounded-xl shadow-lg space-y-2 pt-7 mx-4 border-gray-200 border-2 min-h-48 min-w-64">
                    <div className="flex justify-center"><Note /></div>
                    <div className="flex justify-center text-xl">
                        <span>Organized Notes</span>
                    </div>
                    <div className="ml-14 text-sm text-gray-600">
                        <li>Tag-based System</li>
                        <li>Quick Search</li>
                    </div>
                </div>

                <div className="bg-white/30 backdrop-blur-xl rounded-xl shadow-lg space-y-2 pt-7 mx-4 border-gray-200 border-2 min-h-52 min-w-64">
                    <div className="flex justify-center"><Link /></div>
                    <div className="flex justify-center text-xl">
                        <span>Sharable Thoughts</span>
                    </div>
                    <div className="ml-12 text-sm text-gray-600">
                        <li>Unique share links</li>
                        <li>Easy to revoke links</li>
                    </div>
                </div>
                <div className="bg-white/30 backdrop-blur-xl rounded-xl shadow-lg space-y-2 pt-7 mx-4 border-gray-200 border-2 min-h-48 min-w-64">
                    <div className="flex justify-center"><Secure /></div>
                    <div className="flex justify-center text-xl">
                        <span>Secure & Private</span>
                    </div>
                    <div className="ml-14 text-sm text-gray-600">
                        <li>Auth + storage</li>
                        <li>Encrypted</li>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex font-medium justify-center text-2xl my-5">How it works:</div>
                <div className=" flex items-center justify-end pr-80">
                    <div className="mx-4 px-4 py-2 rounded-lg bg-[#e0e7ff]">1</div>
                    <div>
                        <div className="text-xl">Sign Up</div>
                        <div className=" text-gray-600">Create an account</div>
                    </div>
                    <div>
                        <SignUp />
                    </div>
                </div>
                <div className="flex items-center pl-56">

                    <div>
                        <AddNotes />
                    </div>
                    <div className="mx-4 px-4 py-2 rounded-lg bg-[#e0e7ff]">2</div>
                    <div>
                        <div className="text-xl">Start Writing</div>
                        <div className="text-sm text-gray-600">Add your notes</div>
                    </div>
                </div>

                <div className="flex items-center justify-end pr-80">
                    <div className="mx-4 px-4 py-2 rounded-lg bg-[#e0e7ff]">3</div>
                    <div>
                        <div className="text-xl">Access Anywhere</div>
                        <div className="text-sm text-gray-600">Cross Device</div>
                    </div>
                    <div>
                        <CrossDevice />
                    </div>
                </div>
            </div>
            <div>
                <div className="text-center mt-5">
                    <span>©</span>
                    <span className="text-indigo-600"> 2025 </span>
                    <span>Brainly</span>
                    <span> | Privacy | Github | Contact</span>
                </div>
            </div>
        </div>
    </div>
}