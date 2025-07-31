"use client";

import Link from "next/link";
import { useAuth } from "../lib/auth-context";
import { useState, useRef, useEffect } from "react";

export default function Navigation() {
	const { user } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Close menu when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				closeMenu();
			}
		}
		if (isMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			return () =>
				document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [isMenuOpen]);

	const closeMenu = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsMenuOpen(false);
			setIsClosing(false);
		}, 200);
	};

	return (
		<nav
			className={`backdrop-blur-sm shadow-md border-b transition-all duration-200${isMenuOpen || isClosing ? " navbar-shadowed" : ""}`}
			style={{ backgroundColor: "#774E3C", position: "relative", zIndex: 30 }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center space-x-8">
						{/* Hamburger Menu */}
						<button
							onClick={() => {
								if (isMenuOpen) {
									closeMenu();
								} else {
									setIsMenuOpen(true);
								}
							}}
							className="p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 hover:bg-yellow-100/20"
							style={{ "--tw-ring-color": "#952636" } as React.CSSProperties}
							aria-label="Open menu"
						>
							<svg
								className="w-7 h-7 transition-transform duration-200"
								style={{ color: "#fff" }}
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						<Link
							href="/"
							className="text-xl font-bold"
							style={{
								fontFamily: "Libre Baskerville, serif",
								color: "#fff",
								letterSpacing: 1,
							}}
						>
							Florești
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						{user ? (
							<div className="flex items-center space-x-4">
								<span className="text-sm" style={{ color: "#fff" }}>
									Bună, {user.username}!
								</span>
								<Link
									href="/profile"
									className="hover:opacity-80 transition"
									style={{ color: "#fff" }}
								>
									Profil
								</Link>
							</div>
						) : (
							<>
								<Link
									href="/login"
									className="hover:opacity-80 transition"
									style={{ color: "#fff" }}
								>
									Login
								</Link>
								<Link
									href="/register"
									className="px-4 py-2 rounded-lg hover:opacity-90 transition"
									style={{ backgroundColor: "#952636", color: "white" }}
								>
									Register
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
			{/* Hamburger Menu Overlay and Drawer */}
			{(isMenuOpen || isClosing) && (
				<>
					{/* Overlay: only covers content below navbar */}
					<div
						className={`fixed left-0 right-0 top-16 bottom-0 bg-black transition-opacity duration-200 z-40 ${
							isClosing ? "bg-opacity-0" : "bg-opacity-30"
						}`}
					/>
					{/* Navbar shadowed overlay */}
					<div className="fixed left-0 right-0 top-0 h-16 z-50 pointer-events-none">
						<div className="w-full h-full bg-black/40 backdrop-blur-sm transition-all duration-200 rounded-b-xl" />
					</div>
					{/* Drawer */}
					<div
						ref={menuRef}
						className={`fixed top-6 left-3 h-[92vh] w-72 shadow-2xl z-50 transition-transform duration-200 flex flex-col rounded-2xl border border-gray-200 overflow-hidden ${
							isClosing ? "animate-slideOut" : "animate-slideIn"
						}`}
						style={{ backgroundColor: "rgb(255 237 213 / 0.8)" }}
					>
						<div
							className="p-6 border-b flex items-center justify-between rounded-t-2xl"
							style={{ backgroundColor: "#774E3C" }}
						>
							<span className="text-lg font-bold" style={{ color: "#fff" }}>
								Meniu
							</span>
							<button
								onClick={closeMenu}
								className="p-2 rounded-lg hover:bg-yellow-100/20 transition-colors duration-200"
								aria-label="Close menu"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="#fff"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div
							className="flex-1 flex flex-col p-4"
							style={{ backgroundColor: "rgb(255 237 213 / 0.8)" }}
						>
							<Link
								href="/news"
								className="py-3 px-4 rounded-lg hover:bg-orange-50 text-[#774E3C] font-medium transition-colors duration-200"
								onClick={closeMenu}
							>
								Știri
							</Link>
							<Link
								href="/events"
								className="py-3 px-4 rounded-lg hover:bg-orange-50 text-[#774E3C] font-medium transition-colors duration-200"
								onClick={closeMenu}
							>
								Evenimente
							</Link>
							<Link
								href="/groups"
								className="py-3 px-4 rounded-lg hover:bg-orange-50 text-[#774E3C] font-medium transition-colors duration-200"
								onClick={closeMenu}
							>
								Grupuri
							</Link>
							<Link
								href="/directory"
								className="py-3 px-4 rounded-lg hover:bg-orange-50 text-[#774E3C] font-medium transition-colors duration-200"
								onClick={closeMenu}
							>
								Afaceri Locale
							</Link>
							<Link
								href="/forum"
								className="py-3 px-4 rounded-lg hover:bg-orange-50 text-[#774E3C] font-medium transition-colors duration-200"
								onClick={closeMenu}
							>
								Forum
							</Link>
							<Link
								href="/suggestions"
								className="py-3 px-4 rounded-lg hover:bg-orange-50 text-[#774E3C] font-medium transition-colors duration-200"
								onClick={closeMenu}
							>
								Sugestii
							</Link>
							<div className="border-t border-gray-200 my-2"></div>
							<Link
								href="/login"
								className="py-3 px-4 rounded-lg hover:bg-orange-50 text-[#774E3C] font-medium transition-colors duration-200"
								onClick={closeMenu}
							>
								Login
							</Link>
							<Link
								href="/register"
								className="py-3 px-4 rounded-lg hover:bg-orange-50 text-[#774E3C] font-medium transition-colors duration-200"
								onClick={closeMenu}
							>
								Înregistrare
							</Link>
						</div>
					</div>
				</>
			)}
		</nav>
	);
}
