"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
import {CssBaseline} from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body>


      <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
      </ThemeProvider>
        </body>
      </html>
  );
}
