import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api.js";

export default function UserData() {

    const [user, SetUser] = useState(null);
    const navigate = useNavigate();

    useEffect(
        () => {
            const token = localStorage.getItem("token");
            if (token) {
                api.get("/users/me", {
                    headers: {
                        Authorization: `Bearer ` + token
                    }
                })
                .then(response => {
                    SetUser(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
            }
        },
        []
    );

    return (
        <div className="flex items-center justify-center h-screen">
            {user ? (
                <div className="flex gap-2 items-center justify-center">
                    
                    <img src={user.image} alt="UserImage" className="w-[30px] rounded-full" />

                    {/* <span className="text-lg font-semibold text-white">Hi, {user.firstName}</span> */}

                    <select
                        className="text-lg text-center font-semibold text-white bg-accent border-none outline-none cursor-pointer"
                        onChange={(e) => {
                            if (e.target.value === "option1") {
                                navigate("/my-orders");
                            } else if (e.target.value === "option2") {
                                navigate("/settings");
                            } else if (e.target.value === "option3") {
                                // localStorage.removeItem("token");
                                // SetUser(null);
                                // navigate("/");
                                navigate("/logout");
                            }

                            e.target.value = "name"; // Reset the select value to the default option
                        }}
                    >
                        <option value="name" className="bg-secondary">
                            {user.firstName}
                        </option>
                        <option value="option1" className="bg-secondary">
                            My orders
                        </option>
                        <option value="option2" className="bg-secondary">
                            Settings
                        </option>
                        <option value="option3" className="bg-secondary">
                            Logout
                        </option>
                    </select>
                </div>
            ) : (
                <>
                    <Link to="/login" className="text-lg font-semibold text-blue-600 hover:underline">
                        Log In
                    </Link>

                    <Link to="/register" className="text-lg font-semibold text-blue-600 hover:underline">
                        Register
                    </Link>
                </>
            )}
        </div>
    );
}