import { CompendiumItem } from "@/types";
import {
	Card,
	CardActionArea,
	Typography,
	CardContent,
	CardMedia,
	Box
} from "@mui/material";
import Image from "next/image";
import CategoryIcon from "../CategoryIcon/CategoryIcon";

interface CompendiumCardProps {
	item: CompendiumItem;
}

export default function CompendiumCard({ item }: CompendiumCardProps) {
	const { name, description, image, category } = item;

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<Box sx={{ position: "relative" }}>
					<CardMedia sx={{ position: "relative", height: 200 }}>
						<Image alt={name} src={image} fill style={{ objectFit: "cover" }} />
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
				</Box>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
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
