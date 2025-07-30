"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../lib/auth-context";

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

export default function RegisterPage() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { register } = useAuth();
	const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleInterestToggle = (interest: string) => {
		setSelectedInterests((prev) =>
			prev.includes(interest)
				? prev.filter((i) => i !== interest)
				: [...prev, interest]
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (formData.password !== formData.confirmPassword) {
			setError("Parolele nu se potrivesc");
			return;
		}

		if (formData.password.length < 6) {
			setError("Parola trebuie să aibă cel puțin 6 caractere");
			return;
		}

		setLoading(true);

		try {
			await register(
				formData.username,
				formData.email,
				formData.password,
				selectedInterests
			);
			router.push("/");
		} catch (err: any) {
			setError(
				err.response?.data?.message ||
					"Înregistrarea a eșuat. Te rugăm să încerci din nou."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2
						className="mt-6 text-center text-3xl font-bold"
						style={{ color: "#774E3C" }}
					>
						Creează contul tău
					</h2>
					<p className="mt-2 text-center text-sm" style={{ color: "#774E3C" }}>
						Sau{" "}
						<Link href="/login" className="font-medium hover:underline">
							conectează-te la contul existent
						</Link>
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<label htmlFor="username" className="sr-only">
								Nume utilizator
							</label>
							<input
								id="username"
								name="username"
								type="text"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Nume utilizator"
								value={formData.username}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="email" className="sr-only">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Email"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Parolă
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Parolă"
								value={formData.password}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor="confirmPassword" className="sr-only">
								Confirmă parola
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Confirmă parola"
								value={formData.confirmPassword}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div>
						<label
							className="block text-sm font-medium"
							style={{ color: "#774E3C" }}
						>
							Interese (opțional)
						</label>
						<div className="mt-2 grid grid-cols-2 gap-2">
							{INTERESTS.map((interest) => (
								<label key={interest} className="flex items-center">
									<input
										type="checkbox"
										checked={selectedInterests.includes(interest)}
										onChange={() => handleInterestToggle(interest)}
										className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
									/>
									<span className="ml-2 text-sm" style={{ color: "#774E3C" }}>
										{interest}
									</span>
								</label>
							))}
						</div>
					</div>

					{error && (
						<div className="text-red-600 text-sm text-center">{error}</div>
					)}

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
							style={{ backgroundColor: "#774E3C" }}
						>
							{loading ? "Se înregistrează..." : "Creează cont"}
						</button>
					</div>

					<div className="text-center">
						<Link
							href="/"
							className="text-sm hover:underline"
							style={{ color: "#774E3C" }}
						>
							← Înapoi la pagina principală
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
