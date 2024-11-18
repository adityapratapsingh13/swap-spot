// "use client";

// import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import bg1 from "@/assets/bg2.jpg";
// import bg2 from "@/assets/bg.png";

// const MiddlePart = () => {
//   const router = useRouter();

//   const navigateToListProduct = () => {
//     // console.log("Button clicked, navigating to Dashboard");
//     router.push("/products");
//   };

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Seller Section */}
//         <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center">
//           <div className="w-full p-6 md:w-1/2">
//             <h2 className="text-3xl font-bold mb-4 text-gray-800">
//               Sell Your Products Within College
//             </h2>
//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Transform your unused items into cash by listing them easily
//               within your college community. Connect with potential buyers right
//               on campus.
//             </p>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={navigateToListProduct} // Set onClick to navigate
//                 className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
//               >
//                 List Your Product
//               </button>
//               <span className="text-gray-500 text-sm">
//                 It{"'"}s quick and easy!
//               </span>
//             </div>
//           </div>
//           <div className="hidden md:block w-1/2 relative h-80">
//             <Image
//               src={bg1}
//               alt="Seller illustration"
//               fill
//               className="object-cover w-auto h-auto"
//               priority
//             />
//           </div>
//         </div>

//         {/* Buyer Section */}
//         <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center">
//           <div className="hidden md:block w-1/2 relative h-80">
//             <Image
//               src={bg2}
//               alt="Buyer illustration"
//               fill
//               className="object-cover w-auto h-auto"
//               priority
//             />
//           </div>

//           <div className="w-full p-6 md:w-1/2 text-right">
//             <h2 className="text-3xl font-bold mb-4 text-gray-800">
//               Buy from Your Peers
//             </h2>
//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Discover great deals from fellow students. Browse unique items,
//               chat directly, and make secure transactions within your college
//               network.
//             </p>
//             <div className="flex items-center justify-end space-x-4">
//               <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md">
//                 Browse Products
//               </button>
//               <span className="text-gray-500 text-sm">No commission fees!</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MiddlePart;

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import bg1 from "@/assets/bg2.jpg";
import bg2 from "@/assets/bg.png";

const MiddlePart = () => {
  const router = useRouter();

  const navigateToListProduct = () => {
    router.push("/products");
  };

  const scrollToSection = (sectionId: string | null) => {
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.4,
      },
    },
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Seller Section */}
        <motion.div
          className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center"
          variants={sectionVariants}
        >
          <div className="w-full p-6 md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Sell Your Products Within College
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Transform your unused items into cash by listing them easily
              within your college community. Connect with potential buyers right
              on campus.
            </p>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={navigateToListProduct}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                List Your Product
              </motion.button>
              <span className="text-gray-500 text-sm">
              It{"'"}s quick and easy!
              </span>
            </div>
          </div>
          <div className="hidden md:block w-1/2 relative h-80">
            <Image
              src={bg1}
              alt="Seller illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Buyer Section */}
        <motion.div
          className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row items-center"
          variants={sectionVariants}
        >
          <div className="hidden md:block w-1/2 relative h-80">
            <Image
              src={bg2}
              alt="Buyer illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="w-full p-6 md:w-1/2 text-right">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Buy from Your Peers
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover great deals from fellow students. Browse unique items,
              chat directly, and make secure transactions within your college
              network.
            </p>
            <div
              className="flex items-center justify-end space-x-4"
              onClick={() => scrollToSection("middle")}
            >
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md">
                Browse Products
              </button>

              <span className="text-gray-500 text-sm">No commission fees!</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MiddlePart;
