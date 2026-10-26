import "./globals.css";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "YTConvert | YouTube to MP3 Converter",
  description:
    "Convert audio from supported YouTube videos and Shorts into MP3. Choose an output bitrate, preview audio and download authorized content.",
  applicationName: "YTConvert",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "YTConvert",
    title: "YTConvert | YouTube to MP3 Converter",
    description:
      "Convert supported YouTube video audio into MP3. Preview your audio before downloading.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "YTConvert MP3 Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YTConvert | YouTube to MP3 Converter",
    description:
      "Convert supported video audio to MP3 and preview it before downloading.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
