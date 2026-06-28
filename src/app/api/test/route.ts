import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ data: "hello , tesing next server api", })
}