import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add token to requests if available
api.interceptors.request.use((config: any) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Types
export interface User {
	id: number;
	username: string;
	email: string;
	interests?: string[];
}

export interface UserCreateDTO {
	username: string;
	email: string;
	password: string;
	interests?: string[];
}

export interface UserLoginDTO {
	email: string;
	password: string;
}

export interface Event {
	id: number;
	title: string;
	description: string;
	location: string;
	flyerUrl?: string;
	dateTime: string;
	createdBy: number;
}

export interface EventCreateDTO {
	title: string;
	description: string;
	location: string;
	flyerUrl?: string;
	dateTime: string;
}

export interface News {
	id: number;
	title: string;
	content: string;
	imageUrl?: string;
	publishedAt: string;
	author: string;
}

export interface LocalBusiness {
	id: number;
	name: string;
	description: string;
	category: string;
	contactInfo: string;
	location: string;
}

export interface LocalBusinessCreateDTO {
	name: string;
	description: string;
	category: string;
	contactInfo: string;
	location: string;
}

export interface CommunityGroup {
	id: number;
	name: string;
	description: string;
	whatsappUrl?: string;
}

export interface Comment {
	id: number;
	content: string;
	userId: number;
	forumPostId?: number;
	communityGroupId?: number;
	createdAt: string;
}

export interface CommentCreateDTO {
	content: string;
	forumPostId?: number;
	communityGroupId?: number;
}

export interface ForumPost {
	id: number;
	title: string;
	content: string;
	userId: number;
	createdAt: string;
}

export interface ForumPostCreateDTO {
	title: string;
	content: string;
}

export interface Suggestion {
	id: number;
	title: string;
	description: string;
	category: string;
	userId: number;
	createdAt: string;
}

export interface SuggestionCreateDTO {
	title: string;
	description: string;
	category: string;
}

export interface Vote {
	id: number;
	userId: number;
	forumPostId?: number;
	suggestionId?: number;
	voteType: "UP" | "DOWN";
}

export interface VoteCreateDTO {
	forumPostId?: number;
	suggestionId?: number;
	voteType: "UP" | "DOWN";
}

// Auth API
export const authAPI = {
	login: async (credentials: UserLoginDTO) => {
		const response = await api.post("/auth/login", credentials);
		return response.data;
	},

	register: async (userData: UserCreateDTO) => {
		const response = await api.post("/users", userData);
		return response.data;
	},

	getCurrentUser: async () => {
		const response = await api.get("/users/me");
		return response.data;
	},
};

// Events API
export const eventsAPI = {
	getAll: async (date?: string) => {
		const params = date ? { date } : {};
		const response = await api.get("/events", { params });
		return response.data;
	},

	getById: async (id: number) => {
		const response = await api.get(`/events/${id}`);
		return response.data;
	},

	create: async (eventData: EventCreateDTO) => {
		const response = await api.post("/events", eventData);
		return response.data;
	},

	update: async (id: number, eventData: Partial<EventCreateDTO>) => {
		const response = await api.put(`/events/${id}`, eventData);
		return response.data;
	},

	delete: async (id: number) => {
		const response = await api.delete(`/events/${id}`);
		return response.data;
	},
};

// News API
export const newsAPI = {
	getAll: async () => {
		const response = await api.get("/news");
		return response.data;
	},

	getById: async (id: number) => {
		const response = await api.get(`/news/${id}`);
		return response.data;
	},

	create: async (newsData: Omit<News, "id" | "publishedAt" | "author">) => {
		const response = await api.post("/news", newsData);
		return response.data;
	},
};

// Local Businesses API
export const businessesAPI = {
	getAll: async (category?: string) => {
		const params = category ? { category } : {};
		const response = await api.get("/local-businesses", { params });
		return response.data;
	},

	getById: async (id: number) => {
		const response = await api.get(`/local-businesses/${id}`);
		return response.data;
	},

	search: async (keyword: string) => {
		const response = await api.get(
			`/local-businesses/search?keyword=${keyword}`
		);
		return response.data;
	},

	create: async (businessData: LocalBusinessCreateDTO) => {
		const response = await api.post("/local-businesses", businessData);
		return response.data;
	},
};

// Community Groups API
export const groupsAPI = {
	getAll: async () => {
		const response = await api.get("/community-groups");
		return response.data;
	},

	getById: async (id: number) => {
		const response = await api.get(`/community-groups/${id}`);
		return response.data;
	},

	create: async (groupData: Omit<CommunityGroup, "id">) => {
		const response = await api.post("/community-groups", groupData);
		return response.data;
	},
};

// Comments API
export const commentsAPI = {
	getByForumPost: async (forumPostId: number) => {
		const response = await api.get(`/comments?forumPostId=${forumPostId}`);
		return response.data;
	},

	getByCommunityGroup: async (communityGroupId: number) => {
		const response = await api.get(
			`/comments?communityGroupId=${communityGroupId}`
		);
		return response.data;
	},

	create: async (commentData: CommentCreateDTO) => {
		const response = await api.post("/comments", commentData);
		return response.data;
	},
};

// Forum Posts API
export const forumAPI = {
	getAll: async () => {
		const response = await api.get("/forum-posts");
		return response.data;
	},

	getById: async (id: number) => {
		const response = await api.get(`/forum-posts/${id}`);
		return response.data;
	},

	create: async (postData: ForumPostCreateDTO) => {
		const response = await api.post("/forum-posts", postData);
		return response.data;
	},
};

// Suggestions API
export const suggestionsAPI = {
	getAll: async () => {
		const response = await api.get("/suggestions");
		return response.data;
	},

	create: async (suggestionData: SuggestionCreateDTO) => {
		const response = await api.post("/suggestions", suggestionData);
		return response.data;
	},
};

// Votes API
export const votesAPI = {
	create: async (voteData: VoteCreateDTO) => {
		const response = await api.post("/votes", voteData);
		return response.data;
	},

	getByForumPost: async (forumPostId: number) => {
		const response = await api.get(`/votes?forumPostId=${forumPostId}`);
		return response.data;
	},

	getBySuggestion: async (suggestionId: number) => {
		const response = await api.get(`/votes?suggestionId=${suggestionId}`);
		return response.data;
	},
};

export default api;
