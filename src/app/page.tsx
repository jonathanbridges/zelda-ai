import { Suspense } from "react";
import Loading from "./loading";

import CompendiumCard from "@/components/CompendiumCard/CompendiumCard";
import { CompendiumItem } from "@/types";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { GenerativeObject, GenerativeReturn } from "weaviate-client";

/**
 * Fetches compendium items based on a search query.
 *
 * @param query - The search term to filter compendium items
 * @returns An object containing:
 *          - header: A generated description of the search results
 *          - objects: An array of compendium items matching the search query
 *
 * @remarks
 * - Makes a GET request to the /api/search endpoint
 * - Results are limited to 10 items per request
 * - Response is force-cached to improve performance
 * - Returns empty arrays/strings if the request fails
 */
const getCompendiumItems = async (
	query: string
): Promise<{
	header: string;
	objects: GenerativeObject<CompendiumItem>[];
}> => {
	const result = await fetch(
		`${process.env.APP_URL}/api/search?query=${query}&limit=10&offset=0`,
		{ method: "GET", cache: "force-cache" }
	);
	const data: GenerativeReturn<CompendiumItem> = await result.json();

	if (result.ok) {
		const header: string = data.generated ?? "";
		const objects: GenerativeObject<CompendiumItem>[] = data.objects;
		return { header, objects };
	}
	return { header: "", objects: [] };
};

export default function Page({
	searchParams
}: {
	searchParams: { query: string };
}) {
	return (
		<Suspense fallback={<Loading />}>
			<PageContent searchParams={searchParams} />
		</Suspense>
	);
}

async function PageContent({
	searchParams
}: {
	searchParams: { query: string };
}) {
	const { query } = await searchParams;
	const { header, objects } = await getCompendiumItems(query ?? "a sword");

	return (
		<Container maxWidth="lg">
			<Typography variant="subtitle1">{header}</Typography>
			<Grid container spacing={2} sx={{ mt: 2 }}>
				{objects.map((object: GenerativeObject<CompendiumItem>) => (
					<Grid
						size={{
							xs: 12,
							sm: 6,
							md: 4,
							xl: 3
						}}
						key={object.properties.itemId}
					>
						<CompendiumCard item={object.properties} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
