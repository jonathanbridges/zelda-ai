"use client";

import { createContext, useContext, useState } from "react";

type CompendiumContextType = {
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
};

export const CompendiumContext = createContext<CompendiumContextType>({
	isLoading: false,
	setIsLoading: () => {}
});

export const useCompendiumContext = () => useContext(CompendiumContext);