"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { suggestionsAPI, Suggestion } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import Navigation from "../../components/Navigation";

const SUGGESTION_CATEGORIES = [
	"INFRASTRUCTURE",
	"HEALTH",
	"EDUCATION",
	"ENVIRONMENT",
	"SAFETY",
	"CULTURE",
	"OTHER",
];

const CATEGORY_LABELS: Record<string, string> = {
	INFRASTRUCTURE: "Infrastructură",
	HEALTH: "Sănătate",
	EDUCATION: "Educație",
	ENVIRONMENT: "Mediu",
	SAFETY: "Siguranță",
	CULTURE: "Cultură",
	OTHER: "Altele",
};

export default function SuggestionsPage() {
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("");
	const { user } = useAuth();

	// Modal state
	const [showModal, setShowModal] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newCategory, setNewCategory] = useState(SUGGESTION_CATEGORIES[0]);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchSuggestions();
	}, []);

	const fetchSuggestions = async () => {
		try {
			setLoading(true);
			const data = await suggestionsAPI.getAll();
			setSuggestions(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateSuggestion = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTitle.trim() || !newDescription.trim()) {
			setError("Completează titlul și descrierea sugestiei.");
			return;
		}
		setSubmitting(true);
		setError(null);
		try {
			await suggestionsAPI.create({
				title: newTitle,
				description: newDescription,
				category: newCategory,
			});
			setShowModal(false);
			setNewTitle("");
			setNewDescription("");
			setNewCategory(SUGGESTION_CATEGORIES[0]);
			await fetchSuggestions();
		} catch (err) {
			setError("A apărut o eroare la trimiterea sugestiei.");
		} finally {
			setSubmitting(false);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("ro-RO", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const filteredSuggestions = selectedCategory
		? suggestions.filter((s) => s.category === selectedCategory)
		: suggestions;

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
						Cutia de Sugestii
					</h1>
					<p className="text-lg" style={{ color: "#774E3C" }}>
						Trimite sugestii anonim către autoritățile locale pentru
						îmbunătățirea comunității
					</p>
				</div>

				{/* Info Box */}
				<div
					className="mb-8 p-6 rounded-lg"
					style={{ backgroundColor: "#E8DCC4" }}
				>
					<h3
						className="text-lg font-semibold mb-2"
						style={{ color: "#774E3C" }}
					>
						Despre Cutia de Sugestii
					</h3>
					<ul className="text-sm space-y-1" style={{ color: "#774E3C" }}>
						<li>
							• Toate sugestiile sunt anonime pentru a proteja
							confidențialitatea
						</li>
						<li>• Sugestiile sunt trimise direct către primăria Florești</li>
						<li>• Poți vota sugestiile altora pentru a arăta sprijinul</li>
						<li>• Fiecare sugestie este analizată de autoritățile locale</li>
					</ul>
				</div>

				{/* Create Suggestion Button */}
				{user && (
					<div className="mb-8">
						<button
							onClick={() => setShowModal(true)}
							className="inline-flex items-center px-6 py-3 rounded-md text-white hover:opacity-90 transition"
							style={{ backgroundColor: "#774E3C" }}
						>
							<span className="mr-2">💡</span>
							Trimite o sugestie nouă
						</button>
					</div>
				)}

				{/* Modal for new suggestion */}
				{showModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
						<div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
							<button
								onClick={() => setShowModal(false)}
								className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl"
								aria-label="Închide"
							>
								&times;
							</button>
							<h2
								className="text-2xl font-bold mb-4"
								style={{ color: "#774E3C" }}
							>
								Trimite o sugestie nouă
							</h2>
							<form onSubmit={handleCreateSuggestion} className="space-y-4">
								<div>
									<label
										className="block text-sm font-medium mb-1"
										style={{ color: "#774E3C" }}
									>
										Titlu
									</label>
									<input
										type="text"
										value={newTitle}
										onChange={(e) => setNewTitle(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
										maxLength={100}
										required
									/>
								</div>
								<div>
									<label
										className="block text-sm font-medium mb-1"
										style={{ color: "#774E3C" }}
									>
										Descriere
									</label>
									<textarea
										value={newDescription}
										onChange={(e) => setNewDescription(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
										rows={5}
										maxLength={1000}
										required
									/>
								</div>
								<div>
									<label
										className="block text-sm font-medium mb-1"
										style={{ color: "#774E3C" }}
									>
										Categorie
									</label>
									<select
										value={newCategory}
										onChange={(e) => setNewCategory(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
									>
										{SUGGESTION_CATEGORIES.map((cat) => (
											<option key={cat} value={cat}>
												{CATEGORY_LABELS[cat]}
											</option>
										))}
									</select>
								</div>
								{error && <div className="text-red-600 text-sm">{error}</div>}
								<button
									type="submit"
									className="w-full px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
									style={{ backgroundColor: "#774E3C" }}
									disabled={submitting}
								>
									{submitting ? "Se trimite..." : "Trimite sugestia"}
								</button>
							</form>
						</div>
					</div>
				)}

				{/* Category Filter */}
				<div className="mb-8">
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
						{SUGGESTION_CATEGORIES.map((category) => (
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

				{/* Content */}
				{loading ? (
					<div className="text-center py-12">
						<div
							className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
							style={{ borderColor: "#774E3C" }}
						></div>
						<p className="mt-4" style={{ color: "#774E3C" }}>
							Se încarcă sugestiile...
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{filteredSuggestions.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-4xl mb-4">💡</div>
								<h3
									className="text-xl font-semibold mb-2"
									style={{ color: "#774E3C" }}
								>
									Nu există sugestii
								</h3>
								<p className="text-gray-600 mb-4">
									{selectedCategory
										? `Nu există sugestii în categoria "${CATEGORY_LABELS[selectedCategory]}".`
										: "Nu există sugestii trimise momentan."}
								</p>
								{user && (
									<Link
										href="/suggestions/create"
										className="inline-flex items-center px-4 py-2 rounded-md text-white hover:opacity-90 transition"
										style={{ backgroundColor: "#774E3C" }}
									>
										Fii primul care trimite o sugestie!
									</Link>
								)}
							</div>
						) : (
							filteredSuggestions.map((suggestion) => (
								<div
									key={suggestion.id}
									className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<span
													className="inline-block px-2 py-1 text-xs font-medium rounded-full"
													style={{
														backgroundColor: "#E8DCC4",
														color: "#774E3C",
													}}
												>
													{CATEGORY_LABELS[suggestion.category] ||
														suggestion.category}
												</span>
												<span className="text-sm text-gray-500">
													{formatDate(suggestion.createdAt)}
												</span>
											</div>
											<h3
												className="text-lg font-semibold mb-2"
												style={{ color: "#774E3C" }}
											>
												{suggestion.title}
											</h3>
											<p className="text-gray-600 mb-4">
												{suggestion.description}
											</p>
											<div className="flex items-center justify-between text-sm">
												<span className="text-gray-500">Sugestie anonimă</span>
												<div className="flex items-center space-x-4">
													<button className="flex items-center space-x-1 hover:text-orange-600 transition">
														<span>👍</span>
														<span>0</span>
													</button>
													<button className="flex items-center space-x-1 hover:text-orange-600 transition">
														<span>👎</span>
														<span>0</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				)}

				{/* Status Info */}
				<div
					className="mt-12 p-6 rounded-lg border-2 border-dashed"
					style={{ borderColor: "#774E3C" }}
				>
					<h3
						className="text-lg font-semibold mb-2"
						style={{ color: "#774E3C" }}
					>
						Status Sugestii
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
						<div className="text-center">
							<div className="text-2xl font-bold" style={{ color: "#774E3C" }}>
								{suggestions.length}
							</div>
							<div className="text-gray-600">Sugestii trimise</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold" style={{ color: "#774E3C" }}>
								0
							</div>
							<div className="text-gray-600">În procesare</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold" style={{ color: "#774E3C" }}>
								0
							</div>
							<div className="text-gray-600">Implementate</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
