import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: NextRequest): Promise<Response | ImageResponse> {
  try {
    const { searchParams } = new URL(req.url);

    const width = searchParams.has("width")
      ? parseInt(searchParams.get("width") ?? "0")
      : 1200;
    const height = searchParams.has("height")
      ? parseInt(searchParams.get("height") ?? "0")
      : 630;
    const title = searchParams.has("title")
      ? searchParams.get("title")
      : "Loremipsumdolorsitamet";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            fontSize: 72,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          <div
            style={{
              margin: "10vw",
              textWrap: "balance",
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        debug: false,
        width: width,
        height: height,
      },
    );
  } catch (e) {
    if (!(e instanceof Error)) throw e;

    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
