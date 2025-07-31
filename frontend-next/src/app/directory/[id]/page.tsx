"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { businessesAPI, LocalBusiness } from "../../../lib/api";
import { useAuth } from "../../../lib/auth-context";
import Navigation from "../../../components/Navigation";

const CATEGORY_LABELS: Record<string, string> = {
	FOOD: "Mâncare și Băuturi",
	HEALTH: "Sănătate",
	EDUCATION: "Educație",
	ENTERTAINMENT: "Divertisment",
	SHOPPING: "Cumpărături",
	SERVICES: "Servicii",
	OTHER: "Altele",
};

export default function BusinessDetailPage() {
	const params = useParams();
	const router = useRouter();
	const { user } = useAuth();
	const [business, setBusiness] = useState<LocalBusiness | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const businessId = Number(params.id);

	useEffect(() => {
		if (businessId) {
			fetchBusiness();
		}
	}, [businessId]);

	const fetchBusiness = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await businessesAPI.getById(businessId);
			setBusiness(data);
		} catch (error) {
			console.error("Error fetching business:", error);
			setError("Nu s-a putut încărca afacerea.");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen">
				<Navigation />
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center py-12">
						<div
							className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
							style={{ borderColor: "#774E3C" }}
						></div>
						<p className="mt-4" style={{ color: "#774E3C" }}>
							Se încarcă afacerea...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (error || !business) {
		return (
			<div className="min-h-screen">
				<Navigation />
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center py-12">
						<div className="text-4xl mb-4">❌</div>
						<h3
							className="text-xl font-semibold mb-2"
							style={{ color: "#774E3C" }}
						>
							Afacerea nu a fost găsită
						</h3>
						<p className="text-gray-600 mb-6">
							{error || "Afacerea pe care o cauți nu există."}
						</p>
						<Link
							href="/directory"
							className="px-6 py-2 rounded-md text-white hover:opacity-90 transition"
							style={{ backgroundColor: "#774E3C" }}
						>
							Înapoi la afaceri
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<Navigation />

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Back Button */}
				<div className="mb-6">
					<Link
						href="/directory"
						className="inline-flex items-center text-sm hover:opacity-80 transition"
						style={{ color: "#774E3C" }}
					>
						<svg
							className="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Înapoi la afaceri
					</Link>
				</div>

				{/* Business Header */}
				<div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
					<div className="p-8">
						<div className="flex items-center justify-between mb-4">
							<h1
								className="text-3xl md:text-4xl font-bold"
								style={{ color: "#774E3C", fontFamily: "Libre Baskerville, serif" }}
							>
								{business.name}
							</h1>
							<span
								className="px-3 py-1 rounded-full text-sm font-medium"
								style={{ backgroundColor: "#E8DCC4", color: "#774E3C" }}
							>
								{CATEGORY_LABELS[business.category] || business.category}
							</span>
						</div>
						<div className="flex flex-wrap gap-4 text-lg">
							<div className="flex items-center">
								<span className="font-medium mr-2">📍</span>
								<span>{business.location}</span>
							</div>
							{business.contactInfo && (
								<div className="flex items-center">
									<span className="font-medium mr-2">📞</span>
									<span>{business.contactInfo}</span>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Business Details */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-xl shadow-lg p-8 mb-8">
							<h2
								className="text-2xl font-bold mb-6"
								style={{ color: "#774E3C" }}
							>
								Despre afacere
							</h2>
							<div className="prose max-w-none">
								<p className="text-gray-700 leading-relaxed text-lg">
									{business.description}
								</p>
							</div>
						</div>

						{/* Map Section */}
						<div className="bg-white rounded-xl shadow-lg p-8">
							<h2
								className="text-2xl font-bold mb-6"
								style={{ color: "#774E3C" }}
							>
								Locația afacerii
							</h2>
							<div className="bg-gray-100 rounded-lg p-8 text-center">
								<div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
									<div className="text-center">
										<div className="text-4xl mb-2">🗺️</div>
										<p className="text-gray-600">Hartă interactivă</p>
										<p className="text-sm text-gray-500 mt-2">
											Locația: {business.location}
										</p>
									</div>
								</div>
								<p className="text-sm text-gray-600">
									Aici va fi integrată o hartă interactivă care va afișa locația exactă a afacerii.
								</p>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
							<h3
								className="text-xl font-bold mb-4"
								style={{ color: "#774E3C" }}
							>
								Informații de contact
							</h3>
							<div className="space-y-4">
								<div>
									<span className="font-semibold text-gray-700">Nume:</span>
									<p className="text-gray-600">{business.name}</p>
								</div>
								<div>
									<span className="font-semibold text-gray-700">Categoria:</span>
									<p className="text-gray-600">
										{CATEGORY_LABELS[business.category] || business.category}
									</p>
								</div>
								<div>
									<span className="font-semibold text-gray-700">Locația:</span>
									<p className="text-gray-600">{business.location}</p>
								</div>
								{business.contactInfo && (
									<div>
										<span className="font-semibold text-gray-700">Contact:</span>
										<p className="text-gray-600">{business.contactInfo}</p>
									</div>
								)}
								{user && (
									<div className="pt-4 border-t border-gray-200 space-y-2">
										<button
											className="w-full px-4 py-2 rounded-lg text-white hover:opacity-90 transition font-semibold"
											style={{ backgroundColor: "#774E3C" }}
										>
											Salvează în favorite
										</button>
										<button
											className="w-full px-4 py-2 rounded-lg border-2 hover:opacity-90 transition font-semibold"
											style={{ 
												backgroundColor: "#E8DCC4", 
												borderColor: "#774E3C",
												color: "#774E3C"
											}}
										>
											Partajează
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

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
								href={`/directory/${business.id}/edit`}
								className="px-4 py-2 rounded-md text-white hover:opacity-90 transition"
								style={{ backgroundColor: "#774E3C" }}
							>
								Editează afacerea
							</Link>
							<button
								className="px-4 py-2 rounded-md text-white hover:opacity-90 transition"
								style={{ backgroundColor: "#952636" }}
							>
								Șterge afacerea
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
} 