import { Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function CompendiumLoader() {
	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
		>
			{[...Array(20)].map((_, index) => (
				<Grid
					component="div"
					key={index}
					size={{
						xs: 4,
						sm: 4,
						md: 4,
						lg: 3
					}}
				>
					<Card>
						<CardMedia
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: "4px 4px 0 0"
							}}
						>
							<Skeleton
								animation="wave"
								variant="rectangular"
								height={280}
								sx={{
									width: "100%",
									maxWidth: 280,
									borderRadius: "4px 4px 0 0"
								}}
							/>
						</CardMedia>
						<CardContent>
							<Skeleton
								animation="wave"
								variant="text"
								width="60%"
								sx={{ mb: 1 }}
							/>
							<Skeleton
								animation="wave"
								variant="text"
								width="100%"
								height={60}
							/>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
