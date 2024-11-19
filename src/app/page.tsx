import CompendiumCard from "@/components/CompendiumCard/CompendiumCard";
import { CompendiumItem } from "@/types";
import { GenerativeObject, GenerativeReturn } from "weaviate-client";

const getCompendiumItems = async (): Promise<{
	header: string;
	objects: GenerativeObject<CompendiumItem>[];
}> => {
	const result = await fetch(
		process.env.APP_URL + "/api/search?query=hearts&limit=10&offset=0",
		{ method: "GET", cache: "force-cache" }
	);
	const data: GenerativeReturn<CompendiumItem> = await result.json();

	if (result.ok) {
		const header: string = data.generated ?? "";
		const objects: GenerativeObject<CompendiumItem>[] = data.objects;
		return { header, objects };
	}
	return { header: "", objects: [] };
};

export default async function Page() {
	const { header, objects } = await getCompendiumItems();

	return (
		<div>
			<h1>{header}</h1>
			<div className="flex flex-wrap gap-4">
				{objects.map((object: GenerativeObject<CompendiumItem>) => {
					const { generated } = object;
					const item: CompendiumItem = object.properties;
					const { itemId, name } = item;

					return <CompendiumCard key={itemId} item={item} />;
				})}
			</div>
		</div>
	);
}
