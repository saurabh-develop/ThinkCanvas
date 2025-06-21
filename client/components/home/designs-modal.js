"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Sparkles } from "lucide-react";
import DesignList from "./design-list";

function DesignModal({
  isOpen,
  onClose,
  userDesigns,
  setShowDesignsModal,
  userDesignsLoading,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[1400px] h-[600px] p-0 gap-0 overflow-auto
        bg-white/10 backdrop-blur-lg border border-white/10 text-white shadow-xl rounded-2xl"
      >
        <div className="flex flex-col">
          <div className="p-6 border-b border-white/10">
            <DialogTitle className="text-2xl font-bold mb-2 flex items-center text-white">
              <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
              All Designs
            </DialogTitle>
            <p className="text-sm text-white/70">
              Manage or open your past creations
            </p>
          </div>
          <DesignList
            setShowDesignsModal={setShowDesignsModal}
            isModalView={true}
            listOfDesigns={userDesigns}
            isLoading={userDesignsLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DesignModal;
