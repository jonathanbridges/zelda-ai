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
				<Header text="Welcome to the Hyrule Compendium! Search for items in Hyrule and I'll find the most relevant matches and summarize them for you. Alternatively, use the tabs above to filter items by category. Click on an item to learn more about it!" />
			)}
			<CompendiumGrid hasQuery={hasQuery} />
		</Container>
	);
}
