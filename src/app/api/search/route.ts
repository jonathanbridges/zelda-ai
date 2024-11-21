import { Category } from "@/enums";
import { CompendiumCollection, CompendiumCollectionType } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import weaviate, {
	FilterValue,
	GenerativeReturn,
	WeaviateClient
} from "weaviate-client";

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string;
const openaiKey = process.env.OPENAI_API_KEY as string;

const searchCompendium = async (
	query: string = "",
	limit: number = 10,
	offset: number = 0,
	category: Category | null = null
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
	const collection = client.collections.get("BotWCompendium");

	let filter: FilterValue | null = null;
	if (!!category) {
		filter = collection.filter.byProperty("category").like(category);
	}

	const generativeResult = await collection.generate.nearText(
		query,
		{
			groupedTask: `Broadly describe the group of objects in 1-2 sentences. Don't list every item in the group, but rather describe the group as a whole, and tie it in to the query if you can: 
                {name} - {description}
                {_exists_: attack ? 'Attack: ' + {attack} : ''}
                {_exists_: defense ? 'Defense: ' + {defense} : ''}
                {_exists_: heartsRecovered ? 'Hearts Recovered: ' + {heartsRecovered} : ''}
                {_exists_: cookingEffect ? 'Cooking Effect: ' + {cookingEffect} : ''}
                {_exists_: edible ? 'Edible: ' + {edible} : ''}`,
			groupedProperties: [
				"name",
				"description",
				"category",
				"attack",
				"defense",
				"heartsRecovered",
				"cookingEffect",
				"edible"
			]
		},
		{
			limit: limit,
			offset: offset,
			...(!!filter && { filters: filter })
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
	const category = searchParams.get("category") as Category | null;

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
				offset ? parseInt(offset) : 0,
				category ? category : null
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
