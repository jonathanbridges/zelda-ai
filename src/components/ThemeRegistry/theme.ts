"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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
		fontFamily: "var(--font-geist-sans)",
		h1: {
			fontWeight: 600
		},
		h2: {
			fontWeight: 600
		},
		h3: {
			fontWeight: 600
		}
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: "#1976d2"
				}
			}
		}
	}
});

export default theme;
