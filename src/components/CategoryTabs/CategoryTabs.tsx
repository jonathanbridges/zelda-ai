"use client";

import { Category, URLParams } from "@/enums";
import { Box, Tab, Tabs } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryIcon from "../CategoryIcon/CategoryIcon";

const categories = [
	{ value: "", label: "All" },
	{ value: Category.MONSTERS, label: "Monsters" },
	{ value: Category.EQUIPMENT, label: "Equipment" },
	{ value: Category.MATERIALS, label: "Materials" },
	{ value: Category.CREATURES, label: "Creatures" },
	{ value: Category.TREASURE, label: "Treasure" }
];

function isValidCategory(category: string | null): boolean {
	if (!category) return true; // empty category is valid
	return categories.some((c) => c.value === category);
}

export default function CategoryTabs() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const category = searchParams.get(URLParams.CATEGORY) || "all";

	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		const params = new URLSearchParams();

		// Only set category if it's not "all"
		if (newValue !== "all") {
			params.set(URLParams.CATEGORY, newValue);
		}

		// Clear both page and query params by not including them
		// The old params will be replaced with just the category (if any)
		router.push(params.toString() ? `?${params.toString()}` : "/");
	};

	// Default to empty string if category is null or invalid
	const validCategory = category && isValidCategory(category) ? category : "";

	return (
		<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
			<Tabs
				value={validCategory}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="category tabs"
			>
				{categories.map(({ value, label }) => (
					<Tab
						key={value}
						value={value}
						label={label}
						icon={
							value ? <CategoryIcon category={value as Category} /> : undefined
						}
						iconPosition="start"
					/>
				))}
			</Tabs>
		</Box>
	);
}
