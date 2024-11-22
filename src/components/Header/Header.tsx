"use client";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Box, Card, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface HeaderProps {
	text: string;
	isLoading?: boolean;
}

export default function Header({ text, isLoading = false }: HeaderProps) {
	return (
		<Card
			elevation={2}
			sx={{
				backgroundColor: "white",
				p: 2,
				borderRadius: 2,
				width: "100%",
				boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
				mb: 2,
				userSelect: "none"
			}}
		>
			{isLoading ? (
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						<Skeleton variant="circular" width={32} height={32} />
					</Box>
					<Skeleton variant="text" width="100%" height={60} />
				</Box>
			) : (
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "primary.main",
								borderRadius: "50%",
								width: 32,
								height: 32
							}}
						>
							<AutoFixHighIcon sx={{ fontSize: 20, color: "white" }} />
						</Box>
					</Box>
					<motion.div>
						<Typography variant="subtitle1">
							<div
								style={{
									display: "inline-flex",
									flexWrap: "wrap",
									whiteSpace: "pre-wrap"
								}}
							>
								{text.split(/(\s+)/).map((word, wordIndex, array) => (
									<div key={wordIndex} style={{ display: "inline-flex" }}>
										{word.split("").map((char, charIndex) => (
											<motion.span
												key={charIndex}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{
													duration: 0.05,
													delay:
														(array.slice(0, wordIndex).join("").length +
															charIndex) *
														0.01,
													ease: "linear"
												}}
												style={{ opacity: 0.9 }}
											>
												{char}
											</motion.span>
										))}
									</div>
								))}
							</div>
						</Typography>
					</motion.div>
				</Box>
			)}
		</Card>
	);
}
