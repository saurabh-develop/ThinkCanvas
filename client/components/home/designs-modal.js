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
                   bg-[#1e1e2f]/80 backdrop-blur-xl border border-white/10 
                   shadow-2xl text-white rounded-2xl"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <DialogTitle className="text-2xl font-semibold flex items-center gap-2 text-white">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              All Designs
            </DialogTitle>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <DesignList
              setShowDesignsModal={setShowDesignsModal}
              isModalView={true}
              listOfDesigns={userDesigns}
              isLoading={userDesignsLoading}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DesignModal;
