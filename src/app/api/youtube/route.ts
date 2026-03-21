import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

interface VideoEntry {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");

  if (!channelId) {
    return NextResponse.json({ error: "Missing channelId" }, { status: 400 });
  }

  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch feed" }, { status: 502 });
    }

    const xml = await res.text();

    // Parse all entries from RSS (grab more than 6 since some will be Shorts)
    const allEntries: VideoEntry[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null && allEntries.length < 15) {
      const entry = match[1];
      const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || "";
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] || "";
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1] || "";

      if (videoId) {
        allEntries.push({
          id: videoId,
          title: decodeXmlEntities(title),
          thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
          publishedAt: published,
        });
      }
    }

    // Filter out Shorts by checking oEmbed dimensions
    // Shorts are vertical (height > width), regular videos are horizontal
    const filtered: VideoEntry[] = [];

    const oEmbedChecks = await Promise.allSettled(
      allEntries.map(async (entry) => {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${entry.id}&format=json`;
        const resp = await fetch(oembedUrl, { next: { revalidate: 3600 } });
        if (!resp.ok) return { entry, isShort: false };
        const data = await resp.json();
        // Shorts have height > width (vertical video)
        const isShort = data.height > data.width;
        return { entry, isShort };
      })
    );

    for (const result of oEmbedChecks) {
      if (filtered.length >= 3) break;
      if (result.status === "fulfilled" && !result.value.isShort) {
        filtered.push(result.value.entry);
      }
    }

    return NextResponse.json({ videos: filtered });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
