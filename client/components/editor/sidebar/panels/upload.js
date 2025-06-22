"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addImageToCanvas } from "@/fabric/fabric-utils";
import { fetchWithAuth } from "@/services/base-service";
import { uploadFileWithAuth } from "@/services/upload-service";
import { useEditorStore } from "@/store";
import { Loader2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

function UploadPanel() {
  const { canvas } = useEditorStore();
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userUploads, setUserUploads] = useState([]);
  const { data: session, status } = useSession();

  const fetchUserUploads = useCallback(async () => {
    if (status !== "authenticated" || !session?.idToken) return;

    try {
      setIsLoading(true);
      const data = await fetchWithAuth("/v1/media/get");
      setUserUploads(data?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [status, session?.idToken]);

  useEffect(() => {
    if (status === "authenticated") fetchUserUploads();
  }, [status, fetchUserUploads]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setIsUploading(true);

    try {
      const result = await uploadFileWithAuth(file);
      setUserUploads((prev) => [result?.data, ...prev]);
    } catch (e) {
      console.error("Error while uploading the file");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleAddImage = (imageUrl) => {
    if (!canvas) return;
    addImageToCanvas(canvas, imageUrl);
  };

  return (
    <div className="h-full overflow-y-auto p-4 rounded-2xl bg-[#1e1e2f]/80 backdrop-blur-xl border border-white/10 text-white space-y-6 shadow-lg">
      <Label
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 
          ${
            isUploading
              ? "bg-[#8b3dff]/50 cursor-not-allowed"
              : "bg-[#8b3dff] hover:bg-[#9c50ff] cursor-pointer"
          } text-white rounded-md font-medium transition-all`}
      >
        <Upload className="w-5 h-5" />
        <span>{isUploading ? "Uploading..." : "Upload Files"}</span>
        <Input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </Label>

      <div className="mt-2">
        <h4 className="text-sm text-white/80 mb-4 font-medium">Your Uploads</h4>

        {isLoading ? (
          <div className="border border-white/10 bg-white/5 p-6 flex rounded-md items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-white/70" />
            <p className="font-semibold text-sm text-white/70">
              Loading your uploads...
            </p>
          </div>
        ) : userUploads.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {userUploads.map((imageData) => (
              <div
                key={imageData._id}
                className="aspect-square bg-white/10 border border-white/10 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
                onClick={() => handleAddImage(imageData.url)}
              >
                <img
                  src={imageData.url}
                  alt={imageData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-white/60">No uploads yet.</div>
        )}
      </div>
    </div>
  );
}

export default UploadPanel;
