import ApplicationBar from "@/components/ApplicationBar/ApplicationBar";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { CompendiumProvider } from "@/app/providers/CompendiumProvider";

export const metadata = {
	title: "Zelda Compendium",
	description: "A comprehensive guide to The Legend of Zelda items"
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
