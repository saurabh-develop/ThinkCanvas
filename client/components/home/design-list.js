"use client";

import { useRouter } from "next/navigation";

import { Loader, Trash2 } from "lucide-react";

function DesignList({
  listOfDesigns,
  isLoading,
  isModalView,
  setShowDesignsModal,
}) {
  return (
    <div
      className={`${
        isModalView ? "p-4" : ""
      } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
    >
      <div key={design._id} className="group cursor-pointer">
        <div className="w-[300px] h-[300px] rounded-xl overflow-hidden transition-all duration-300 border border-white/10 bg-white/5 backdrop-blur-md shadow-md group-hover:shadow-purple-500/30"></div>
        <div className="flex justify-between items-center mt-2 px-1">
          <p className="font-medium text-sm text-white truncate max-w-[250px]">
            {design.name}
          </p>
          <Trash2 className="w-5 h-5 text-red-400 hover:text-red-500 transition" />
        </div>
      </div>
    </div>
  );
}

export default DesignList;
