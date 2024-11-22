import { Typography } from "@mui/material";

interface ItemSectionProps {
	title: string;
	content: string | number | string[];
}

export default function ItemSection({ title, content }: ItemSectionProps) {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				{title}
			</Typography>
			<Typography variant="body2" color="text.secondary" paragraph>
				{content}
			</Typography>
		</>
	);
}
