import ApplicationBar from "@/components/ApplicationBar/ApplicationBar";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { CompendiumProvider } from "@/app/providers/CompendiumProvider";

export const metadata = {
	title: "Hyrule Compendium",
	description:
		"A guide to all creatures, materials, equipment, monsters and treasure in Hyrule"
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<CompendiumProvider>
					<ThemeRegistry>
						<ApplicationBar />
						{children}
					</ThemeRegistry>
				</CompendiumProvider>
			</body>
		</html>
	);
}
