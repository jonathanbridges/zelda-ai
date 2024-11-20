"use client";

import { useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<Container>
			<Typography variant="h5" gutterBottom>
				Something went wrong!
			</Typography>
			<Typography variant="body1" color="text.secondary" gutterBottom>
				{error.message}
			</Typography>
			<Button variant="contained" onClick={reset} sx={{ mt: 2 }}>
				Try again
			</Button>
		</Container>
	);
}
