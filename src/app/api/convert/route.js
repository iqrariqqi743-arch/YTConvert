export async function POST(request) {
  try {
    const { url, quality = "192" } = await request.json();

    if (!url || typeof url !== "string" || !url.trim()) {
      return Response.json(
        {
          success: false,
          message: "Please enter a YouTube URL.",
        },
        { status: 400 },
      );
    }

    if (!["128", "192", "320"].includes(String(quality))) {
      return Response.json(
        {
          success: false,
          message: "Invalid MP3 quality selected.",
        },
        { status: 400 },
      );
    }

    const backendUrl = (
      process.env.CONVERTER_API_URL ||
      "https://meters-commerce-fuel-casting.trycloudflare.com/"
    ).replace(/\/+$/, "");

    console.log("Connecting to backend:", backendUrl);

    const response = await fetch(`${backendUrl}/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url.trim(),
        quality: String(quality),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      console.error("Backend error:", response.status, error);

      return Response.json(
        {
          success: false,
          message:
            error.message ||
            error.detail ||
            `Backend returned HTTP ${response.status}`,
        },
        { status: response.status },
      );
    }

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.toLowerCase().startsWith("audio/")) {
      console.error("Unexpected content type:", contentType);

      return Response.json(
        {
          success: false,
          message: "Backend did not return an audio file.",
        },
        { status: 502 },
      );
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": 'attachment; filename="ytconvert.mp3"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Conversion API error:", error);

    return Response.json(
      {
        success: false,
        message:
          error instanceof Error
            ? `Backend connection failed: ${error.message}`
            : "Cannot connect to conversion backend.",
      },
      { status: 502 },
    );
  }
}
