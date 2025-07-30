"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../lib/auth-context";

export default function ProfilePage() {
	const { user, logout } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		username: user?.username || "",
		email: user?.email || "",
		interests: user?.interests || [],
	});

	const INTERESTS = [
		"Evenimente locale",
		"Știri comunitare",
		"Grupuri sociale",
		"Afaceri locale",
		"Sănătate",
		"Educație",
		"Sport",
		"Cultură",
		"Mediu",
		"Tehnologie",
		"Voluntariat",
		"Altele",
	];

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleInterestToggle = (interest: string) => {
		setFormData((prev) => ({
			...prev,
			interests: prev.interests.includes(interest)
				? prev.interests.filter((i) => i !== interest)
				: [...prev.interests, interest],
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement profile update API call
		setIsEditing(false);
	};

	const handleLogout = () => {
		logout();
	};

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4" style={{ color: "#774E3C" }}>
						Trebuie să fii conectat
					</h2>
					<p className="text-gray-600 mb-4">
						Pentru a accesa profilul tău, trebuie să te conectezi.
					</p>
					<Link
						href="/login"
						className="px-6 py-2 rounded-md text-white hover:opacity-90 transition"
						style={{ backgroundColor: "#774E3C" }}
					>
						Conectează-te
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			{/* Navigation */}
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
							<span className="text-white text-sm">Bună, {user.username}!</span>
							<Link
								href="/profile"
								className="text-white hover:text-orange-100 transition"
							>
								Profil
							</Link>
						</div>
					</div>
				</div>
			</nav>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1
						className="text-4xl font-bold mb-4"
						style={{ color: "#774E3C", fontFamily: "Libre Baskerville, serif" }}
					>
						Profilul meu
					</h1>
					<p className="text-lg" style={{ color: "#774E3C" }}>
						Gestionează informațiile contului tău
					</p>
				</div>

				{/* Profile Form */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
					<form onSubmit={handleSubmit}>
						<div className="space-y-6">
							{/* Username */}
							<div>
								<label
									htmlFor="username"
									className="block text-sm font-medium mb-2"
									style={{ color: "#774E3C" }}
								>
									Nume utilizator
								</label>
								<input
									type="text"
									id="username"
									name="username"
									value={formData.username}
									onChange={handleInputChange}
									disabled={!isEditing}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium mb-2"
									style={{ color: "#774E3C" }}
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									disabled={!isEditing}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
								/>
							</div>

							{/* Interests */}
							<div>
								<label
									className="block text-sm font-medium mb-2"
									style={{ color: "#774E3C" }}
								>
									Interese
								</label>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{INTERESTS.map((interest) => (
										<label key={interest} className="flex items-center">
											<input
												type="checkbox"
												checked={formData.interests.includes(interest)}
												onChange={() => handleInterestToggle(interest)}
												disabled={!isEditing}
												className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded disabled:opacity-50"
											/>
											<span
												className="ml-2 text-sm"
												style={{ color: "#774E3C" }}
											>
												{interest}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Actions */}
							<div className="flex gap-4 pt-6">
								{isEditing ? (
									<>
										<button
											type="submit"
											className="px-6 py-2 rounded-md text-white hover:opacity-90 transition"
											style={{ backgroundColor: "#774E3C" }}
										>
											Salvează
										</button>
										<button
											type="button"
											onClick={() => setIsEditing(false)}
											className="px-6 py-2 rounded-md border-2 hover:opacity-90 transition"
											style={{
												backgroundColor: "#E8DCC4",
												borderColor: "#774E3C",
												color: "#774E3C",
											}}
										>
											Anulează
										</button>
									</>
								) : (
									<button
										type="button"
										onClick={() => setIsEditing(true)}
										className="px-6 py-2 rounded-md text-white hover:opacity-90 transition"
										style={{ backgroundColor: "#774E3C" }}
									>
										Editează profilul
									</button>
								)}
							</div>
						</div>
					</form>
				</div>

				{/* Account Actions */}
				<div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
					<h3
						className="text-lg font-semibold mb-4"
						style={{ color: "#774E3C" }}
					>
						Acțiuni cont
					</h3>
					<div className="space-y-4">
						<button
							onClick={handleLogout}
							className="w-full px-6 py-3 rounded-md border-2 hover:opacity-90 transition text-left"
							style={{
								backgroundColor: "#E8DCC4",
								borderColor: "#774E3C",
								color: "#774E3C",
							}}
						>
							🚪 Deconectează-te
						</button>
						<Link
							href="/"
							className="block w-full px-6 py-3 rounded-md text-white hover:opacity-90 transition text-center"
							style={{ backgroundColor: "#774E3C" }}
						>
							← Înapoi la pagina principală
						</Link>
					</div>
				</div>

				{/* Quick Links */}
				<div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
					<h3
						className="text-lg font-semibold mb-4"
						style={{ color: "#774E3C" }}
					>
						Acces rapid
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<Link
							href="/events"
							className="p-4 rounded-lg border-2 hover:opacity-90 transition text-center"
							style={{
								backgroundColor: "#E8DCC4",
								borderColor: "#774E3C",
								color: "#774E3C",
							}}
						>
							📅 Evenimente
						</Link>
						<Link
							href="/forum"
							className="p-4 rounded-lg border-2 hover:opacity-90 transition text-center"
							style={{
								backgroundColor: "#E8DCC4",
								borderColor: "#774E3C",
								color: "#774E3C",
							}}
						>
							💬 Forum
						</Link>
						<Link
							href="/suggestions"
							className="p-4 rounded-lg border-2 hover:opacity-90 transition text-center"
							style={{
								backgroundColor: "#E8DCC4",
								borderColor: "#774E3C",
								color: "#774E3C",
							}}
						>
							💡 Sugestii
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
