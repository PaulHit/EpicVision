import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<Router>
			<nav
				style={{
					padding: "1rem",
					borderBottom: "1px solid #ccc",
					marginBottom: "2rem",
				}}
			>
				<Link to="/">Home</Link> | <Link to="/news">News</Link> |{" "}
				<Link to="/events">Events</Link> | <Link to="/groups">Groups</Link> |{" "}
				<Link to="/report-issues">Report Issues</Link> |{" "}
				<Link to="/directory">Directory</Link> |{" "}
				<Link to="/bulletin-board">Bulletin Board</Link> |{" "}
				<Link to="/volunteer">Volunteer</Link> |{" "}
				<Link to="/resources">Family Resources</Link> |{" "}
				<Link to="/idea-box">Idea Box</Link> |{" "}
				<Link to="/history">History</Link> |{" "}
				<Link to="/skill-share">Skill Share</Link> |{" "}
				<Link to="/photo-wall">Photo Wall</Link>
			</nav>
			<Routes>
				<Route
					path="/"
					element={<div>Homepage (Hero, Highlights, Quick Access)</div>}
				/>
				<Route path="/news" element={<div>News & Announcements</div>} />
				<Route path="/events" element={<div>Events & Activities</div>} />
				<Route
					path="/groups"
					element={<div>Social Groups / Community Discussions</div>}
				/>
				<Route
					path="/report-issues"
					element={<div>Report Issues / Contact Authorities</div>}
				/>
				<Route path="/directory" element={<div>Local Directory</div>} />
				<Route
					path="/bulletin-board"
					element={<div>Digital Bulletin Board</div>}
				/>
				<Route
					path="/volunteer"
					element={<div>Volunteer & Community Projects</div>}
				/>
				<Route path="/resources" element={<div>Family Resources</div>} />
				<Route
					path="/idea-box"
					element={<div>Idea Box / Civic Engagement</div>}
				/>
				<Route path="/history" element={<div>History & Stories</div>} />
				<Route path="/skill-share" element={<div>Skill-Share Corner</div>} />
				<Route path="/photo-wall" element={<div>Community Photo Wall</div>} />
			</Routes>
		</Router>
	);
}

export default App;
