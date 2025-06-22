import axios from "axios";
import { getSession } from "next-auth/react";
import { fetchWithAuth } from "./base-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Upload a file with authentication via FormData.
 *
 * @param {File} file - The file to be uploaded.
 * @param {Object} metaData - Additional metadata to send along with the file.
 * @returns {Promise<Object>} - The response from the server.
 * @throws {Error} - If not authenticated or upload fails.
 */
export async function uploadFileWithAuth(file, metaData = {}) {
  const session = await getSession();

  if (!session?.idToken) {
    throw new Error("Not authenticated");
  }

  const formData = new FormData();
  formData.append("file", file);

  for (const [key, value] of Object.entries(metaData)) {
    formData.append(key, value);
  }

  try {
    const response = await axios.post(`${API_URL}/v1/media/upload`, formData, {
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("File upload failed:", error);
    throw new Error("Upload Failed");
  }
}

/**
 * Generate an image from AI using a text prompt.
 *
 * @param {string} prompt - The text description for image generation.
 * @returns {Promise<Object>} - The generated image data or URL.
 * @throws {Error} - If the request fails.
 */
export async function generateImageFromAI(prompt) {
  try {
    const response = await fetchWithAuth("/v1/media/ai-image-generate", {
      method: "POST",
      body: { prompt },
    });

    return response;
  } catch (error) {
    console.error("AI image generation failed:", error);
    throw new Error(error.message || "AI generation failed");
  }
}
