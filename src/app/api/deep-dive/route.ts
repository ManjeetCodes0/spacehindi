import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

function getClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  if (!projectId) return null;

  return createClient({
    projectId,
    dataset: process.env.SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}

// GET /api/deep-dive?slug=xxx — fetch single post by slug
// GET /api/deep-dive — fetch latest posts (or all for blog list)
export async function GET(req: NextRequest) {
  const client = getClient();
  if (!client) {
    return NextResponse.json(
      { error: "Sanity not configured" },
      { status: 503 }
    );
  }

  const slug = req.nextUrl.searchParams.get("slug");

  try {
    if (slug) {
      const post = await client.fetch(
        `*[_type == "deepDivePost" && slug.current == $slug][0]{
          _id, titleHindi, titleEnglish, slug,
          metaDescriptionEn, metaDescriptionHi, heroImagePrompt,
          sections[]{ _key, headingEn, headingHi, contentEn, contentHi, imagePrompt, "sectionImage": sectionImage{ asset->{ _id, url } } },
          content, contentEnglish,
          infographicFacts, infographicFactsEnglish,
          scienceCorner,
          conclusion, conclusionEnglish,
          faq[]{ _key, questionEn, questionHi, answerEn, answerHi },
          tags,
          sourceUrl, sourceName, authorName, publishedAt,
          "mainImage": mainImage{ asset->{ _id, url } }
        }`,
        { slug }
      );

      if (!post) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    // List all posts for blog page
    const posts = await client.fetch(
      `*[_type == "deepDivePost"] | order(publishedAt desc)[0...50]{
        _id, titleHindi, titleEnglish, slug,
        metaDescriptionEn, metaDescriptionHi,
        sections[]{ _key, headingEn, headingHi, contentEn, contentHi, "sectionImage": sectionImage{ asset->{ _id, url } } },
        content, contentEnglish,
        tags, sourceName, authorName, publishedAt,
        "mainImage": mainImage{ asset->{ _id, url } }
      }`
    );

    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
