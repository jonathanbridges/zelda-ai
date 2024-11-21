import { CompendiumItem } from "@/types";
import { GenerativeObject, GenerativeReturn } from "weaviate-client";

type CompendiumData = {
	header: string;
	objects: GenerativeObject<CompendiumItem>[];
};

type SearchParams = {
	query?: string;
	category?: string;
	limit?: number;
	offset?: number;
};

function buildUrl(params: SearchParams = {}): string {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
	const { query, category, limit = 20, offset = 0 } = params;

	// Only use search endpoint if there's a query
	if (query?.trim()) {
		const searchParams = new URLSearchParams();
		searchParams.set("query", encodeURIComponent(query));
		if (category?.trim())
			searchParams.set("category", encodeURIComponent(category));
		searchParams.set("limit", encodeURIComponent(limit.toString()));
		searchParams.set("offset", encodeURIComponent(offset.toString()));
		return `${baseUrl}/api/search?${searchParams.toString()}`;
	}

	// Use base endpoint for everything else
	const baseParams = new URLSearchParams();
	if (category?.trim())
		baseParams.set("category", encodeURIComponent(category));
	baseParams.set("limit", limit.toString());
	baseParams.set("offset", offset.toString());
	return `${baseUrl}/api?${baseParams.toString()}`;
}

export async function fetchCompendiumData(
	params: SearchParams = {}
): Promise<CompendiumData> {
	const url = buildUrl(params);
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return {
		header: data.generated ?? "",
		objects: data.objects
	};
}
