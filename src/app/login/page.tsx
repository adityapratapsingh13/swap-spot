"use client";
import React from "react";
import Image from "next/image";
import front from "@/assets/front_image.png";
import GoogleBtn from "../../components/login/GoogleBtn";

const LoginPage = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 sm:w-64 h-32 sm:h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="w-full max-w-7xl min-h-[40rem] flex flex-col lg:flex-row overflow-hidden rounded-2xl backdrop-blur-sm bg-white/10 shadow-2xl relative">
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative z-10">
            <div className="mb-8 lg:mb-12 text-center floating">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl  font-bold name"
                style={{
                  fontFamily: "'Courier New', monospace",
                }}
              >
                SWAP SPOT
              </h1>
            </div>

            <div className="text-center mb-6 lg:mb-10">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
                Welcome back!
                <span className="inline-block animate-bounce ml-2">👋</span>
              </h2>
              <p className="text-gray-200 mb-4 text-base sm:text-lg">
                Please login with Google for Swap_Spot
              </p>
            </div>

            <GoogleBtn></GoogleBtn>

            <div className="text-center px-4 sm:px-8">
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed backdrop-blur-sm bg-white/5 p-4 sm:p-6 rounded-xl shadow-lg">
                Got something you no longer need? Whether it{"'"}s an old
                gadget, furniture, or anything in between, we make it easy to
                sell your pre-loved items. Turn your unwanted stuff into extra
                cash—quick, safe, and simple. Post your items today and connect
                with buyers who are ready to give them a new home!
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-0 m-4">
            <div className="absolute inset-0 rounded-tl-[40px] sm:rounded-tl-[80px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[90px] sm:rounded-bl-[180px] overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 pulsing">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mix-blend-overlay" />
              <Image
                src={front}
                alt="A visual representation of the application"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
