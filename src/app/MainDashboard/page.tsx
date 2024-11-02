import React from "react";
import Navbar from "../Navbar/page";
import MiddlePart from "../../components/dashbord/MiddlePart";
// import Home from "@/components/dashbord/listProduct";
import ListProduct from "@/components/dashbord/listProduct";

function page() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <MiddlePart></MiddlePart>
      </div>
      <div>
        <ListProduct></ListProduct>
      </div>
    </div>
  );
}

export default page;
