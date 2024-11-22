"use client";

import { createTheme } from "@mui/material/styles";
import { EB_Garamond } from "next/font/google";

const ebGaramond = EB_Garamond({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap"
});

export const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#1976d2" // You can customize this color
		},
		secondary: {
			main: "#9c27b0" // You can customize this color
		},
		background: {
			default: "#f5f5f5",
			paper: "#ffffff"
		}
	},
	typography: {
		fontFamily: ebGaramond.style.fontFamily,
		h1: {
			fontWeight: 600
		},
		h2: {
			fontWeight: 600
		},
		h3: {
			fontWeight: 600
		}
	}
});

export default theme;
