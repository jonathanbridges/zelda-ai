import { Container } from "@mui/material";
import CompendiumGrid from "@/components/CompendiumGrid/CompendiumGrid";
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs";
import { PageProps } from "../../.next/types/app/page";
import Header from "@/components/Header/Header";

export default async function Home(pageProps: PageProps) {
	const { query } = await pageProps.searchParams;
	const hasQuery = !!query;

	return (
		<Container maxWidth="lg">
			<CategoryTabs />
			{!hasQuery && (
				<Header text="Welcome to the Hyrule Compendium. Use the search bar to ask for items and/or use the filter tabs above!" />
			)}
			<CompendiumGrid hasQuery={hasQuery} />
		</Container>
	);
}
