import { CompendiumCollection, CompendiumCollectionType } from "@/types";
import dotenv from "dotenv";
import weaviate, { GenerativeReturn, WeaviateClient } from "weaviate-client";

// Load environment variables from .env file
dotenv.config();

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string;
const openaiKey = process.env.OPENAI_API_KEY as string;

export default function useCompendiumSearch(): {
	searchCompendium: (
		query: string,
		limit: number,
		maxRetries: number
	) => Promise<GenerativeReturn<CompendiumCollectionType> | Error>;
} {
	const searchCompendium = async (
		query: string,
		limit: number = 5,
		maxRetries: number = 3
	): Promise<GenerativeReturn<CompendiumCollectionType> | Error> => {
		const performSearch = async (): Promise<
			GenerativeReturn<CompendiumCollectionType>
		> => {
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
					limit: limit
				}
			);

			return generativeResult;
		};

		let retryCount = 0;
		while (retryCount < maxRetries) {
			try {
				const result: GenerativeReturn<CompendiumCollectionType> =
					await performSearch();
				return result;
			} catch (error) {
				retryCount++;
				if (retryCount === maxRetries) {
					console.error("Error searching compendium after max retries:", error);
					return new Error("Search failed after max retries");
				}
				await new Promise((resolve) =>
					setTimeout(resolve, Math.pow(2, retryCount) * 1000)
				);
			}
		}
		return new Error("Search failed after max retries");
	};

	return { searchCompendium };
}
