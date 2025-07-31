"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { forumAPI, ForumPost } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import Navigation from "../../components/Navigation";

export default function ForumPage() {
	const [posts, setPosts] = useState<ForumPost[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	// Modal state
	const [showModal, setShowModal] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			setLoading(true);
			const data = await forumAPI.getAll();
			setPosts(data);
		} catch (error) {
			console.error("Error fetching posts:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleCreatePost = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTitle.trim() || !newContent.trim()) {
			setError("Completează titlul și conținutul întrebării.");
			return;
		}
		setSubmitting(true);
		setError(null);
		try {
			await forumAPI.create({ title: newTitle, content: newContent });
			setShowModal(false);
			setNewTitle("");
			setNewContent("");
			await fetchPosts();
		} catch (err) {
			setError("A apărut o eroare la crearea întrebării.");
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
						Forum Comunitate
					</h1>
					<p className="text-lg" style={{ color: "#774E3C" }}>
						Întreabă și răspunde la întrebări anonim în comunitatea Florești
					</p>
				</div>

				{/* Create Post Button */}
				{user && (
					<div className="mb-8">
						<button
							onClick={() => setShowModal(true)}
							className="inline-flex items-center px-6 py-3 rounded-md text-white hover:opacity-90 transition"
							style={{ backgroundColor: "#774E3C" }}
						>
							<span className="mr-2">✏️</span>
							Creează o întrebare nouă
						</button>
					</div>
				)}

				{/* Modal for new question */}
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
								Pune o întrebare nouă
							</h2>
							<form onSubmit={handleCreatePost} className="space-y-4">
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
										Conținut
									</label>
									<textarea
										value={newContent}
										onChange={(e) => setNewContent(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
										rows={5}
										maxLength={1000}
										required
									/>
								</div>
								{error && <div className="text-red-600 text-sm">{error}</div>}
								<button
									type="submit"
									className="w-full px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
									style={{ backgroundColor: "#774E3C" }}
									disabled={submitting}
								>
									{submitting ? "Se trimite..." : "Trimite întrebarea"}
								</button>
							</form>
						</div>
					</div>
				)}

				{/* Content */}
				{loading ? (
					<div className="text-center py-12">
						<div
							className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
							style={{ borderColor: "#774E3C" }}
						></div>
						<p className="mt-4" style={{ color: "#774E3C" }}>
							Se încarcă postările...
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{posts.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-4xl mb-4">💬</div>
								<h3
									className="text-xl font-semibold mb-2"
									style={{ color: "#774E3C" }}
								>
									Nu există întrebări
								</h3>
								<p className="text-gray-600 mb-4">
									Nu există întrebări în forum momentan.
								</p>
								{user && (
									<Link
										href="/forum/create"
										className="inline-flex items-center px-4 py-2 rounded-md text-white hover:opacity-90 transition"
										style={{ backgroundColor: "#774E3C" }}
									>
										Fii primul care întreabă!
									</Link>
								)}
							</div>
						) : (
							posts.map((post) => (
								<div
									key={post.id}
									className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h3
												className="text-lg font-semibold mb-2"
												style={{ color: "#774E3C" }}
											>
												{post.title}
											</h3>
											<p className="text-gray-600 mb-4">
												{post.content.length > 200
													? `${post.content.substring(0, 200)}...`
													: post.content}
											</p>
											<div className="flex items-center justify-between text-sm text-gray-500">
												<span>
													Postat anonim • {formatDate(post.createdAt)}
												</span>
												<div className="flex items-center space-x-4">
													<button className="flex items-center space-x-1 hover:text-orange-600 transition">
														<span>👍</span>
														<span>0</span>
													</button>
													<button className="flex items-center space-x-1 hover:text-orange-600 transition">
														<span>👎</span>
														<span>0</span>
													</button>
													<Link
														href={`/forum/${post.id}`}
														className="text-orange-600 hover:underline"
													>
														Vezi răspunsuri
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				)}

				{/* Info Box */}
				<div
					className="mt-12 p-6 rounded-lg"
					style={{ backgroundColor: "#E8DCC4" }}
				>
					<h3
						className="text-lg font-semibold mb-2"
						style={{ color: "#774E3C" }}
					>
						Despre Forumul Comunității
					</h3>
					<ul className="text-sm space-y-1" style={{ color: "#774E3C" }}>
						<li>
							• Toate întrebările sunt anonime pentru a proteja
							confidențialitatea
						</li>
						<li>
							• Poți vota întrebările și răspunsurile pentru a ajuta comunitatea
						</li>
						<li>
							• Răspunsurile sunt moderată pentru a menține un mediu respectuos
						</li>
						<li>• Întreabă orice despre comunitatea Florești</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
