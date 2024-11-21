import { Category } from "@/enums";
import { NextRequest, NextResponse } from "next/server";
import weaviate, { FilterValue, WeaviateClient } from "weaviate-client";

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string;
const openaiKey = process.env.OPENAI_API_KEY as string;

// Helper to check if a category is valid
function isValidCategory(category: string): category is Category {
	return Object.values(Category).includes(category as Category);
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	let category = searchParams.get("category") as Category | null;
	const limit = parseInt(searchParams.get("limit") || "20");
	const offset = parseInt(searchParams.get("offset") || "0");

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
		const result = await collection.query.fetchObjects({
			limit,
			offset,
			...(!!filter && { filters: filter })
		});

		return NextResponse.json({
			objects: result.objects
		});
	} catch (error) {
		console.error("Error fetching compendium data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch compendium data" },
			{ status: 500 }
		);
	}
}
