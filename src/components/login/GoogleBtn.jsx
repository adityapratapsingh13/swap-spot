"use client";
import React from "react";
import { signIn } from "next-auth/react";
function GoogleBtn() {
    return (
        <div className="flex justify-center mb-6 lg:mb-10">
            <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="group flex items-center bg-white hover:bg-gray-50 border-2 border-purple-200 rounded-xl sm:rounded-2xl shadow-xl px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                aria-label="Continue with Google"
            >
                <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 group-hover:animate-spin"
                    viewBox="-0.5 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" fillRule="evenodd">
                        <path
                            d="M9.827 24c0-1.524.253-2.986.705-4.357L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.867 7.261 2.406 10.388l7.904-6.051c-.448-1.365-.698-2.821-.698-4.337z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.093l6.836-6.827C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.909 6.04c1.823-5.532 7.017-9.51 13.182-9.51z"
                            fill="#EB4335"
                        />
                        <path
                            d="M23.714 37.867c-6.164 0-11.359-3.978-13.182-9.51L2.623 34.395c3.822 7.761 11.804 13.072 21.091 13.072 5.732 0 11.204-2.035 15.311-5.849l-7.507-5.804c-2.118 1.335-4.785 2.053-7.804 2.053z"
                            fill="#34A853"
                        />
                        <path
                            d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714v9.067h12.604c-.63 3.092-2.346 5.469-4.8 7.016l7.507 5.804c4.314-4.004 7.12-9.969 7.12-16.62z"
                            fill="#4285F4"
                        />
                    </g>
                </svg>
                <span>Continue with Google</span>
            </button>
        </div>
    );
}

export default GoogleBtn;
