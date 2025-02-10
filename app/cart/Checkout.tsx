import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Checkout = ({ total }: { total: number }) => (
  <div className="checkout shadow-lg rounded-2xl bg-white p-6 w-[270px] h-[200px] md:w-[350px] md:h-[250px] flex flex-col justify-between">
    <div className="total flex flex-col items-center text-center">
      <h4 className="text-lg font-semibold text-gray-800">Total Amount</h4>
      <p className="text-3xl font-bold text-green-600 mt-2">{total} EG</p>
    </div>
    <Button className="font-normal text-xl py-6 px-6">
      <Link href="/shop" className="btn-red mx-auto w-full bg-gradient-to-r from-green-400 to-green-600 text-center py-2 rounded-lg text-lg font-medium shadow-md hover:from-green-500 hover:to-green-700 transition duration-300">
        Proceed to Checkout
      </Link>
    </Button>
  </div>
);

export default Checkout;
