import { Link } from "lucide-react";
import React from "react";

function uperr_Side() {
  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <Link className="font-bold text-lg text-blue-500" href={"/"}>
        HYYYYY{" "}
      </Link>
      <button className="bg-slate-950 text-white px-6 py-2">Sign In</button>
    </div>
  );
}

export default uperr_Side;
