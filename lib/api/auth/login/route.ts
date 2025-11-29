import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const backendURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!backendURL) {
    throw new Error("Backend URL is missing in env");
  }

  // Call your backend server
  const res = await fetch(process.env.AUTH_SERVER + "/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();

  if (!res.ok) {
    return NextResponse.json(result, { status: res.status });
  }

  // Set cookie
  const response = NextResponse.json(
    { message: "Login successful" },
    { status: 200 }
  );

  response.cookies.set("accessToken", result.accessToken, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
