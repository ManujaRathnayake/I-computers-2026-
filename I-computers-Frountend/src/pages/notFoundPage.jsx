import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 px-6 overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-xl">

                {/* 404 Number */}
                <div className="relative mb-2">
                    <h1 className="text-[120px] sm:text-[180px] font-black tracking-tighter leading-none bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent select-none">
                        404
                    </h1>

                    <div className="absolute -top-3 -right-6 w-5 h-5 bg-blue-500 rounded-full animate-ping"></div>
                </div>

                {/* Error Message */}
                <div className="bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl rounded-3xl px-8 py-8 w-full">
                    
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Oops! Page Not Found
                    </h2>

                    <p className="text-gray-500 leading-relaxed mb-7">
                        The page you're looking for might have been moved, deleted,
                        or perhaps it never existed.
                    </p>

                    {/* Home Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-900 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                    >
                        <span className="text-lg">←</span>
                        Go Back Home
                    </Link>

                </div>

                {/* Small Footer Text */}
                <p className="mt-6 text-sm text-gray-400">
                    Error Code: <span className="font-semibold text-gray-500">404</span>
                </p>

            </div>
        </div>
    );
}