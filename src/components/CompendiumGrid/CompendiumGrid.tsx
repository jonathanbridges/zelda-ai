"use client";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CompendiumCard from "../CompendiumCard/CompendiumCard";
import { useCompendiumData } from "@/hooks/useCompendiumData";
import CompendiumLoader from "../CompendiumLoader/CompendiumLoader";

export default function CompendiumGrid() {
	const { data, isLoading, error } = useCompendiumData();

	if (error) {
		return (
			<Typography color="error">Error loading data: {error.message}</Typography>
		);
	}

	if (isLoading || !data) {
		return <CompendiumLoader />;
	}

	return (
		<>
			<Typography variant="subtitle1">{data.header}</Typography>
			<Grid container spacing={2} sx={{ mt: 2 }}>
				{data.objects.map((object) => (
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
		</>
	);
}
