import authApi from "@/feature/auth/services/authApi";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await authApi.logout();
    cookies().delete("accessToken");

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Internal server error",
      },
      { status: error.status || 500 },
    );
  }
}
