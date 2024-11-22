"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CompendiumCard from "../CompendiumCard/CompendiumCard";
import { useCompendiumData } from "@/hooks/useCompendiumData";
import { Alert, AlertTitle } from "@mui/material";
import CompendiumLoader from "../CompendiumLoader/CompendiumLoader";
import Header from "../Header/Header";
import PaginationBar from "../PaginationBar/PaginationBar";
import Grid from "@mui/material/Grid2";
import ItemDetails from "../ItemDetails/ItemDetails";

interface CompendiumGridProps {
	hasQuery: boolean;
}

export default function CompendiumGrid({ hasQuery }: CompendiumGridProps) {
	const { data, isLoading, error } = useCompendiumData();
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const handleClose = () => setSelectedId(null);

	const selectedItem = selectedId
		? data?.objects.find((item) => item.properties.itemId === selectedId)
		: null;

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
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{data?.objects.map((object, index) => (
						<Grid
							component="div"
							key={object.properties.itemId}
							size={{
								xs: 4,
								sm: 4,
								md: 4,
								lg: 3
							}}
						>
							<CompendiumCard
								item={object.properties}
								onSelect={setSelectedId}
								isSelected={object.properties.itemId === selectedId}
								priority={index < 4}
							/>
						</Grid>
					))}
				</Grid>
			)}
			{!isLoading && <PaginationBar totalCount={data?.totalCount ?? 0} />}

			<AnimatePresence>
				{selectedItem && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							style={{
								position: "fixed",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: "rgba(0, 0, 0, 0.75)",
								zIndex: 1200
							}}
							onClick={handleClose}
						/>
						<ItemDetails item={selectedItem.properties} onClose={handleClose} />
					</>
				)}
			</AnimatePresence>
		</>
	);
}
