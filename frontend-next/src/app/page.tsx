"use client";

import Link from "next/link";
import { useAuth } from "../lib/auth-context";
import Navigation from "../components/Navigation";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navigation />

			<div className="flex-1">
				{/* Hero Section */}
				<section className="py-20 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center">
						<h1
							className="text-4xl md:text-6xl font-bold mb-6"
							style={{
								fontFamily: "Libre Baskerville, serif",
								color: "#774E3C",
							}}
						>
							Bine ați venit în Florești!
						</h1>
						<p
							className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
							style={{ color: "#774E3C" }}
						>
							Comunitatea ta online pentru știri, evenimente, grupuri și resurse
							locale în comuna Florești, Cluj.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Link
								href="/events"
								className="text-white px-8 py-3 rounded-lghover:opacity-90 transition font-semibold"
								style={{ backgroundColor: "#774E3C" }}
							>
								Vezi Evenimente
							</Link>
							<Link
								href="/groups"
								className="px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold border-2"
								style={{
									backgroundColor: "#E8DCC4",
									borderColor: "#774E3C",
									color: "#774E3C",
								}}
							>
								Alătură-te Grupurilor
							</Link>
						</div>
					</div>
				</section>

				{/* Quick Access */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
						<h2
							className="text-3xl font-bold text-center mb-12"
							style={{
								fontFamily: "Libre Baskerville, serif",
								color: "#774E3C",
							}}
						>
							Acces Rapid
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							<Link
								href="/news"
								className="bg-orange-100/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border border-orange-200 hover:border-orange-300"
							>
								<h3
									className="font-semibold hover:text-orange-800 transition"
									style={{ color: "#774E3C" }}
								>
									Știri
								</h3>
							</Link>
							<Link
								href="/events"
								className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border hover:border-orange-300"
								style={{ backgroundColor: "#E8DCC4", borderColor: "#D4C4A8" }}
							>
								<h3
									className="font-semibold hover:text-orange-800 transition"
									style={{ color: "#774E3C" }}
								>
									Evenimente
								</h3>
							</Link>
							<Link
								href="/groups"
								className="bg-orange-100/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border border-orange-200 hover:border-orange-300"
							>
								<h3
									className="font-semibold hover:text-orange-800 transition"
									style={{ color: "#774E3C" }}
								>
									Grupuri
								</h3>
							</Link>
							<Link
								href="/directory"
								className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border hover:border-orange-300"
								style={{ backgroundColor: "#E8DCC4", borderColor: "#D4C4A8" }}
							>
								<h3
									className="font-semibold hover:text-orange-800 transition"
									style={{ color: "#774E3C" }}
								>
									Afaceri Locale
								</h3>
							</Link>
							<Link
								href="/forum"
								className="bg-orange-100/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border border-orange-200 hover:border-orange-300"
							>
								<h3
									className="font-semibold hover:text-orange-800 transition"
									style={{ color: "#774E3C" }}
								>
									Forum
								</h3>
							</Link>
							<Link
								href="/suggestions"
								className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border hover:border-orange-300"
								style={{ backgroundColor: "#E8DCC4", borderColor: "#D4C4A8" }}
							>
								<h3
									className="font-semibold hover:text-orange-800 transition"
									style={{ color: "#774E3C" }}
								>
									Sugestii
								</h3>
							</Link>
							<Link
								href="/login"
								className="bg-orange-100/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border border-orange-200 hover:border-orange-300"
							>
								<h3
									className="font-semibold hover:text-orange-800 transition"
									style={{ color: "#774E3C" }}
								>
									Login
								</h3>
							</Link>
							<Link
								href="/register"
								className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border hover:border-orange-300"
								style={{ backgroundColor: "#E8DCC4", borderColor: "#D4C4A8" }}
							>
								<h3
									className="font-semibold hover:text-orange-800 transition"
									style={{ color: "#774E3C" }}
								>
									Înregistrare
								</h3>
							</Link>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
