import { NextRequest, NextResponse } from "next/server";
import weaviate, { WeaviateClient } from "weaviate-client";

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string;
const openaiKey = process.env.OPENAI_API_KEY as string;

export async function GET(
	_request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const itemId = parseInt(params.id, 10);

	if (isNaN(itemId)) {
		return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
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

	try {
		const collection = client.collections.get("BotWCompendium");
		const query = `itemId: ${itemId}`;

		const result = await collection.generate.nearText(
			query,
			{
				singlePrompt: `Briefly describe this item in 1-2 sentences. Keep the tone of the description jovial but change the wording from time to time:
				Name: {name}
				Description: {description}
				Category: {category}`
			},
			{
				filters: collection.filter.byProperty("itemId").equal(itemId)
			}
		);

		if (!result.objects.length) {
			return NextResponse.json({ error: "Item not found" }, { status: 404 });
		}

		return NextResponse.json(result, {
			headers: {
				"Cache-Control": "public, s-maxage=60, stale-while-revalidate=30"
			}
		});
	} catch (error) {
		console.error("Error fetching item:", error);
		return NextResponse.json(
			{ error: "Failed to fetch item" },
			{ status: 500 }
		);
	}
}
