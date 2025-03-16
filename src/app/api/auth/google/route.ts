import authApi from "@/feature/auth/services/authApi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { credential } = body;

    if (!credential) {
      return NextResponse.json(
        { error: "Missing credential" },
        { status: 400 }
      );
    }

    const result = await authApi.loginGoogle(credential);

    if (!result) {
      return NextResponse.json(
        { error: "Login failed" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(result, { status: 200 });

    // Set cookie
    response.cookies.set('accessToken', result.access_token, {
      httpOnly: true,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}