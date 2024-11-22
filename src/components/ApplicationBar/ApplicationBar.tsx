import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";
import Link from "next/link";

export default function ApplicationBar() {
	return (
		<AppBar position="sticky" elevation={0}>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box display="flex" alignItems="center" width="100%" maxWidth="800px">
						<Image
							src="/zelda-skyward.png"
							alt="Main Sword and Shield"
							width={40}
							height={40}
							style={{
								marginRight: "8px"
							}}
							priority
							quality={100}
						/>
						<Box flexGrow={1}>
							<SearchBar />
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
							color: "rgba(255,255,255,0.7)",
							whiteSpace: "nowrap",
							ml: 2,
							marginLeft: "auto"
						}}
					>
						<Typography
							variant="body2"
							sx={{
								display: { xs: "none", sm: "block" }
							}}
						>
							Powered By:
						</Typography>
						<Link
							href="https://weaviate.io"
							target="_blank"
							rel="noopener noreferrer"
							style={{ display: "flex", alignItems: "center" }}
						>
							<Image
								src="/weaviate.png"
								alt="Powered by Weaviate"
								width={41}
								height={33}
								style={{
									opacity: 0.7
								}}
							/>
						</Link>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
