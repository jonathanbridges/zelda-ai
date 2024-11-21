"use client";

import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter, useSearchParams } from "next/navigation";
import { URLParams } from "@/enums";
import { ITEMS_PER_PAGE } from "@/types";

interface PaginationBarProps {
	totalCount: number;
}

export default function PaginationBar({ totalCount }: PaginationBarProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentPage = Number(searchParams.get(URLParams.PAGE)) || 1;
	const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

	// Don't render anything if there's only one page or less
	if (totalPages <= 1) return null;

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		page: number
	) => {
		// Create new URLSearchParams to maintain existing params
		const params = new URLSearchParams(searchParams.toString());
		params.set(URLParams.PAGE, page.toString());

		router.push(`?${params.toString()}`);
	};

	return (
		<Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
			<Pagination
				page={currentPage}
				count={totalPages}
				variant="outlined"
				color="primary"
				onChange={handlePageChange}
			/>
		</Stack>
	);
}
