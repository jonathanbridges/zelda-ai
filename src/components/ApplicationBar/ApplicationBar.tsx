import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
export default function ApplicationBar() {
	return (
		<AppBar
			position="sticky"
			component="header"
			sx={{
				backgroundColor: "primary.main",
				color: "primary.contrastText"
			}}
		>
			<Toolbar sx={{ gap: 2 }}>
				<Typography
					variant="h6"
					component="div"
					sx={{
						flexShrink: 0,
						fontWeight: 500
					}}
				>
					Zelda Compendium
				</Typography>
				<Box sx={{ flexGrow: 1, maxWidth: 600 }}>
					<SearchBar />
				</Box>
			</Toolbar>
		</AppBar>
	);
}
