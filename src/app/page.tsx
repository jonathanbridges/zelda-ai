import { Suspense } from "react";
import Loading from "./loading";

import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";
import CompendiumCard from "@/components/CompendiumCard/CompendiumCard";
import { CompendiumItem, SearchParams } from "@/types";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { GenerativeObject, GenerativeReturn } from "weaviate-client";

const constructSearchUrl = (
	query: string = "a sword",
	category: string | null = null,
	offset: number | null = null,
	limit: number | null = null
): string => {
	const url = new URL("/api/search", process.env.APP_URL);
	url.searchParams.append("query", query);
	if (limit !== null) url.searchParams.append("limit", limit.toString());
	if (offset !== null) url.searchParams.append("offset", offset.toString());
	if (category !== null) url.searchParams.append("category", category);
	return url.toString();
};

const getCompendiumItems = async (
	query: string = "a sword",
	category: string | null = null,
	offset: number | null = null,
	limit: number | null = null
): Promise<{
	header: string;
	objects: GenerativeObject<CompendiumItem>[];
}> => {
	const result = await fetch(
		constructSearchUrl(query, category, offset, limit),
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

export default function Page({ searchParams }: { searchParams: SearchParams }) {
	return (
		<Suspense fallback={<Loading />}>
			<PageContent searchParams={searchParams} />
		</Suspense>
	);
}

async function PageContent({ searchParams }: { searchParams: SearchParams }) {
	const { query, category, offset, limit } = await searchParams;
	const { header, objects } = await getCompendiumItems(
		query,
		category,
		offset,
		limit
	);

	return (
		<Container maxWidth="lg">
			<Typography variant="subtitle1">{header}</Typography>
			<CategoryTabs />
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
