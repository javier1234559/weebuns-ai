import authApi from "@/feature/auth/services/authApi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await authApi.login(body);

    const response = NextResponse.json(data);

    if (data.access_token) {
      response.cookies.set('accessToken', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
    }

    return response;

  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || 'Internal server error',
      },
      { status: error.status || 500 }
    );
  }
}