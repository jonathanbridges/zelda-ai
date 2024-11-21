"use client";

import { CompendiumData, CompendiumItem } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCompendiumContext } from "@/app/contexts/CompendiumContext";
import { fetchCompendiumData } from "@/lib/api";
import { Category, URLParams } from "@/enums";

export function useCompendiumData() {
	const searchParams = useSearchParams();
	const [data, setData] = useState<CompendiumData | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const { setIsLoading, isLoading } = useCompendiumContext();

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const category = searchParams.get(URLParams.CATEGORY);
				const query = searchParams.get(URLParams.QUERY);
				const page = searchParams.get(URLParams.PAGE);

				const result = await fetchCompendiumData({
					...(category && { [URLParams.CATEGORY]: category as Category }),
					...(query && { [URLParams.QUERY]: query }),
					...(page && { [URLParams.PAGE]: parseInt(page) })
				});
				if (isMounted) {
					setData(result);
				}
			} catch (err) {
				if (isMounted) {
					// Parse error response if it exists
					if (err instanceof Error) {
						const errorResponse = await (err as any).json?.();
						const errorMessage = errorResponse?.error || err.message;
						console.log(err, errorMessage);
						setError(new Error(errorMessage));
					} else {
						setError(new Error("An unknown error occurred"));
					}
					setData(null);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, [searchParams, setIsLoading]);

	return { data, error, isLoading };
}
