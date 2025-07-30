"use client";

import Link from "next/link";
import { useAuth } from "../lib/auth-context";

export default function Home() {
	const { user } = useAuth();

	return (
		<div className="min-h-screen flex flex-col">
			{/* Simple Navigation */}
			<nav
				className="backdrop-blur-sm shadow-sm border-b"
				style={{ backgroundColor: "#774E3C" }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center space-x-8">
							<Link
								href="/"
								className="text-xl font-bold text-white"
								style={{ fontFamily: "Libre Baskerville, serif" }}
							>
								Florești
							</Link>
							<div className="hidden md:flex space-x-6">
								<Link
									href="/news"
									className="text-white hover:text-orange-100 transition"
								>
									News
								</Link>
								<Link
									href="/events"
									className="text-white hover:text-orange-100 transition"
								>
									Events
								</Link>
								<Link
									href="/groups"
									className="text-white hover:text-orange-100 transition"
								>
									Groups
								</Link>
								<Link
									href="/directory"
									className="text-white hover:text-orange-100 transition"
								>
									Directory
								</Link>
								<Link
									href="/forum"
									className="text-white hover:text-orange-100 transition"
								>
									Forum
								</Link>
								<Link
									href="/suggestions"
									className="text-white hover:text-orange-100 transition"
								>
									Sugestii
								</Link>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							{user ? (
								<div className="flex items-center space-x-4">
									<span className="text-white text-sm">
										Bună, {user.username}!
									</span>
									<Link
										href="/profile"
										className="text-white hover:text-orange-100 transition"
									>
										Profil
									</Link>
								</div>
							) : (
								<>
									<Link
										href="/login"
										className="text-white hover:text-orange-100 transition"
									>
										Login
									</Link>
									<Link
										href="/register"
										className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
										style={{ backgroundColor: "#952636" }}
									>
										Register
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>

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
							locale în satul Florești, Cluj.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Link
								href="/events"
								className="text-white px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold"
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
							className="text-3xl font-bold text-center text-orange-900 mb-12"
							style={{ fontFamily: "Libre Baskerville, serif" }}
						>
							Acces Rapid
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							<Link
								href="/news"
								className="bg-orange-100/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border border-orange-200 hover:border-orange-300"
							>
								<h3 className="font-semibold text-orange-900 hover:text-orange-800 transition">
									📰 Știri
								</h3>
							</Link>
							<Link
								href="/events"
								className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border hover:border-orange-300"
								style={{ backgroundColor: "#E8DCC4", borderColor: "#D4C4A8" }}
							>
								<h3 className="font-semibold text-amber-800 hover:text-orange-800 transition">
									📅 Evenimente
								</h3>
							</Link>
							<Link
								href="/groups"
								className="bg-orange-100/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border border-orange-200 hover:border-orange-300"
							>
								<h3 className="font-semibold text-orange-900 hover:text-orange-800 transition">
									👥 Grupuri
								</h3>
							</Link>
							<Link
								href="/directory"
								className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border hover:border-orange-300"
								style={{ backgroundColor: "#E8DCC4", borderColor: "#D4C4A8" }}
							>
								<h3 className="font-semibold text-amber-800 hover:text-orange-800 transition">
									🏪 Afaceri Locale
								</h3>
							</Link>
							<Link
								href="/forum"
								className="bg-orange-100/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border border-orange-200 hover:border-orange-300"
							>
								<h3 className="font-semibold text-orange-900 hover:text-orange-800 transition">
									💬 Forum
								</h3>
							</Link>
							<Link
								href="/suggestions"
								className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border hover:border-orange-300"
								style={{ backgroundColor: "#E8DCC4", borderColor: "#D4C4A8" }}
							>
								<h3 className="font-semibold text-amber-800 hover:text-orange-800 transition">
									💡 Sugestii
								</h3>
							</Link>
							<Link
								href="/login"
								className="bg-orange-100/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border border-orange-200 hover:border-orange-300"
							>
								<h3 className="font-semibold text-orange-900 hover:text-orange-800 transition">
									🔐 Login
								</h3>
							</Link>
							<Link
								href="/register"
								className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center border hover:border-orange-300"
								style={{ backgroundColor: "#E8DCC4", borderColor: "#D4C4A8" }}
							>
								<h3 className="font-semibold text-amber-800 hover:text-orange-800 transition">
									📝 Înregistrare
								</h3>
							</Link>
						</div>
					</div>
				</section>
			</div>

			{/* Footer */}
			<footer className="border-t py-8" style={{ backgroundColor: "#774E3C" }}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center text-orange-200">
						<p>
							© 2025 Florești Community Website. Built with ❤️ for our
							community.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
