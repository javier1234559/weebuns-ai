"use server";

import { cookies } from "next/headers";

export async function getTokenCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  return token?.value;
}
