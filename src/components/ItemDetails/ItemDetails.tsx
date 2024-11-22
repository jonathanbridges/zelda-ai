import { CompendiumItem } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import {
	Card,
	CardContent,
	IconButton,
	Portal,
	Typography
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import ItemImage from "../ItemImage/ItemImage";

interface ItemDetailsProps {
	item: CompendiumItem;
	onClose: () => void;
}

export default function ItemDetails({ item, onClose }: ItemDetailsProps) {
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
					background: "white",
					borderRadius: "8px",
					overflow: "auto"
				}}
			>
				<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
					<ItemImage item={item} />
					<CardContent sx={{ flexGrow: 1, overflow: "auto" }}>
						<Typography gutterBottom variant="h5" component="h2">
							{item.name}
						</Typography>
						<Typography variant="body2" color="text.secondary" paragraph>
							{item.description}
						</Typography>

						{/* {item.cookingEffect && (
							<ItemSection
								title="Cooking Effect"
								content={item.cookingEffect}
							/>
						)}

						{item.commonLocations && (
							<ItemSection title="Locations" content={item.commonLocations} />
						)}

						{item.drops && <ItemSection title="Drops" content={item.drops} />}

						{item.attack && (
							<ItemSection title="Attack Power" content={item.attack} />
						)}

						{item.recoveredHearts && (
							<ItemSection
								title="Hearts Recovered"
								content={item.recoveredHearts}
							/>
						)} */}
					</CardContent>

					<IconButton
						onClick={onClose}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: "white"
						}}
					>
						<CloseIcon />
					</IconButton>
				</Card>
			</motion.div>
		</Portal>
	);
}
