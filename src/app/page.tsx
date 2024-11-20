import { Container } from "@mui/material";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";
import CompendiumGrid from "@/components/CompendiumGrid/CompendiumGrid";

export default async function Page() {
	return (
		<Container maxWidth="lg">
			<CategoryTabs />
			<CompendiumGrid />
		</Container>
	);
}
