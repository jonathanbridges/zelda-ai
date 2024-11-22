import { Category } from "@/enums";
import {
	CompendiumItem,
	CreatureItem,
	EquipmentItem,
	MaterialItem
} from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Portal } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ItemImage from "../ItemImage/ItemImage";
import ItemSection from "../ItemSection/ItemSection";
import { ItemSectionProps } from "../ItemSection/types";
import Header from "../Header/Header";

interface ItemDetailsProps {
	item: CompendiumItem;
	onClose: () => void;
}

function isEquipmentItem(item: CompendiumItem): item is EquipmentItem {
	return item.category === Category.EQUIPMENT;
}

function isMaterialItem(item: CompendiumItem): item is MaterialItem {
	return item.category === Category.MATERIALS;
}

function isCreatureItem(item: CompendiumItem): item is CreatureItem {
	return item.category === Category.CREATURES;
}

function capitalizeFirstLetter(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function capitalizeWords(word: string) {
	const words = word.split(" ");
	return words.map(capitalizeFirstLetter).join(" ");
}

function getItemDetails(item: CompendiumItem): Array<ItemSectionProps> {
	const { name, description, itemId, commonLocations, drops, dlc } = item;
	const itemDetails: Array<ItemSectionProps> = [
		{
			title: "Name",
			content: capitalizeWords(name)
		},
		{ title: "Description", content: description },
		{ title: "Common Locations", content: commonLocations || [] },
		...(drops && drops.length > 0
			? [{ title: "Drops", content: drops.map(capitalizeWords) }]
			: []),
		{ title: "DLC", content: dlc ? "Yes" : "No" },
		{ title: "Item ID", content: itemId }
	];

	if (isEquipmentItem(item)) {
		const { attack, defense, effect, type } = item;
		if (attack && attack > 0) {
			itemDetails.push({ title: "Attack", content: attack });
		}
		if (defense && defense > 0) {
			itemDetails.push({ title: "Defense", content: defense });
		}
		if (effect) {
			itemDetails.push({ title: "Effect", content: effect });
		}
		if (type) {
			itemDetails.push({ title: "Type", content: type });
		}
	}

	if (isMaterialItem(item)) {
		const { heartsRecovered, cookingEffect, fuseAttackPower } = item;
		if (heartsRecovered && heartsRecovered > 0) {
			itemDetails.push({ title: "Hearts Recovered", content: heartsRecovered });
		}
		if (cookingEffect) {
			itemDetails.push({
				title: "Cooking Effect",
				content: capitalizeWords(cookingEffect)
			});
		}
		if (fuseAttackPower && fuseAttackPower > 0) {
			itemDetails.push({
				title: "Fuse Attack Power",
				content: fuseAttackPower
			});
		}
	}

	if (isCreatureItem(item)) {
		const { heartsRecovered, edible } = item;
		if (heartsRecovered && heartsRecovered > 0) {
			itemDetails.push({ title: "Hearts Recovered", content: heartsRecovered });
		}
		itemDetails.push({ title: "Edible", content: edible ? "Yes" : "No" });
	}

	return itemDetails;
}

export default function ItemDetails({ item, onClose }: ItemDetailsProps) {
	const [aiDescription, setAiDescription] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAiDescription = async () => {
			try {
				const response = await fetch(`/api/item/${item.itemId}`);
				const data = await response.json();
				const { generated } = data.objects[0];
				setAiDescription(generated);
			} catch (error) {
				console.error("Failed to fetch AI description:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAiDescription();
	}, [item.itemId]);

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleEscapeKey);
		return () => window.removeEventListener("keydown", handleEscapeKey);
	}, [onClose]);

	return (
		<Portal>
			<motion.div
				layoutId={`card-${item.itemId}`}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				style={{
					position: "fixed",
					top: "16px",
					left: "16px",
					right: "16px",
					bottom: "16px",
					zIndex: 1300,
					borderRadius: "8px",
					overflow: "auto",
					background: "white",
					boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)"
				}}
			>
				<Grid
					container
					spacing={0}
					sx={{ height: "100%", position: "relative" }}
				>
					<Grid
						size={{ xs: 12, sm: 6 }}
						sx={{
							px: 4,
							pt: 4,
							pb: { xs: 0, md: 4 },
							order: { xs: 1, md: 1 }
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 4,
								alignItems: "flex-start"
							}}
						>
							<ItemImage item={item} priority={false} />
							<Header text={aiDescription} isLoading={isLoading} />
						</Box>
					</Grid>

					<Grid
						size={{ xs: 12, md: 6 }}
						sx={{
							overflow: "auto",
							px: 4,
							pb: 4,
							pt: { xs: 0, md: 4 },
							order: { xs: 2, md: 2 }
						}}
					>
						{getItemDetails(item).map(({ title, content }) => (
							<ItemSection key={title} title={title} content={content} />
						))}
					</Grid>

					<IconButton
						onClick={onClose}
						sx={{
							position: "absolute",
							right: 16,
							top: 16,
							color: "grey.700",
							bgcolor: "background.paper",
							"&:hover": {
								bgcolor: "grey.100"
							},
							zIndex: 1
						}}
					>
						<CloseIcon />
					</IconButton>
				</Grid>
			</motion.div>
		</Portal>
	);
}
