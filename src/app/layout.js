"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import client from "../../lib/apollo-client";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<ApolloProvider client={client}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						{children}
					</ThemeProvider>
				</ApolloProvider>
			</body>
		</html>
	);
}
