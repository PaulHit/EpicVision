"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { eventsAPI, Event } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";
import Navigation from "../../components/Navigation";

export default function EventsPage() {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedDate, setSelectedDate] = useState("");
	const [showMap, setShowMap] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		fetchEvents();
	}, [selectedDate]);

	const fetchEvents = async () => {
		try {
			setLoading(true);
			const data = await eventsAPI.getAll(selectedDate || undefined);
			setEvents(data);
		} catch (error) {
			console.error("Error fetching events:", error);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("ro-RO", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getCurrentDate = () => {
		const today = new Date();
		return today.toISOString().split("T")[0];
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
						Evenimente în Florești
					</h1>
					<p className="text-lg" style={{ color: "#774E3C" }}>
						Descoperă evenimentele locale și participă la activitățile
						comunității
					</p>
				</div>

				{/* Controls */}
				<div className="flex flex-col sm:flex-row gap-4 mb-8">
					<div className="flex-1">
						<label
							htmlFor="date"
							className="block text-sm font-medium mb-2"
							style={{ color: "#774E3C" }}
						>
							Filtrează după dată
						</label>
						<input
							type="date"
							id="date"
							value={selectedDate}
							onChange={(e) => setSelectedDate(e.target.value)}
							min={getCurrentDate()}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
						/>
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => setShowMap(false)}
							className={`px-4 py-2 rounded-md transition ${
								!showMap ? "text-white" : "text-gray-700 hover:text-gray-900"
							}`}
							style={{
								backgroundColor: !showMap ? "#774E3C" : "#E8DCC4",
							}}
						>
							Listă
						</button>
						<button
							onClick={() => setShowMap(true)}
							className={`px-4 py-2 rounded-md transition ${
								showMap ? "text-white" : "text-gray-700 hover:text-gray-900"
							}`}
							style={{
								backgroundColor: showMap ? "#774E3C" : "#E8DCC4",
							}}
						>
							Hartă
						</button>
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
							Se încarcă evenimentele...
						</p>
					</div>
				) : showMap ? (
					/* Map View */
					<div className="bg-gray-100 rounded-lg p-8 text-center">
						<div className="max-w-md mx-auto">
							<div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
								<div className="text-center">
									<div className="text-4xl mb-2">🗺️</div>
									<p className="text-gray-600">Hartă interactivă</p>
									<p className="text-sm text-gray-500 mt-2">
										Aici va fi integrată o hartă interactivă similară cu Airbnb
									</p>
								</div>
							</div>
							<p className="text-sm text-gray-600">
								Harta va afișa evenimentele pe o hartă interactivă cu
								posibilitatea de zoom și navigare.
							</p>
						</div>
					</div>
				) : (
					/* List View */
					<div className="space-y-6">
						{events.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-4xl mb-4">📅</div>
								<h3
									className="text-xl font-semibold mb-2"
									style={{ color: "#774E3C" }}
								>
									Nu există evenimente
								</h3>
								<p className="text-gray-600">
									{selectedDate
										? `Nu există evenimente pentru data selectată.`
										: "Nu există evenimente programate momentan."}
								</p>
							</div>
						) : (
							events.map((event) => (
								<Link
									key={event.id}
									href={`/events/${event.id}`}
									className="block"
								>
									<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
										<div className="flex flex-col md:flex-row gap-6">
											{event.flyerUrl && (
												<div className="flex-shrink-0">
													<img
														src={event.flyerUrl}
														alt={event.title}
														className="w-32 h-32 object-cover rounded-lg"
													/>
												</div>
											)}
											<div className="flex-1">
												<h3
													className="text-xl font-semibold mb-2"
													style={{ color: "#774E3C" }}
												>
													{event.title}
												</h3>
												<p className="text-gray-600 mb-4">
													{event.description}
												</p>
												<div className="flex flex-wrap gap-4 text-sm">
													<div className="flex items-center">
														<span
															className="font-medium"
															style={{ color: "#774E3C" }}
														>
															📅
														</span>
														<span className="ml-2">
															{formatDate(event.dateTime)}
														</span>
													</div>
													<div className="flex items-center">
														<span
															className="font-medium"
															style={{ color: "#774E3C" }}
														>
															📍
														</span>
														<span className="ml-2">{event.location}</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Link>
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
								href="/events/create"
								className="px-4 py-2 rounded-md text-white hover:opacity-90 transition"
								style={{ backgroundColor: "#774E3C" }}
							>
								Adaugă eveniment nou
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
