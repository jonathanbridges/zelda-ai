import { AppBar, Box, Container, Toolbar } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";

export default function ApplicationBar() {
	return (
		<AppBar position="sticky">
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box display="flex" alignItems="center" gap={2} width="100%">
						<Image
							src="/main-sword-shield.png"
							alt="Main Sword and Shield"
							width={40}
							height={40}
							style={{
								marginRight: "8px"
							}}
							priority
							quality={100}
						/>
						<SearchBar />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
