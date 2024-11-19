import { Category } from "@/enums";
import { APIEntryItem, CommonItemProperties } from "@/types";
import dotenv from "dotenv";
import weaviate, {
	CollectionConfigCreate,
	generative,
	vectorizer,
	WeaviateClient
} from "weaviate-client";

// Load environment variables from .env file
dotenv.config();

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string;
const openaiKey = process.env.OPENAI_API_KEY as string;

/**
 * Imports Breath of the Wild compendium data from the external API into Weaviate.
 * Fetches all entries from the BotW Compendium API, transforms the data to match
 * the collection schema, and performs a batch import into Weaviate.
 *
 * @param client - The initialized WeaviateClient instance to use for importing
 */
async function importCompendiumData(client: WeaviateClient) {
	try {
		const response = await fetch(
			"https://botw-compendium.herokuapp.com/api/v3/compendium/all"
		);
		const data = await response.json();

		const collection = client.collections.get("BotWCompendium");

		// Transform and batch import the data
		const objects = data.data.map((apiEntryItem: APIEntryItem) => {
			const {
				category,
				name,
				description,
				id,
				image,
				common_locations,
				drops,
				dlc
			} = apiEntryItem;

			const commonItemProperties: CommonItemProperties = {
				category,
				name,
				description,
				itemId: id,
				image,
				commonLocations: common_locations || [],
				drops: drops || [],
				dlc
			};

			switch (category) {
				case Category.EQUIPMENT:
					const {
						properties: { attack, defense, effect, type }
					} = apiEntryItem;
					return {
						...commonItemProperties,
						attack,
						defense,
						effect: effect || null,
						type: type || null
					};
				case Category.MATERIALS:
					const { cooking_effect, fuse_attack_power } = apiEntryItem;
					return {
						...commonItemProperties,
						heartsRecovered: apiEntryItem.hearts_recovered,
						cookingEffect: cooking_effect,
						fuseAttackPower: fuse_attack_power || null
					};
				case Category.CREATURES:
					const { edible, hearts_recovered } = apiEntryItem;
					return {
						...commonItemProperties,
						edible,
						heartsRecovered: hearts_recovered || null
					};
				case Category.TREASURE:
					return commonItemProperties;
				default:
					return commonItemProperties;
			}
		});

		// Batch import objects
		await collection.data.insertMany(objects);
		console.log("Successfully imported compendium data");
	} catch (error) {
		console.error("Error importing data:", error);
	}
}

/**
 * Configuration for creating the Breath of the Wild Compendium collection in Weaviate.
 * This defines the schema including properties, vectorization, and generative capabilities.
 *
 * The collection stores game items with properties like:
 * - Basic info (name, description, category)
 * - Game mechanics (locations, drops, DLC status)
 * - Reference data (item ID, image URL)
 *
 * Uses OpenAI for both vectorization and generative features to enable
 * semantic search and natural language interactions with the data.
 */
const compendiumClass: CollectionConfigCreate = {
	name: "BotWCompendium",
	description:
		"Breath of the Wild Compendium entries with detailed item information",
	properties: [
		{
			name: "name",
			dataType: "text",
			description: "The name of the item",
			indexFilterable: true
		},
		{
			name: "category",
			dataType: "text",
			description:
				"The category of the item (creatures, monsters, treasure, etc.)",
			indexFilterable: true,
			skipVectorization: true
		},
		{
			name: "itemId",
			dataType: "int",
			description: "The unique identifier of the item",
			indexFilterable: true
		},
		{
			name: "description",
			dataType: "text",
			description: "Detailed description of the item",
			indexSearchable: true,
			vectorizePropertyName: true
		},
		{
			name: "image",
			dataType: "text",
			description: "URL to the item image",
			indexFilterable: true
		},
		{
			name: "commonLocations",
			dataType: "text[]",
			description: "List of locations where the item can be found",
			indexFilterable: true
		},
		{
			name: "drops",
			dataType: "text[]",
			description: "Items that can be obtained from this entry",
			indexFilterable: true
		},
		{
			name: "dlc",
			dataType: "boolean",
			description: "Whether the item is from DLC content",
			indexFilterable: true
		},
		{
			name: "attack",
			dataType: "int",
			description: "Attack power of the equipment",
			indexFilterable: true
		},
		{
			name: "defense",
			dataType: "int",
			description: "Defense of the equipment",
			indexFilterable: true
		},
		{
			name: "effect",
			dataType: "text",
			description: "Effect of the equipment",
			indexFilterable: true
		},
		{
			name: "type",
			dataType: "text",
			description: "Type of the equipment",
			indexFilterable: true
		},
		{
			name: "heartsRecovered",
			dataType: "int",
			description: "Number of hearts recovered when consumed",
			indexFilterable: true
		},
		{
			name: "cookingEffect",
			dataType: "text",
			description: "Effect of the item when cooked",
			indexFilterable: true
		},
		{
			name: "fuseAttackPower",
			dataType: "int",
			description: "Attack power of the item when fused",
			indexFilterable: true
		},
		{
			name: "edible",
			dataType: "boolean",
			description: "Whether the item is edible",
			indexFilterable: true
		}
	],
	vectorizers: vectorizer.text2VecOpenAI({
		baseURL: "https://api.openai.com"
	}),
	generative: weaviate.configure.generative.openAI({
		model: "gpt-4o-mini"
	})
};
/**
 * Searches the BotW Compendium collection in Weaviate using semantic search.
 * Performs a nearText search with generative capabilities to find and describe relevant items.
 *
 * @param client - The initialized WeaviateClient instance to use for searching
 * @param query - The search query text to find relevant items
 * @param limit - Maximum number of results to return (default: 5)
 * @param offset - Number of results to skip for pagination (default: 0)
 * @returns A GenerativeReturn object containing the search results and generated descriptions
 * @throws Error if the search operation fails
 */

export async function searchCompendium(
	client: WeaviateClient,
	query: string,
	limit: number = 5,
	offset: number = 0
) {
	try {
		const collection = client.collections.get("BotWCompendium");

		const result = await collection.generate.nearText(
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
		for (const object of result.objects) {
			console.log(object.generated, object.properties);
			console.log(JSON.stringify(object.properties, null, 2));
		}
		return result;
	} catch (error) {
		console.error("Error searching compendium:", error);
		throw error;
	}
}

async function initWeaviate() {
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
		// Check if collection exists
		const exists = await client.collections.exists("BotWCompendium");

		if (!exists) {
			// Create the collection
			await client.collections.create(compendiumClass);
			console.log("Created BotWCompendium collection");

			// Import the data
			await importCompendiumData(client);
		} else {
			console.log("BotWCompendium collection already exists");

			searchCompendium(client, "items with the most hearts recovered").catch(
				console.error
			);
		}
	} catch (error) {
		console.error("Error setting up Weaviate collection:", error);
	}
}

// Call the function
initWeaviate().catch(console.error);
