"use client";

import { Search as SearchIcon } from "@mui/icons-material";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchBar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			startTransition(() => {
				const value = (event.target as HTMLInputElement).value.trim();

				const params = new URLSearchParams();
				if (value) {
					params.set("query", value);
				}

				const queryString = params.toString();
				const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
				router.push(newUrl);
			});
		}
	};

	return (
		<TextField
			fullWidth
			placeholder="Search compendium..."
			size="small"
			onKeyDown={handleSearch}
			defaultValue={searchParams.get("query") ?? ""}
			disabled={isPending}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						{isPending ? (
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
