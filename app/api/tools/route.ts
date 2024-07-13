import { fetchOpenSourceTools, transformData } from "../../../lib/github";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const perPage = Number(url.searchParams.get("per_page")) || 10;
  const query = "topic:opensource"; // Adjust the query as needed

  const repositories = await fetchOpenSourceTools(query, page, perPage);
  const transformedData = transformData(repositories);

  return new NextResponse(JSON.stringify(transformedData), {
    headers: { "Content-Type": "application/json" },
  });
}
