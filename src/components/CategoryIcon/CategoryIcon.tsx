import { Category } from "@/enums";
import {
	WhatshotOutlined as MonsterIcon, // For Monsters
	GrassOutlined as MaterialsIcon, // For Materials
	BugReportOutlined as CreaturesIcon, // For Creatures
	DiamondOutlined as TreasureIcon // For Treasure
} from "@mui/icons-material";
import { SvgIcon, SvgIconProps } from "@mui/material";

interface CategoryIconProps extends SvgIconProps {
	category: Category;
}

const EquipmentIcon = (props: SvgIconProps) => (
	<SvgIcon {...props}>
		<path d="M6.92 5H5l9 9l1-.94m4.96 6.06l-.84.84a.996.996 0 0 1-1.41 0l-3.12-3.12l-2.68 2.66l-1.41-1.41l1.42-1.42L3 7.75V3h4.75l8.92 8.92l1.42-1.42l1.41 1.41l-2.67 2.67l3.12 3.12c.4.4.4 1.03.01 1.42" />
	</SvgIcon>
);

export default function CategoryIcon({
	category,
	sx,
	...props
}: CategoryIconProps) {
	const iconMap = {
		[Category.EQUIPMENT]: EquipmentIcon,
		[Category.MONSTERS]: MonsterIcon,
		[Category.MATERIALS]: MaterialsIcon,
		[Category.CREATURES]: CreaturesIcon,
		[Category.TREASURE]: TreasureIcon
	};

	const Icon = iconMap[category];

	return <Icon sx={sx} {...props} />;
}
