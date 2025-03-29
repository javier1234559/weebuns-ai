import { globalConfig } from "@/config";
import { getTokenCookie } from "@/feature/auth/lib/getTokenCookie";

export async function serverFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getTokenCookie();

  const response = await fetch(`${globalConfig.API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  // Log đầy đủ response để debug
  console.log("Status:", response.status);
  console.log("Status Text:", response.statusText);
  console.log("Headers:", response.headers);

  const data = await response.json();
  // console.log("Response data:", data);

  if (!response.ok) {
    throw {
      message: data.message || "Something went wrong",
      error: data.error,
      statusCode: response.status,
    };
  }

  return data;
}
