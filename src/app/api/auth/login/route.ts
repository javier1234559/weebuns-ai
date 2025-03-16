import authApi from "@/feature/auth/services/authApi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const data = await authApi.login({ email, password });

    if (!data || !data.access_token) {
      return NextResponse.json(
        { error: "Login failed" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(data, { status: 200 });

    // Set cookie
    response.cookies.set('accessToken', data.access_token, {
      httpOnly: true,
      path: '/',
    });

    return response;

  } catch (error) {
    if (
      error instanceof Error &&
      "type" in error &&
      error.type === "CredentialsSignin"
    ) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}