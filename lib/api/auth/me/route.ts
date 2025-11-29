// app/api/auth/me/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const backend = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!backend) throw new Error("NEXT_PUBLIC_API_BASE_URL not set");

    // Forward incoming Cookie header to backend so it can read the auth cookie
    const cookieHeader = req.headers.get("cookie") ?? "";

    const res = await fetch(`${backend}/me`, {
      method: "GET",
      headers: {
        // forward cookie so backend can validate session
        cookie: cookieHeader,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(result, { status: res.status });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Me error:", err);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
