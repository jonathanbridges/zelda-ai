"use client";

import { Card, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface HeaderProps {
	text: string;
	isLoading?: boolean;
}

export default function Header({ text, isLoading = false }: HeaderProps) {
	return isLoading ? (
		<Skeleton variant="text" width="100%" height={60} />
	) : (
		<Card
			elevation={2}
			sx={{
				backgroundColor: "white",
				p: 2,
				borderRadius: 2,
				width: "100%",
				boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
				mb: 2
			}}
		>
			<motion.div>
				<Typography variant="subtitle1">
					{text.split("").map((char, index) => (
						<motion.span
							key={index}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{
								duration: 0.02,
								delay: index * 0.007,
								ease: "easeOut"
							}}
						>
							{char}
						</motion.span>
					))}
				</Typography>
			</motion.div>
		</Card>
	);
}
