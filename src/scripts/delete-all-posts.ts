/**
 * Delete ALL deepDivePost documents from Sanity.
 * Usage: npx tsx src/scripts/delete-all-posts.ts
 */

import "dotenv/config";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function deleteAllPosts() {
  console.log("\n🗑️  Fetching all deepDivePost documents...\n");

  const posts = await sanity.fetch<{ _id: string; titleHindi?: string; titleEnglish?: string }[]>(
    `*[_type == "deepDivePost"]{ _id, titleHindi, titleEnglish }`
  );

  if (posts.length === 0) {
    console.log("No posts found. Nothing to delete.");
    return;
  }

  console.log(`Found ${posts.length} posts. Deleting...\n`);

  for (const post of posts) {
    try {
      await sanity.delete(post._id);
      console.log(`  ✓ Deleted: ${post.titleEnglish || post.titleHindi || post._id}`);
    } catch (err) {
      console.error(`  ✗ Failed to delete ${post._id}:`, (err as Error).message);
    }
  }

  console.log(`\n✅ Done. Deleted ${posts.length} posts from Sanity.\n`);
}

deleteAllPosts().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
