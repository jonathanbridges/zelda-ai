import { CompendiumCollection, CompendiumCollectionType } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import weaviate, { GenerativeReturn, WeaviateClient } from "weaviate-client";

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string;
const openaiKey = process.env.OPENAI_API_KEY as string;

const searchCompendium = async (
	query: string,
	limit: number = 10,
	offset: number = 0
) => {
	const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
		weaviateURL,
		{
			authCredentials: new weaviate.ApiKey(weaviateKey),
			headers: {
				"X-OpenAI-Api-Key": openaiKey
			}
		}
	);
	const collection: CompendiumCollection =
		client.collections.get("BotWCompendium");

	const generativeResult = await collection.generate.nearText(
		query,
		{
			singlePrompt: "Describe this {name}. It {description}",
			groupedTask: "Summarize these items: {name} - {description}",
			groupedProperties: ["name", "description"]
		},
		{
			limit: limit,
			offset: offset
		}
	);

	return generativeResult;
};

export async function GET(request: NextRequest) {
	const url = new URL(request.url, "http://localhost:3000");
	const searchParams = url.searchParams;

	const query = searchParams.get("query");
	const limit = searchParams.get("limit");
	const offset = searchParams.get("offset");

	if (!query) {
		return NextResponse.json(
			{ error: "Query parameter 'query' is required" },
			{ status: 400 }
		);
	}

	try {
		const results: GenerativeReturn<CompendiumCollectionType> =
			await searchCompendium(
				query ? query : "cool swords",
				limit ? parseInt(limit) : 10,
				offset ? parseInt(offset) : 0
			);

		if (results instanceof Error) {
			return NextResponse.json({ error: results.message }, { status: 500 });
		}

		return NextResponse.json(results);
	} catch (error) {
		console.error("Search error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
