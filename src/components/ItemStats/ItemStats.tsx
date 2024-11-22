import { CompendiumItem } from "@/types";
import HeartIcon from "@mui/icons-material/Favorite";
import GavelIcon from "@mui/icons-material/Gavel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShieldIcon from "@mui/icons-material/Shield";
import { Paper, Stack, StackProps, Typography } from "@mui/material";

interface ItemStatsProps extends StackProps {
	item: CompendiumItem;
}

enum Stat {
	ATTACK = "attack",
	DEFENSE = "defense",
	HEARTS_RECOVERED = "heartsRecovered",
	EDIBLE = "edible"
}

interface StatValue {
	value: number | boolean;
	Icon: React.ElementType;
	color: string;
}

export default function ItemStats({ item, ...stackProps }: ItemStatsProps) {
	const attackValue = "attack" in item ? item.attack : 0;
	const defenseValue = "defense" in item ? item.defense : 0;
	const heartsRecoveredValue =
		"heartsRecovered" in item ? item.heartsRecovered ?? 0 : 0;
	const edibleValue = "edible" in item ? item.edible : false;

	const StatConfig: Record<Stat, StatValue> = {
		[Stat.ATTACK]: {
			Icon: GavelIcon,
			color: "error.light",
			value: attackValue
		},
		[Stat.DEFENSE]: {
			Icon: ShieldIcon,
			color: "primary.light",
			value: defenseValue
		},
		[Stat.HEARTS_RECOVERED]: {
			Icon: HeartIcon,
			color: "error.light",
			value: heartsRecoveredValue
		},
		[Stat.EDIBLE]: {
			Icon: RestaurantIcon,
			color: "success.light",
			value: edibleValue
		}
	};

	const shouldRender = (value: number | boolean) => {
		return typeof value === "number" ? value > 0 : !!value;
	};

	return (
		<Stack
			direction="row"
			spacing={1}
			{...stackProps}
			sx={{
				backgroundColor: "transparent",
				...stackProps?.sx
			}}
		>
			{Object.entries(StatConfig).map(([key, { value, Icon, color }]) => {
				return (
					shouldRender(value) && (
						<Paper
							key={key}
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
							<Icon fontSize="small" sx={{ color }} />
							<Typography variant="body2" sx={{ color: "white" }}>
								{value}
							</Typography>
						</Paper>
					)
				);
			})}
		</Stack>
	);
}
