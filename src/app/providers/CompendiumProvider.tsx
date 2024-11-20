"use client";

import { ReactNode, useState } from "react";
import { CompendiumContext } from "../contexts/CompendiumContext";
export function CompendiumProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<CompendiumContext.Provider value={{ isLoading, setIsLoading }}>
			{children}
		</CompendiumContext.Provider>
	);
}
