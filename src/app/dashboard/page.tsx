import React from "react";
import Navbar from "../Navbar/page";
import MiddlePart from "@/components/dashboard/MiddlePart";
import ListProduct from "@/components/dashboard/listProduct";

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
