import ApplicationBar from "@/components/ApplicationBar/ApplicationBar";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Suspense } from "react";
import Loading from "./loading";

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
				<ThemeRegistry>
					<ApplicationBar />
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</ThemeRegistry>
			</body>
		</html>
	);
}
