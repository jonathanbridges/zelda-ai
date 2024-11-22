import { CompendiumItem } from "@/types";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography
} from "@mui/material";
import { motion } from "framer-motion";
import ItemImage from "../ItemImage/ItemImage";

interface CompendiumCardProps {
	item: CompendiumItem;
	onSelect: (id: number) => void;
	isSelected?: boolean;
	priority: boolean;
}

export default function CompendiumCard({
	item,
	onSelect,
	isSelected,
	priority
}: CompendiumCardProps) {
	const { name, description } = item;
	const randomRotation = Math.random() * 2 - 1;

	return (
		<motion.div
			layoutId={`card-${item.itemId}`}
			initial={{
				scale: 1,
				rotate: 0,
				boxShadow: "0px 0px 0px rgba(0,0,0,0.2)"
			}}
			whileHover={
				!isSelected
					? {
							scale: 1.05,
							rotate: randomRotation,
							boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
							transition: {
								duration: 0.3,
								ease: "easeOut"
							}
					  }
					: {}
			}
			onClick={() => onSelect(item.itemId)}
			style={{
				width: isSelected ? "100vw" : "auto",
				height: isSelected ? "100vh" : "auto",
				position: isSelected ? "fixed" : "relative",
				top: isSelected ? 0 : "auto",
				left: isSelected ? 0 : "auto",
				zIndex: isSelected ? 50 : 1
			}}
		>
			<Card
				sx={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					position: "relative"
				}}
			>
				<CardActionArea>
					<CardMedia
						sx={{
							backgroundColor: "black",
							width: "100%"
						}}
					>
						<ItemImage item={item} priority={priority} />
					</CardMedia>
					<CardContent>
						<Typography
							gutterBottom
							variant="h5"
							component="div"
							textTransform="capitalize"
						>
							{name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</motion.div>
	);
}
