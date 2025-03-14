import { NextResponse } from "next/server";
import readFileContent from "@/lib/readFile";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get("file");

  if (!filePath) {
    return NextResponse.json(
      { error: "File path is required" },
      { status: 400 }
    );
  }

  const content = readFileContent(filePath);
  return NextResponse.json({ content });
}
