import { Category } from "@/enums";
import { NextRequest, NextResponse } from "next/server";
import weaviate, { FilterValue, WeaviateClient } from "weaviate-client";
import { URLParams } from "@/enums";
import { ITEMS_PER_PAGE } from "@/types";

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string;
const openaiKey = process.env.OPENAI_API_KEY as string;

function isValidCategory(category: string): category is Category {
	return Object.values(Category).includes(category as Category);
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const category = searchParams.get(URLParams.CATEGORY) as Category | null;
	const page = Math.max(1, Number(searchParams.get(URLParams.PAGE)) || 1);

	// Calculate limit and offset from page
	const limit = ITEMS_PER_PAGE;
	const offset = (page - 1) * limit;

	// Debug log
	console.log(`API Route - URL: ${request.url}`);
	console.log(`API Route - Page: ${page}, Offset: ${offset}, Limit: ${limit}`);

	// Validate category if present
	if (category && !isValidCategory(category)) {
		return NextResponse.json(
			{ error: `Invalid category: ${category}` },
			{ status: 400 }
		);
	}

	const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
		weaviateURL,
		{
			authCredentials: new weaviate.ApiKey(weaviateKey),
			headers: {
				"X-OpenAI-Api-Key": openaiKey
			}
		}
	);

	const collection = client.collections.get("BotWCompendium");

	let filter: FilterValue | null = null;
	if (category && isValidCategory(category)) {
		filter = collection.filter.byProperty("category").like(category);
	}

	try {
		const { totalCount } = await collection.aggregate.overAll({
			...(!!filter && { filters: filter })
		});

		const result = await collection.query.fetchObjects({
			limit,
			offset,
			...(!!filter && { filters: filter })
		});

		return NextResponse.json(
			{
				objects: result.objects,
				totalCount
			},
			{
				headers: {
					"Cache-Control": "public, s-maxage=60, stale-while-revalidate=30"
				}
			}
		);
	} catch (error) {
		console.error("Error fetching compendium data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch compendium data" },
			{ status: 500 }
		);
	}
}
