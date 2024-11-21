import { Category, URLParams } from "@/enums";
import { CompendiumCollectionType, ITEMS_PER_PAGE } from "@/types";
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

	const { totalCount } = await collection.aggregate.nearText(query, {
		...(!!filter && { filters: filter }),
		objectLimit: 1000
	});

	const groupedTask = `Broadly describe the group of objects in 1-2 sentences and answer the query if it's a question. Don't list every item in the group, but rather describe the group as a whole: 
                {name} - {description}
                {_exists_: attack ? 'Attack: ' + {attack} : ''}
                {_exists_: defense ? 'Defense: ' + {defense} : ''}
                {_exists_: heartsRecovered ? 'Hearts Recovered: ' + {heartsRecovered} : ''}
                {_exists_: cookingEffect ? 'Cooking Effect: ' + {cookingEffect} : ''}
                {_exists_: edible ? 'Edible: ' + {edible} : ''}`;
	const groupedProperties = [
		"name",
		"description",
		"attack",
		"defense",
		"heartsRecovered",
		"cookingEffect",
		"edible"
	];

	const generativeResult = await collection.generate.nearText(
		query,
		{
			groupedTask,
			groupedProperties
		},
		{
			limit: ITEMS_PER_PAGE,
			offset: offset,
			...(!!filter && { filters: filter })
		}
	);
	return { ...generativeResult, totalCount };
};

export async function GET(request: NextRequest) {
	const url = new URL(
		request.url,
		process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
	);
	const searchParams = url.searchParams;

	const query = searchParams.get(URLParams.QUERY);
	const page = Math.max(1, Number(searchParams.get(URLParams.PAGE)) || 1);
	const category = searchParams.get(URLParams.CATEGORY) as Category | null;

	// Calculate offset from page
	const limit = ITEMS_PER_PAGE;
	const offset = (page - 1) * limit;

	if (!query) {
		return NextResponse.json(
			{ error: "Query parameter 'query' is required" },
			{ status: 400 }
		);
	}

	try {
		const results: GenerativeReturn<CompendiumCollectionType> =
			await searchCompendium(query, offset, category ? category : null);

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
