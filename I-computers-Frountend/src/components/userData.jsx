import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { CiUser } from "react-icons/ci";

export default function UserData() {
    const [user, SetUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    SetUser(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    localStorage.removeItem("token");
                    SetUser(null);
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        SetUser(null);
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-center">
            {user ? (
                <div className="flex gap-2 items-center justify-center">
                    <img
                        src={user.image}
                        alt="User"
                        className="w-[30px] h-[30px] rounded-full object-cover"
                    />

                    <select
                        defaultValue="name"
                        className="text-lg lg:flex hidden text-center font-semibold text-white bg-accent border-none outline-none cursor-pointer"
                        onChange={(e) => {
                            if (e.target.value === "option1") {
                                navigate("/my-orders");
                            } else if (e.target.value === "option2") {
                                navigate("/settings");
                            } else if (e.target.value === "option3") {
                                handleLogout();
                            }

                            e.target.value = "name";
                        }}
                    >
                        <option value="name" className="bg-secondary">
                            {user.firstName}
                        </option>

                        <option value="option1" className="bg-secondary">
                            My Orders
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
                    {/* Desktop: Login and Register buttons */}
                    <div className="hidden lg:flex gap-4">
                        <Link
                            to="/login"
                            className="text-lg font-semibold text-blue-600 hover:underline"
                        >
                            Log In
                        </Link>

                        <Link
                            to="/register"
                            className="text-lg font-semibold text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile: Login icon button */}
                    <button
                        onClick={() => navigate("/login")}
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
                        aria-label="Log in"
                    >
                        <CiUser  className="text-3xl text-white font-bold " />
                    </button>
                </>
            )}
        </div>
    );
}