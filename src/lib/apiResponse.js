import { NextResponse } from "next/server";


export function apiSuccess(data = null, message = "", status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}


export function apiError(message = "Something went wrong", status = 500, error = null) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(error ? { error } : {}),
    },
    { status }
  );
}