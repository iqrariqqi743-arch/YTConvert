export async function POST(request) {
  try {
    const { url, quality = "192" } = await request.json();

    // Validate URL
    if (!url || typeof url !== "string" || !url.trim()) {
      return Response.json(
        {
          success: false,
          message: "Please enter a YouTube URL.",
        },
        { status: 400 },
      );
    }

    // Validate audio quality
    if (!["128", "192", "320"].includes(quality)) {
      return Response.json(
        {
          success: false,
          message: "Invalid MP3 quality selected.",
        },
        { status: 400 },
      );
    }

    // Python FastAPI backend
    const backendUrl = (
      process.env.CONVERTER_API_URL || "http://127.0.0.1:8000"
    ).replace(/\/$/, "");

    // Send request to Python backend
    const response = await fetch(`${backendUrl}/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url.trim(),
        quality,
      }),
      cache: "no-store",
    });

    // Handle backend errors
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      return Response.json(
        {
          success: false,
          message: error.detail || "MP3 conversion failed.",
        },
        { status: response.status },
      );
    }

    // Return MP3 file
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.startsWith("audio/")) {
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
        message: "Cannot connect to conversion backend.",
      },
      { status: 502 },
    );
  }
}
