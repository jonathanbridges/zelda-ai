import { CompendiumData, QueryParams } from "@/types";
import { URLParams } from "@/enums";

function buildUrl(params: QueryParams = {}): string {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
	const {
		[URLParams.QUERY]: query,
		[URLParams.CATEGORY]: category,
		[URLParams.PAGE]: page = 1
	} = params;

	// Only use search endpoint if there's a query
	if (query?.toString().trim()) {
		const searchParams = new URLSearchParams();
		searchParams.set(URLParams.QUERY, encodeURIComponent(query.toString()));
		if (category?.toString().trim()) {
			searchParams.set(
				URLParams.CATEGORY,
				encodeURIComponent(category.toString())
			);
		}
		searchParams.set(URLParams.PAGE, page.toString());
		return `${baseUrl}/api/search?${searchParams.toString()}`;
	}

	// Use base endpoint for everything else
	const baseParams = new URLSearchParams();
	if (category?.toString().trim()) {
		baseParams.set(URLParams.CATEGORY, encodeURIComponent(category.toString()));
	}
	baseParams.set(URLParams.PAGE, page.toString());
	return `${baseUrl}/api?${baseParams.toString()}`;
}

export async function fetchCompendiumData(
	params: QueryParams = {}
): Promise<CompendiumData> {
	const url = buildUrl(params);

	const response = await fetch(url, {
		// Re-enable caching but revalidate frequently
		next: {
			revalidate: 60 // Revalidate cache every 60 seconds
		}
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return {
		header: data.generated ?? "",
		objects: data.objects,
		totalCount: data.totalCount
	};
}
