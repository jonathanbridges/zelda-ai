"use client";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { URLParams } from "@/enums";
import { useDebounce } from "@/hooks/useDebounce";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto"
	}
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "50ch"
		}
	}
}));

export default function SearchBar() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateSearch = useCallback(
		(searchText: string) => {
			const params = new URLSearchParams();

			if (searchText.trim()) {
				params.set(URLParams.QUERY, searchText);
			}

			router.push(searchText.trim() ? `?${params.toString()}` : "/");
		},
		[router]
	);

	const handleSearch = useDebounce(updateSearch, 300);

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search Hyrule Compendium…"
				inputProps={{ "aria-label": "search" }}
				onChange={(e) => handleSearch(e.target.value)}
				defaultValue={searchParams.get(URLParams.QUERY) || ""}
			/>
		</Search>
	);
}
