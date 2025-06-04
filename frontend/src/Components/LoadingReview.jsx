import React, { useEffect, useState } from "react";

export default function LoadingReview() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white font-mont rounded-xl shadow-md px-6 py-4 text-lg font-medium text-gray-800">
        Reviewing..
      </div>
    </div>
  );
}
