import { Category } from "@/enums";
import { CompendiumItem } from "@/types";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography
} from "@mui/material";
import Image from "next/image";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import ItemStats from "../ItemStats/ItemStats";

interface CompendiumCardProps {
	item: CompendiumItem;
}

export default function CompendiumCard({ item }: CompendiumCardProps) {
	const { name, description, image, category } = item;

	return (
		<Card>
			<CardActionArea>
				<Box sx={{ position: "relative" }}>
					<CardMedia sx={{ position: "relative", height: 200 }}>
						<Image
							alt={name}
							src={image}
							fill
							style={{ objectFit: "cover" }}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</CardMedia>
					<Box
						sx={{
							position: "absolute",
							top: 8,
							right: 8,
							backgroundColor: "rgba(255, 255, 255, 0.8)",
							borderRadius: "50%",
							padding: 1,
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<CategoryIcon
							category={category}
							sx={{
								fontSize: 24,
								color: "primary.main"
							}}
						/>
					</Box>
					<Box
						sx={{
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							padding: 1
						}}
					>
						<ItemStats item={item} />
					</Box>
				</Box>
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
	);
}
