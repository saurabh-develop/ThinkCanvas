"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addImageToCanvas } from "@/fabric/fabric-utils";
import { fetchWithAuth } from "@/services/base-service";
import { uploadFileWithAuth } from "@/services/upload-service";
import { useEditorStore } from "@/store";
import { CloudOff, Loader2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useId, useState } from "react";

function UploadPanel() {
  const { canvas } = useEditorStore();
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userUploads, setUserUploads] = useState([]);
  const { data: session, status } = useSession();
  const inputId = useId();

  const fetchUserUploads = useCallback(async () => {
    if (status !== "authenticated" || !session?.idToken) return;

    try {
      setIsLoading(true);
      const data = await fetchWithAuth("/v1/media/get");
      setUserUploads(data?.data || []);
    } catch (e) {
      console.error("Failed to fetch user uploads:", e);
    } finally {
      setIsLoading(false);
    }
  }, [status, session?.idToken]);

  useEffect(() => {
    if (status === "authenticated") fetchUserUploads();
  }, [status, fetchUserUploads]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const result = await uploadFileWithAuth(file);
      if (result?.data) {
        setUserUploads((prev) => [result.data, ...prev]);
      }
    } catch (e) {
      console.error("Error while uploading the file:", e);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleAddImage = (imageUrl) => {
    if (!canvas || !imageUrl) return;
    addImageToCanvas(canvas, imageUrl);
  };

  return (
    <div className="h-full overflow-y-auto p-4 rounded-2xl bg-[#1e1e2f]/80 backdrop-blur-xl border border-white/10 text-white space-y-6 shadow-lg">
      <Label
        htmlFor={inputId}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all ${
          isUploading
            ? "bg-[#8b3dff]/50 cursor-not-allowed"
            : "bg-[#8b3dff] hover:bg-[#9c50ff] cursor-pointer"
        }`}
      >
        <Upload className="w-5 h-5" />
        <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
        <Input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {userUploads.map((img) => (
              <div
                key={img._id}
                className="aspect-square bg-white/10 border border-white/10 rounded-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
                onClick={() => handleAddImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.name || "Uploaded image"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-sm text-white/60 py-6 border border-white/10 rounded-md bg-white/5 gap-2">
            <CloudOff className="w-6 h-6 text-white/50" />
            <p>No uploads yet. Upload an image to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPanel;
