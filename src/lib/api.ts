import { CompendiumItem } from "@/types";
import { GenerativeReturn } from "weaviate-client";

type SearchParams = {
	query?: string;
	category?: string;
	limit?: number;
	offset?: number;
};

function buildUrl({
	query = "",
	category = "",
	limit = 20,
	offset = 0
}: SearchParams = {}): string {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
	const params = new URLSearchParams();

	if (query) params.set("query", encodeURIComponent(query));
	if (category) params.set("category", encodeURIComponent(category));
	if (limit) params.set("limit", encodeURIComponent(limit.toString()));
	if (offset) params.set("offset", encodeURIComponent(offset.toString()));

	const apiPath = "/api/search";
	const searchString = params.toString();

	const url = new URL(apiPath, baseUrl || "http://localhost:3000");
	url.search = searchString;

	return url.toString();
}

export async function fetchCompendiumData(
	params: SearchParams
): Promise<GenerativeReturn<CompendiumItem>> {
	const url = buildUrl(params);
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data: GenerativeReturn<CompendiumItem> = await response.json();
	return {
		generated: data.generated ?? "",
		objects: data.objects
	};
}
