import { NextRequest, NextResponse } from "next/server";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export async function GET(_request: NextRequest) {
  const response = await fetch(
    `https://accounts.spotify.com/api/token/?dummy=${new Date()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
      next: { revalidate: 10 },
    }
  );

  const json_response = await response.json();

  return NextResponse.json(json_response);
}
