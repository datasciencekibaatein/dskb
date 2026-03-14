import { NextResponse } from "next/server";

export interface MediumArticle {
  guid:        string;
  title:       string;
  link:        string;
  pubDate:     string;
  thumbnail:   string;
  description: string;
  categories:  string[];
  author:      string;
}

function stripHtml(html: string, maxLength = 160): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

function extractImage(content: string): string {
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? "";
}

function extractTag(xml: string, tag: string): string {
  const escaped = tag.replace(":", "\\:");
  const re = new RegExp(
    `<${escaped}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${escaped}>`,
    "i"
  );
  return xml.match(re)?.[1]?.trim() ?? "";
}

function extractAllTags(xml: string, tag: string): string[] {
  const escaped = tag.replace(":", "\\:");
  const re = new RegExp(
    `<${escaped}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${escaped}>`,
    "gi"
  );
  const results: string[] = [];
  let match;
  while ((match = re.exec(xml)) !== null) results.push(match[1].trim());
  return results;
}

export async function GET() {
  try {
    const res = await fetch("https://medium.com/feed/@datasciencekibaatein", {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RSS reader)" },
    });

    if (!res.ok) {
      throw new Error(`RSS fetch failed with status ${res.status}`);
    }

    const xml        = await res.text();
    const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/gi) ?? [];

    const articles: MediumArticle[] = itemBlocks.map((block) => {
      const content     = extractTag(block, "content:encoded") || extractTag(block, "description");
      const description = extractTag(block, "description");
      const categories  = extractAllTags(block, "category");

      return {
        guid:        extractTag(block, "guid"),
        title:       extractTag(block, "title"),
        link:        extractTag(block, "link") || extractTag(block, "guid"),
        pubDate:     extractTag(block, "pubDate"),
        author:      extractTag(block, "dc:creator") || "datasciencekibaatein",
        thumbnail:   extractImage(content) || extractImage(description),
        description: stripHtml(description || content),
        categories,
      };
    });

    return NextResponse.json(
      { articles, count: articles.length },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("[/api/medium] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch articles", articles: [] },
      { status: 500 }
    );
  }
}