"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { businessesAPI, LocalBusiness } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import Navigation from "../../components/Navigation";

const CATEGORIES = [
	"FOOD",
	"HEALTH",
	"EDUCATION",
	"ENTERTAINMENT",
	"SHOPPING",
	"SERVICES",
	"OTHER",
];

const CATEGORY_LABELS: Record<string, string> = {
	FOOD: "Mâncare și Băuturi",
	HEALTH: "Sănătate",
	EDUCATION: "Educație",
	ENTERTAINMENT: "Divertisment",
	SHOPPING: "Cumpărături",
	SERVICES: "Servicii",
	OTHER: "Altele",
};

export default function DirectoryPage() {
	const [businesses, setBusinesses] = useState<LocalBusiness[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchKeyword, setSearchKeyword] = useState("");
	const [searchResults, setSearchResults] = useState<LocalBusiness[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		fetchBusinesses();
	}, [selectedCategory]);

	const fetchBusinesses = async () => {
		try {
			setLoading(true);
			const data = await businessesAPI.getAll(selectedCategory || undefined);
			setBusinesses(data);
		} catch (error) {
			console.error("Error fetching businesses:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = async () => {
		if (!searchKeyword.trim()) {
			setSearchResults([]);
			setIsSearching(false);
			return;
		}

		try {
			setIsSearching(true);
			const data = await businessesAPI.search(searchKeyword);
			setSearchResults(data);
		} catch (error) {
			console.error("Error searching businesses:", error);
		} finally {
			setIsSearching(false);
		}
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSearch();
	};

	const displayBusinesses = searchKeyword.trim() ? searchResults : businesses;

	return (
		<div className="min-h-screen">
			<Navigation />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1
						className="text-4xl font-bold mb-4"
						style={{ color: "#774E3C", fontFamily: "Libre Baskerville, serif" }}
					>
						Directorul Local
					</h1>
					<p className="text-lg" style={{ color: "#774E3C" }}>
						Descoperă afacerile și serviciile locale din Florești
					</p>
				</div>

				{/* Search and Filters */}
				<div className="mb-8 space-y-4">
					{/* Search */}
					<form onSubmit={handleSearchSubmit} className="flex gap-2">
						<input
							type="text"
							placeholder="Caută afaceri și servicii..."
							value={searchKeyword}
							onChange={(e) => setSearchKeyword(e.target.value)}
							className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
						/>
						<button
							type="submit"
							className="px-6 py-2 rounded-md text-white hover:opacity-90 transition"
							style={{ backgroundColor: "#774E3C" }}
						>
							Caută
						</button>
					</form>

					{/* Category Filter */}
					<div>
						<label
							className="block text-sm font-medium mb-2"
							style={{ color: "#774E3C" }}
						>
							Filtrează după categorie
						</label>
						<div className="flex flex-wrap gap-2">
							<button
								onClick={() => setSelectedCategory("")}
								className={`px-3 py-1 rounded-full text-sm transition ${
									selectedCategory === ""
										? "text-white"
										: "text-gray-700 hover:text-gray-900"
								}`}
								style={{
									backgroundColor:
										selectedCategory === "" ? "#774E3C" : "#E8DCC4",
								}}
							>
								Toate
							</button>
							{CATEGORIES.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-3 py-1 rounded-full text-sm transition ${
										selectedCategory === category
											? "text-white"
											: "text-gray-700 hover:text-gray-900"
									}`}
									style={{
										backgroundColor:
											selectedCategory === category ? "#774E3C" : "#E8DCC4",
									}}
								>
									{CATEGORY_LABELS[category]}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Content */}
				{loading ? (
					<div className="text-center py-12">
						<div
							className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
							style={{ borderColor: "#774E3C" }}
						></div>
						<p className="mt-4" style={{ color: "#774E3C" }}>
							Se încarcă afacerile...
						</p>
					</div>
				) : isSearching ? (
					<div className="text-center py-12">
						<div
							className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
							style={{ borderColor: "#774E3C" }}
						></div>
						<p className="mt-4" style={{ color: "#774E3C" }}>
							Se caută...
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{searchKeyword.trim() && (
							<div className="mb-4">
								<h3
									className="text-lg font-semibold"
									style={{ color: "#774E3C" }}
								>
									Rezultate pentru "{searchKeyword}"
								</h3>
								<button
									onClick={() => {
										setSearchKeyword("");
										setSearchResults([]);
									}}
									className="text-sm text-gray-500 hover:underline"
								>
									Șterge căutarea
								</button>
							</div>
						)}

						{displayBusinesses.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-4xl mb-4">🏪</div>
								<h3
									className="text-xl font-semibold mb-2"
									style={{ color: "#774E3C" }}
								>
									Nu există afaceri
								</h3>
								<p className="text-gray-600">
									{searchKeyword.trim()
										? "Nu s-au găsit afaceri pentru căutarea ta."
										: "Nu există afaceri înregistrate momentan."}
								</p>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{displayBusinesses.map((business) => (
									<Link
										key={business.id}
										href={`/directory/${business.id}`}
										className="block"
									>
										<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
											<div className="mb-4">
												<span
													className="inline-block px-2 py-1 text-xs font-medium rounded-full"
													style={{
														backgroundColor: "#E8DCC4",
														color: "#774E3C",
													}}
												>
													{CATEGORY_LABELS[business.category] ||
														business.category}
												</span>
											</div>
											<h3
												className="text-lg font-semibold mb-2"
												style={{ color: "#774E3C" }}
											>
												{business.name}
											</h3>
											<p className="text-gray-600 mb-4 text-sm">
												{business.description}
											</p>
											<div className="space-y-2 text-sm">
												<div className="flex items-center">
													<span
														className="font-medium"
														style={{ color: "#774E3C" }}
													>
														📍
													</span>
													<span className="ml-2">{business.location}</span>
												</div>
												<div className="flex items-center">
													<span
														className="font-medium"
														style={{ color: "#774E3C" }}
													>
														📞
													</span>
													<span className="ml-2">{business.contactInfo}</span>
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						)}
					</div>
				)}

				{/* Admin Actions */}
				{user && (
					<div className="mt-8 pt-8 border-t border-gray-200">
						<h3
							className="text-lg font-semibold mb-4"
							style={{ color: "#774E3C" }}
						>
							Acțiuni pentru administratori
						</h3>
						<div className="flex gap-4">
							<Link
								href="/directory/create"
								className="px-4 py-2 rounded-md text-white hover:opacity-90 transition"
								style={{ backgroundColor: "#774E3C" }}
							>
								Adaugă afacere nouă
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
