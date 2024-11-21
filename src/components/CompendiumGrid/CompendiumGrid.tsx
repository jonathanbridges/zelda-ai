"use client";

import Grid from "@mui/material/Grid2";
import CompendiumCard from "../CompendiumCard/CompendiumCard";
import { useCompendiumData } from "@/hooks/useCompendiumData";
import { Alert, AlertTitle } from "@mui/material";
import CompendiumLoader from "../CompendiumLoader/CompendiumLoader";
import Header from "../Header/Header";
import PaginationBar from "../PaginationBar/PaginationBar";

interface CompendiumGridProps {
	hasQuery: boolean;
}

export default function CompendiumGrid({ hasQuery }: CompendiumGridProps) {
	const { data, isLoading, error } = useCompendiumData();

	if (error) {
		return (
			<Alert severity="error">
				<AlertTitle>Error</AlertTitle>
				{error.message}
			</Alert>
		);
	}

	return (
		<>
			{!!hasQuery && <Header text={data?.header ?? ""} isLoading={isLoading} />}
			{isLoading ? (
				<CompendiumLoader />
			) : (
				<Grid container spacing={2}>
					{data?.objects.map((object) => (
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
			)}
			<PaginationBar totalCount={data?.totalCount ?? 0} />
		</>
	);
}
