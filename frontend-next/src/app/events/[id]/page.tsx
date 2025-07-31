"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { eventsAPI, Event } from "../../../lib/api";
import { useAuth } from "../../../lib/auth-context";
import Navigation from "../../../components/Navigation";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
	() => import("react-leaflet").then((mod) => mod.MapContainer),
	{ ssr: false }
);
const TileLayer = dynamic(
	() => import("react-leaflet").then((mod) => mod.TileLayer),
	{ ssr: false }
);
const Marker = dynamic(
	() => import("react-leaflet").then((mod) => mod.Marker),
	{ ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
	ssr: false,
});

export default function EventDetailPage() {
	const params = useParams();
	const { user } = useAuth();
	const [event, setEvent] = useState<Event | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [coords, setCoords] = useState<[number, number] | null>(null);
	const [geocodeFailed, setGeocodeFailed] = useState(false);

	const FLORESTI_COORDS: [number, number] = [46.749, 23.476]; // Florești, Cluj

	const eventId = Number(params.id);

	useEffect(() => {
		if (eventId) {
			fetchEvent();
		}
	}, [eventId]);

	useEffect(() => {
		if (event && event.location) {
			setGeocodeFailed(false);
			fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(event.location)}`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data && data.length > 0) {
						setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
					} else {
						setCoords(FLORESTI_COORDS);
						setGeocodeFailed(true);
					}
				});
		}
	}, [event]);

	const fetchEvent = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await eventsAPI.getById(eventId);
			setEvent(data);
		} catch (error) {
			console.error("Error fetching event:", error);
			setError("Nu s-a putut încărca evenimentul.");
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

	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleTimeString("ro-RO", {
			hour: "2-digit",
			minute: "2-digit",
		});
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
							Se încarcă evenimentul...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (error || !event) {
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
							Evenimentul nu a fost găsit
						</h3>
						<p className="text-gray-600 mb-6">
							{error || "Evenimentul pe care îl cauți nu există."}
						</p>
						<Link
							href="/events"
							className="px-6 py-2 rounded-md text-white hover:opacity-90 transition"
							style={{ backgroundColor: "#774E3C" }}
						>
							Înapoi la evenimente
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
						href="/events"
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
						Înapoi la evenimente
					</Link>
				</div>

				{/* Event Header */}
				<div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
					{event.flyerUrl && (
						<div className="w-full h-64 md:h-96 relative">
							<img
								src={event.flyerUrl}
								alt={event.title}
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-20"></div>
						</div>
					)}
					<div className="p-8">
						<h1
							className="text-3xl md:text-4xl font-bold mb-4"
							style={{
								color: "#774E3C",
								fontFamily: "Libre Baskerville, serif",
							}}
						>
							{event.title}
						</h1>
						<div className="flex flex-wrap gap-4 text-lg mb-6">
							<div className="flex items-center">
								<span className="font-medium mr-2">📅</span>
								<span>{formatDate(event.dateTime)}</span>
							</div>
							<div className="flex items-center">
								<span className="font-medium mr-2">🕒</span>
								<span>{formatTime(event.dateTime)}</span>
							</div>
							<div className="flex items-center">
								<span className="font-medium mr-2">📍</span>
								<span>{event.location}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Event Details */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-xl shadow-lg p-8 mb-8">
							<h2
								className="text-2xl font-bold mb-6"
								style={{ color: "#774E3C" }}
							>
								Despre eveniment
							</h2>
							<div className="prose max-w-none">
								<p className="text-gray-700 leading-relaxed text-lg">
									{event.description}
								</p>
							</div>
						</div>

						{/* Map Section */}
						<div className="bg-white rounded-xl shadow-lg p-8">
							<h2
								className="text-2xl font-bold mb-6"
								style={{ color: "#774E3C" }}
							>
								Locația evenimentului
							</h2>
							{coords ? (
								<MapContainer
									center={coords}
									zoom={15}
									style={{ height: 256, width: "100%", borderRadius: 12 }}
									scrollWheelZoom={false}
								>
									<TileLayer
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									/>
									<Marker position={coords}>
										<Popup>
											{geocodeFailed
												? "Florești, Cluj (default)"
												: event.location}
										</Popup>
									</Marker>
								</MapContainer>
							) : (
								<div className="bg-gray-100 rounded-lg p-8 text-center">
									<div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
										<div className="text-center">
											<div className="text-4xl mb-2">🗺️</div>
											<p className="text-gray-600">Locație indisponibilă</p>
											<p className="text-sm text-gray-500 mt-2">
												Locația: {event.location}
											</p>
										</div>
									</div>
									<p className="text-sm text-gray-600">
										Nu s-a putut găsi locația pe hartă.
									</p>
								</div>
							)}
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
							<h3
								className="text-xl font-bold mb-4"
								style={{ color: "#774E3C" }}
							>
								Informații rapide
							</h3>
							<div className="space-y-4">
								<div>
									<span className="font-semibold text-gray-700">Data:</span>
									<p className="text-gray-600">{formatDate(event.dateTime)}</p>
								</div>
								<div>
									<span className="font-semibold text-gray-700">Ora:</span>
									<p className="text-gray-600">{formatTime(event.dateTime)}</p>
								</div>
								<div>
									<span className="font-semibold text-gray-700">Locația:</span>
									<p className="text-gray-600">{event.location}</p>
								</div>
								{user && (
									<div className="pt-4 border-t border-gray-200">
										<button
											className="w-full px-4 py-2 rounded-lg text-white hover:opacity-90 transition font-semibold"
											style={{ backgroundColor: "#774E3C" }}
										>
											Adaugă la calendar
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
								href={`/events/${event.id}/edit`}
								className="px-4 py-2 rounded-md text-white hover:opacity-90 transition"
								style={{ backgroundColor: "#774E3C" }}
							>
								Editează evenimentul
							</Link>
							<button
								className="px-4 py-2 rounded-md text-white hover:opacity-90 transition"
								style={{ backgroundColor: "#952636" }}
							>
								Șterge evenimentul
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
