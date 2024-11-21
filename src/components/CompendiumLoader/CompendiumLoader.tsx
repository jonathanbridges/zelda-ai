import Grid from "@mui/material/Grid2";
import {
	Card,
	CardMedia,
	CardContent,
	Container,
	Skeleton
} from "@mui/material";

const SkeletonCard = () => (
	<Grid
		size={{
			xs: 12,
			sm: 6,
			md: 4,
			xl: 3
		}}
	>
		<Card>
			<CardMedia>
				<Skeleton
					animation="wave"
					variant="rectangular"
					height={200}
					sx={{ width: "100%" }}
				/>
			</CardMedia>
			<CardContent>
				<Skeleton animation="wave" variant="text" width="60%" sx={{ mb: 1 }} />
				<Skeleton animation="wave" variant="text" width="100%" height={60} />
			</CardContent>
		</Card>
	</Grid>
);

export default function CompendiumLoader() {
	return (
		<Container maxWidth="lg">
			<Grid container spacing={2}>
				{[...Array(12)].map((_, i) => (
					<SkeletonCard key={i} />
				))}
			</Grid>
		</Container>
	);
}
