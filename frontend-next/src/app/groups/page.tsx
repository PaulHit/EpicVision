"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { groupsAPI, CommunityGroup } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import Navigation from "../../components/Navigation";

export default function GroupsPage() {
	const [groups, setGroups] = useState<CommunityGroup[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		fetchGroups();
	}, []);

	const fetchGroups = async () => {
		try {
			setLoading(true);
			const data = await groupsAPI.getAll();
			setGroups(data);
		} catch (error) {
			console.error("Error fetching groups:", error);
		} finally {
			setLoading(false);
		}
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
						Grupuri Comunitare
					</h1>
					<p className="text-lg" style={{ color: "#774E3C" }}>
						Alătură-te grupurilor sociale și conectează-te cu membrii
						comunității
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
							Se încarcă grupurile...
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{groups.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-4xl mb-4">👥</div>
								<h3
									className="text-xl font-semibold mb-2"
									style={{ color: "#774E3C" }}
								>
									Nu există grupuri
								</h3>
								<p className="text-gray-600">
									Nu există grupuri comunitare create momentan.
								</p>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{groups.map((group) => (
									<div
										key={group.id}
										className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
									>
										<h3
											className="text-lg font-semibold mb-3"
											style={{ color: "#774E3C" }}
										>
											{group.name}
										</h3>
										<p className="text-gray-600 mb-4 text-sm">
											{group.description}
										</p>
										<div className="flex gap-2">
											<Link
												href={`/groups/${group.id}`}
												className="flex-1 px-4 py-2 text-center rounded-md text-white hover:opacity-90 transition"
												style={{ backgroundColor: "#774E3C" }}
											>
												Vezi grupul
											</Link>
											{group.whatsappUrl && (
												<a
													href={group.whatsappUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="px-4 py-2 rounded-md text-white hover:opacity-90 transition"
													style={{ backgroundColor: "#25D366" }}
												>
													WhatsApp
												</a>
											)}
										</div>
									</div>
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
								href="/groups/create"
								className="px-4 py-2 rounded-md text-white hover:opacity-90 transition"
								style={{ backgroundColor: "#774E3C" }}
							>
								Creează grup nou
							</Link>
						</div>
					</div>
				)}

				{/* Forum Section */}
				<div className="mt-12 pt-8 border-t border-gray-200">
					<h2
						className="text-2xl font-bold mb-6"
						style={{ color: "#774E3C", fontFamily: "Libre Baskerville, serif" }}
					>
						Forum Comunitate
					</h2>
					<p className="text-gray-600 mb-6">
						Întreabă și răspunde la întrebări anonim în forumul comunității.
					</p>
					<div className="flex gap-4">
						<Link
							href="/forum"
							className="px-6 py-3 rounded-md text-white hover:opacity-90 transition"
							style={{ backgroundColor: "#774E3C" }}
						>
							Vezi forumul
						</Link>
						{user && (
							<Link
								href="/forum/create"
								className="px-6 py-3 rounded-md border-2 hover:opacity-90 transition"
								style={{
									backgroundColor: "#E8DCC4",
									borderColor: "#774E3C",
									color: "#774E3C",
								}}
							>
								Creează postare
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
