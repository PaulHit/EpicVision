"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { forumAPI, ForumPost } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

export default function ForumPage() {
	const [posts, setPosts] = useState<ForumPost[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

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
						<Link
							href="/forum/create"
							className="inline-flex items-center px-6 py-3 rounded-md text-white hover:opacity-90 transition"
							style={{ backgroundColor: "#774E3C" }}
						>
							<span className="mr-2">✏️</span>
							Creează o întrebare nouă
						</Link>
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
