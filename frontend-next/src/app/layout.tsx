import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Florești Community Website",
	description:
		"Comunitatea ta online pentru știri, evenimente, grupuri și resurse locale în Florești, Cluj.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ro">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body style={{ fontFamily: "Source Serif 4, serif" }}>
				<div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
					{children}
				</div>
			</body>
		</html>
	);
}
