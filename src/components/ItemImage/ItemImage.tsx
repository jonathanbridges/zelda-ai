import { CompendiumItem } from "@/types";
import { Box } from "@mui/material";
import Image from "next/image";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import ItemStats from "../ItemStats/ItemStats";

interface ItemImageProps {
	item: CompendiumItem;
	priority: boolean;
}

export default function ItemImage({ item, priority = true }: ItemImageProps) {
	const { category } = item;
	return (
		<Box
			sx={{
				position: "relative",
				aspectRatio: "1/1",
				width: "100%",
				maxWidth: 280,
				maxHeight: 280,
				margin: "0 auto",
				backgroundColor: "black",
				overflow: "hidden"
			}}
		>
			<Image
				src={item.image}
				alt={item.name}
				fill
				priority={priority}
				loading={priority ? "eager" : "lazy"}
				quality={85}
				style={{
					objectFit: "contain",
					zIndex: 1
				}}
				sizes="280px"
			/>
			<Box
				sx={{
					position: "absolute",
					top: 8,
					right: 8,
					backgroundColor: "rgba(255, 255, 255, 0.8)",
					borderRadius: "50%",
					padding: 1,
					width: 40,
					height: 40,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					zIndex: 2
				}}
			>
				<CategoryIcon
					category={category}
					sx={{ fontSize: 24, color: "primary.main" }}
				/>
			</Box>
			<Box
				sx={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					padding: 1,
					zIndex: 2
				}}
			>
				<ItemStats item={item} />
			</Box>
		</Box>
	);
}
