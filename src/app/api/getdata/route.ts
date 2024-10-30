// api/getdata/(mydata)/route.ts
// api/getdata/route.ts

import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ msg: "Hellow" });
}
