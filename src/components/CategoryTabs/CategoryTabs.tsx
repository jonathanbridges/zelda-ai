"use client";

import { Category } from "@/enums";
import { Box, Tab, Tabs } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryIcon from "../CategoryIcon/CategoryIcon";

const categories = [
	{ value: "", label: "All" },
	{ value: Category.EQUIPMENT, label: "Equipment" },
	{ value: Category.MATERIALS, label: "Materials" },
	{ value: Category.CREATURES, label: "Creatures" },
	{ value: Category.TREASURE, label: "Treasure" }
];

export default function CategoryTabs() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentCategory = searchParams.get("category") ?? "";

	const handleChange = (_: React.SyntheticEvent, newValue: string) => {
		const params = new URLSearchParams(searchParams);
		if (newValue) {
			params.set("category", newValue);
		} else {
			params.delete("category");
		}

		router.push(`${pathname}?${params.toString()}`, {
			scroll: false
		});
	};

	return (
		<Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
			<Tabs
				value={currentCategory}
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
							value ? (
								<CategoryIcon category={value as unknown as Category} />
							) : undefined
						}
						iconPosition="start"
					/>
				))}
			</Tabs>
		</Box>
	);
}
