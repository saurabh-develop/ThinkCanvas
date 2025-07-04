import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = (process.env.API_URL || "http://localhost:5000").replace(
  /\/$/,
  ""
);

export async function fetchWithAuth(endpoint, options = {}) {
  const session = await getSession();

  if (!session?.idToken) {
    throw new Error("Not authenticated or missing token");
  }

  const fullUrl = `${API_URL}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;
  console.log(`[fetchWithAuth] Request to: ${fullUrl}`);

  try {
    const response = await axios({
      url: fullUrl,
      method: options.method || "GET",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
      data: options.body,
      params: options.params,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `API Error: ${
        error?.response?.data?.message || error.message
      } (${endpoint})`
    );
  }
}
