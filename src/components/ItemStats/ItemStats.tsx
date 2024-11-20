import { Stack, Typography, StackProps, Paper } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import GavelIcon from "@mui/icons-material/Gavel";
import HeartIcon from "@mui/icons-material/Favorite";

interface ItemStatsProps extends StackProps {
	attack?: number;
	defense?: number;
	heartsRecovered?: number;
}

interface StatConfig {
	value: number;
	icon: React.ReactElement;
	color: string;
}

export default function ItemStats({
	attack,
	defense,
	heartsRecovered,
	...stackProps
}: ItemStatsProps) {
	const stats: StatConfig[] = [
		...(attack
			? [
					{
						value: attack,
						icon: <GavelIcon fontSize="small" sx={{ color: "error.light" }} />,
						color: "error.light"
					}
			  ]
			: []),
		...(defense
			? [
					{
						value: defense,
						icon: (
							<ShieldIcon fontSize="small" sx={{ color: "primary.light" }} />
						),
						color: "primary.light"
					}
			  ]
			: []),
		...(heartsRecovered
			? [
					{
						value: heartsRecovered,
						icon: <HeartIcon fontSize="small" sx={{ color: "error.light" }} />,
						color: "error.light"
					}
			  ]
			: [])
	];

	return (
		<Stack
			direction="row"
			spacing={1}
			{...stackProps}
			sx={{
				backgroundColor: "transparent",
				...stackProps.sx
			}}
		>
			{stats.map((stat, index) => (
				<Paper
					key={index}
					elevation={0}
					sx={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						borderRadius: "16px",
						padding: "4px 8px",
						display: "flex",
						alignItems: "center",
						gap: 0.5
					}}
				>
					{stat.icon}
					<Typography variant="body2" sx={{ color: "white" }}>
						{stat.value}
					</Typography>
				</Paper>
			))}
		</Stack>
	);
}
