"use client";

import { CompendiumItem } from "@/types";
import { GenerativeObject, GenerativeReturn } from "weaviate-client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCompendiumContext } from "@/app/contexts/CompendiumContext";
import { fetchCompendiumData } from "@/lib/api";

type CompendiumData = {
	header: string;
	objects: GenerativeObject<CompendiumItem>[];
};

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

				const result = await fetchCompendiumData({
					query: searchParams.get("query") || undefined,
					category: searchParams.get("category") || undefined,
					limit: Number(searchParams.get("limit")) || undefined,
					offset: Number(searchParams.get("offset")) || undefined
				});
				if (isMounted) {
					setData({
						header: result.generated || "",
						objects: result.objects || []
					});
				}
			} catch (err) {
				if (isMounted) {
					setError(err as Error);
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
