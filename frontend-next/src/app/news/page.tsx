"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { newsAPI, News } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import Navigation from "../../components/Navigation";

export default function NewsPage() {
	const [news, setNews] = useState<News[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		fetchNews();
	}, []);

	const fetchNews = async () => {
		try {
			setLoading(true);
			const data = await newsAPI.getAll();
			setNews(data);
		} catch (error) {
			console.error("Error fetching news:", error);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("ro-RO", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

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
						Știri și Anunțuri
					</h1>
					<p className="text-lg" style={{ color: "#774E3C" }}>
						Fii la curent cu ultimele știri și anunțuri din comunitatea Florești
					</p>
				</div>

				{/* Content */}
				{loading ? (
					<div className="text-center py-12">
						<div
							className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
							style={{ borderColor: "#774E3C" }}
						></div>
						<p className="mt-4" style={{ color: "#774E3C" }}>
							Se încarcă știrile...
						</p>
					</div>
				) : (
					<div className="space-y-8">
						{news.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-4xl mb-4">📰</div>
								<h3
									className="text-xl font-semibold mb-2"
									style={{ color: "#774E3C" }}
								>
									Nu există știri
								</h3>
								<p className="text-gray-600">
									Nu există știri publicate momentan.
								</p>
							</div>
						) : (
							news.map((article) => (
								<article
									key={article.id}
									className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
								>
									<div className="md:flex">
										{article.imageUrl && (
											<div className="md:flex-shrink-0">
												<img
													className="h-48 w-full object-cover md:w-48"
													src={article.imageUrl}
													alt={article.title}
												/>
											</div>
										)}
										<div className="p-6">
											<div className="flex items-center mb-2">
												<span className="text-sm text-gray-500">
													{formatDate(article.publishedAt)}
												</span>
												<span className="mx-2 text-gray-300">•</span>
												<span className="text-sm text-gray-500">
													{article.author}
												</span>
											</div>
											<h2
												className="text-xl font-semibold mb-3"
												style={{ color: "#774E3C" }}
											>
												{article.title}
											</h2>
											<p className="text-gray-600 leading-relaxed">
												{article.content.length > 200
													? `${article.content.substring(0, 200)}...`
													: article.content}
											</p>
											{article.content.length > 200 && (
												<button
													className="mt-4 text-sm font-medium hover:underline"
													style={{ color: "#774E3C" }}
												>
													Citește mai mult
												</button>
											)}
										</div>
									</div>
								</article>
							))
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
								href="/news/create"
								className="px-4 py-2 rounded-md text-white hover:opacity-90 transition"
								style={{ backgroundColor: "#774E3C" }}
							>
								Adaugă știre nouă
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
