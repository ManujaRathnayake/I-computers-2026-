import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/loadinganimation";
import api from "../utils/api";
import uploadMedia from "../mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imagefile, setImagefile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoadingpassword, setIsLoadingpassword] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUser(response.data);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    async function handleUpdateProfile() {
        setIsLoadingProfile(true);

        const token = localStorage.getItem("token");
        let image = user.image;

        try {
            if (imagefile) {
                image = await uploadMedia(imagefile);
            }

            const response = await api.put(
                "/users/",
                {
                    firstName: firstName,
                    lastName: lastName,
                    image: image
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            toast.success("Profile updated successfully!");
            window.location.reload();

        } catch (error) {
            console.error("Error updating profile:", error);

            toast.error(
                error.response?.data?.message ||
                "Error updating profile!"
            );

            setIsLoadingProfile(false);
        }
    }

    async function updatePassword() {
        if (!password || !confirmPassword) {
            toast.error("Please fill in both password fields!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoadingpassword(true);

        const token = localStorage.getItem("token");

        try {
            await api.put(
                "/users/password",
                {
                    newPassword: password
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Password updated successfully!");

            setPassword("");
            setConfirmPassword("");

            navigate("/login");

        } catch (error) {
            console.error("Error updating password:", error);

            toast.error(
                error.response?.data?.message ||
                "Error updating password!"
            );

            setIsLoadingpassword(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 md:p-8 text-slate-800">

            {user ? (
                <div className="w-full max-w-5xl">

                    {/* Page Header */}
                    <div className="mb-8 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-2">
                            Account Management
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Account Settings
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Manage your personal information and account security.
                        </p>
                    </div>

                    {/* Settings Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Basic Information Card */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-6 md:p-8 shadow-xl shadow-blue-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

                            <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                            <div className="mb-7 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl shadow-sm">
                                    👤
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">
                                        Basic Information
                                    </h1>

                                    <p className="text-sm text-slate-500">
                                        Update your personal details.
                                    </p>
                                </div>
                            </div>

                            {/* Current Profile */}
                            <div className="mb-6 flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-md">

                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`
                                    )}
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-800">
                                        {firstName} {lastName}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Your account profile
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">

                                <div>
                                    <label
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                        htmlFor="firstName"
                                    >
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                        htmlFor="lastName"
                                    >
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                        htmlFor="imagefile"
                                    >
                                        Profile Image
                                    </label>

                                    <input
                                        type="file"
                                        id="imagefile"
                                        accept="image/*"
                                        onChange={(e) => setImagefile(e.target.files[0])}
                                        className="w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-500 transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-blue-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:border-blue-400 hover:bg-blue-50 focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleUpdateProfile}
                                    disabled={isLoadingProfile}
                                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isLoadingProfile
                                        ? "Updating..."
                                        : "Save Profile Changes"}
                                </button>

                            </div>
                        </div>

                        {/* Change Password Card */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-6 md:p-8 shadow-xl shadow-blue-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

                            <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-violet-500 to-purple-600"></div>

                            <div className="mb-7 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-xl shadow-sm">
                                    🔒
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold text-slate-900">
                                        Change Password
                                    </h1>

                                    <p className="text-sm text-slate-500">
                                        Keep your account secure.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 mb-6">
                                <p className="text-sm text-amber-800">
                                    🔐 Choose a strong password that you don't use on other websites.
                                </p>
                            </div>

                            <div className="space-y-5">

                                <div>
                                    <label
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                        htmlFor="password"
                                    >
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your new password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                        htmlFor="confirmPassword"
                                    >
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your new password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                                    />
                                </div>

                                <div className="pt-3">
                                    <button
                                        type="button"
                                        onClick={updatePassword}
                                        disabled={isLoadingpassword}
                                        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isLoadingpassword
                                            ? "Updating..."
                                            : "Change Password"}
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-center text-xs text-slate-400">
                        Your account information is securely managed and protected.
                    </p>

                </div>
            ) : (
                <LoadingAnimation />
            )}

        </div>
    );
}