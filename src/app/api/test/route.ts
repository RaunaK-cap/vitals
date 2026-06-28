import { NextRequest, NextResponse } from "next/server";
import Cerebras from '@cerebras/cerebras_cloud_sdk';

export function GET(req: NextRequest) {
    return NextResponse.json({ data: "hello , tesing next server api", })
}