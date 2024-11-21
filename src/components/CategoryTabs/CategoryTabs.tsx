"use client";

import { Category } from "@/enums";
import { Box, Tab, Tabs } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { useEffect } from "react";

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
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentCategory = searchParams.get("category");

	// Clean up invalid category from URL
	useEffect(() => {
		if (currentCategory && !isValidCategory(currentCategory)) {
			const params = new URLSearchParams(searchParams);
			params.delete("category");
			router.replace(`${pathname}?${params.toString()}`);
		}
	}, [currentCategory, pathname, router, searchParams]);

	const handleTabChange = (category: string) => {
		const params = new URLSearchParams(searchParams);

		if (category) {
			params.set("category", category);
		} else {
			params.delete("category");
		}

		router.push(`${pathname}?${params.toString()}`);
	};

	// Default to empty string if category is null or invalid
	const validCategory =
		currentCategory && isValidCategory(currentCategory) ? currentCategory : "";

	return (
		<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
			<Tabs
				value={validCategory}
				onChange={(_, value) => handleTabChange(value)}
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
