"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader, Trash2 } from "lucide-react";
import { deleteDesign, getUserDesigns } from "@/services/design-service";
import { useEditorStore } from "@/store";
import DesignPreview from "./design-preview";

function DesignList({
  listOfDesigns,
  isLoading,
  isModalView,
  setShowDesignsModal,
}) {
  const router = useRouter();
  const { setUserDesigns } = useEditorStore();
  const [deletingId, setDeletingId] = useState(null);

  const fetchUserDesigns = async () => {
    const result = await getUserDesigns();
    if (result?.success) setUserDesigns(result.data);
  };

  const handleDeleteDesign = async (designId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this design?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(designId);
      const response = await deleteDesign(designId);
      if (response.success) {
        await fetchUserDesigns();
      }
    } catch (error) {
      console.error("Failed to delete design:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader className="animate-spin text-white w-6 h-6" />
      </div>
    );
  }

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
        <div key={design._id} className="group relative cursor-pointer">
          <div
            onClick={() => {
              router.push(`/editor/${design._id}`);
              if (isModalView) setShowDesignsModal(false);
            }}
            className="w-[300px] h-[300px] rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-md hover:shadow-purple-500/30 transition-all duration-300"
          >
            <DesignPreview design={design} />
          </div>

          <div className="flex justify-between items-center mt-2 px-1">
            <p className="font-medium text-sm text-white truncate max-w-[250px]">
              {design.name}
            </p>

            {deletingId === design._id ? (
              <Loader className="w-4 h-4 text-red-300 animate-spin" />
            ) : (
              <Trash2
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDesign(design._id);
                }}
                className="w-5 h-5 text-red-400 hover:text-red-500 transition"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DesignList;
