import { Typography } from "@mui/material";
import { ItemSectionProps } from "./types";

export default function ItemSection({ title, content }: ItemSectionProps) {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				{title}
			</Typography>
			<Typography variant="body2" color="text.secondary" paragraph>
				{typeof content === "string" || typeof content === "number"
					? content
					: content.join(", ")}
			</Typography>
		</>
	);
}
