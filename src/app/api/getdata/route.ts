// api/getData/route.ts

import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ msg: "Hello" });
}
