"use client";

import { createTheme } from "@mui/material/styles";
import { EB_Garamond, Source_Sans_3 } from "next/font/google";

const ebGaramond = EB_Garamond({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap"
});

const sourceSans = Source_Sans_3({
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
		fontFamily: sourceSans.style.fontFamily,
		h1: {
			fontFamily: sourceSans.style.fontFamily,
			fontWeight: 600
		},
		h2: {
			fontFamily: sourceSans.style.fontFamily,
			fontWeight: 600
		},
		h3: {
			fontFamily: sourceSans.style.fontFamily,
			fontWeight: 500
		},
		button: {
			fontFamily: sourceSans.style.fontFamily,
			fontWeight: 500
		},
		body1: {
			fontFamily: ebGaramond.style.fontFamily,
			fontSize: "1.1rem",
			lineHeight: 1.6
		},
		body2: {
			fontFamily: ebGaramond.style.fontFamily,
			fontSize: "1rem",
			lineHeight: 1.5
		},
		subtitle1: {
			fontFamily: ebGaramond.style.fontFamily,
			fontSize: "1.1rem",
			lineHeight: 1.5
		},
		subtitle2: {
			fontFamily: ebGaramond.style.fontFamily,
			fontSize: "1rem",
			lineHeight: 1.5
		},
		caption: {
			fontFamily: sourceSans.style.fontFamily,
			fontWeight: 400
		},
		overline: {
			fontFamily: sourceSans.style.fontFamily,
			fontWeight: 500
		}
	}
});

export default theme;
