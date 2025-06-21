"use client";

import { useRouter } from "next/navigation";
import DesignPreview from "./design-preview";
import { Loader, Trash2 } from "lucide-react";
import { deleteDesign, getUserDesigns } from "@/services/design-service";
import { useEditorStore } from "@/store";

function DesignList({
  listOfDesigns,
  isLoading,
  isModalView,
  setShowDesignsModal,
}) {
  const router = useRouter();
  const { setUserDesigns } = useEditorStore();

  async function fetchUserDesigns() {
    const result = await getUserDesigns();
    if (result?.success) setUserDesigns(result?.data);
  }

  const handleDeleteDesign = async (getCurrentDesignId) => {
    const response = await deleteDesign(getCurrentDesignId);
    if (response.success) {
      fetchUserDesigns();
    }
  };

  if (isLoading) return <Loader className="animate-spin text-white" />;

  return (
    <div
      className={`${
        isModalView ? "p-4" : ""
      } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
    >
      {!listOfDesigns.length && (
        <h1 className="text-white/70 text-center col-span-full">
          No Designs Found!
        </h1>
      )}
      {listOfDesigns.map((design) => (
        <div key={design._id} className="group cursor-pointer">
          <div
            onClick={() => {
              router.push(`/editor/${design?._id}`);
              isModalView ? setShowDesignsModal(false) : null;
            }}
            className="w-[300px] h-[300px] rounded-xl overflow-hidden transition-all duration-300 border border-white/10 bg-white/5 backdrop-blur-md shadow-md group-hover:shadow-purple-500/30"
          >
            {design?.canvasData && (
              <DesignPreview key={design._id} design={design} />
            )}
          </div>
          <div className="flex justify-between items-center mt-2 px-1">
            <p className="font-medium text-sm text-white truncate max-w-[250px]">
              {design.name}
            </p>
            <Trash2
              onClick={() => handleDeleteDesign(design?._id)}
              className="w-5 h-5 text-red-400 hover:text-red-500 transition"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DesignList;
