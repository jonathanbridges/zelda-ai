"use client";

import { Search as SearchIcon } from "@mui/icons-material";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCompendiumContext } from "@/app/contexts/CompendiumContext";

export default function SearchBar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { isLoading } = useCompendiumContext();

	const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			const value = (event.target as HTMLInputElement).value.trim();

			const params = new URLSearchParams(searchParams);
			if (value) {
				params.set("query", value);
			} else {
				params.delete("query");
			}

			router.push(`${pathname}?${params.toString()}`);
		}
	};

	return (
		<TextField
			fullWidth
			placeholder="Search compendium..."
			size="small"
			onKeyDown={handleSearch}
			defaultValue={searchParams.get("query") ?? ""}
			disabled={isLoading}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						{isLoading ? (
							<CircularProgress size={20} color="inherit" />
						) : (
							<SearchIcon sx={{ color: "primary.contrastText" }} />
						)}
					</InputAdornment>
				),
				sx: {
					backgroundColor: "rgba(255, 255, 255, 0.15)",
					"&:hover": {
						backgroundColor: "rgba(255, 255, 255, 0.25)"
					},
					borderRadius: 1,
					color: "primary.contrastText",
					"& .MuiInputBase-input::placeholder": {
						color: "primary.contrastText",
						opacity: 0.7
					}
				}
			}}
			variant="outlined"
			sx={{
				"& .MuiOutlinedInput-notchedOutline": {
					border: "none"
				}
			}}
		/>
	);
}
