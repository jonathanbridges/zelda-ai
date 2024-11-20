import Grid from "@mui/material/Grid2";
import { Card, CardContent, Container, Skeleton } from "@mui/material";

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
			<Skeleton variant="rectangular" height={140} />
			<CardContent>
				<Skeleton variant="text" width="80%" />
				<Skeleton variant="text" width="60%" />
			</CardContent>
		</Card>
	</Grid>
);

export default function Loading() {
	return (
		<Container maxWidth="lg">
			<Skeleton variant="text" width="60%" height={32} />
			<Grid container spacing={2}>
				{[...Array(12)].map((_, i) => (
					<SkeletonCard key={i} />
				))}
			</Grid>
		</Container>
	);
}
