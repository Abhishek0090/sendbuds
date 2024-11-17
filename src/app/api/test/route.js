import { NextResponse } from "next/server";

export const GET = () => {
  try {
    return NextResponse.json({ message: "API WORKING" });
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
};
