# EpicVision - Community Platform for Florești

A full-stack community platform designed to connect residents of Florești, Cluj, Romania. This project provides a comprehensive digital hub for local news, events, community groups, local businesses, and civic engagement.

## 🌟 Features

### Core Functionality

- **User Authentication & Authorization** - Secure JWT-based authentication system
- **Community Events** - Create, discover, and manage local events
- **Community Groups** - Join and participate in interest-based groups
- **Local Business Directory** - Discover and support local businesses
- **News & Forum** - Share and discuss community news and topics
- **Suggestions System** - Submit and vote on community improvement ideas
- **Interactive Maps** - Location-based services using Leaflet
- **Responsive Design** - Mobile-first approach with modern UI/UX

### Technical Features

- **Real-time Updates** - Dynamic content loading and updates
- **Search & Filter** - Advanced search capabilities across all content
- **Voting System** - Community-driven content ranking
- **Comment System** - Interactive discussions on posts and events
- **User Profiles** - Personalized user experience with interests tracking

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling and validation
- **Leaflet** - Interactive maps integration
- **Lucide React** - Modern icon library

### Backend

- **Spring Boot 3.5** - Java-based REST API
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database abstraction layer
- **MySQL** - Relational database
- **JWT** - Stateless authentication
- **Lombok** - Reduced boilerplate code
- **Maven** - Dependency management

### Deployment

- **Railway** - Cloud deployment platform
- **Nixpacks** - Build system for Railway

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- MySQL 8.0+
- Maven 3.6+

### Frontend Setup

```bash
cd frontend-next
npm install
npm run dev
```

### Backend Setup

```bash
cd backend-java
mvn clean install
mvn spring-boot:run
```

### Environment Variables

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Configure `application.properties` in the backend:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/epicvision
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_jwt_secret
```

## 📁 Project Structure

```
EpicVision/
├── frontend-next/          # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable UI components
│   │   └── lib/          # Utilities and configurations
├── backend-java/          # Spring Boot backend application
│   ├── src/main/java/
│   │   ├── controller/    # REST API endpoints
│   │   ├── service/       # Business logic layer
│   │   ├── repository/    # Data access layer
│   │   ├── domain/        # Entity models
│   │   ├── dto/          # Data transfer objects
│   │   └── config/       # Configuration classes
└── railway.toml          # Railway deployment configuration
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users

- `GET /api/users` - Get all users
- `GET /api/users/me` - Get current user
- `POST /api/users` - Create new user

### Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/{id}` - Get specific event

### Community Groups

- `GET /api/groups` - Get all groups
- `POST /api/groups` - Create new group
- `GET /api/groups/{id}` - Get specific group

### Local Businesses

- `GET /api/businesses` - Get all businesses
- `POST /api/businesses` - Create new business
- `GET /api/businesses/{id}` - Get specific business

### Forum Posts

- `GET /api/posts` - Get all forum posts
- `POST /api/posts` - Create new post
- `GET /api/posts/{id}` - Get specific post

### Suggestions

- `GET /api/suggestions` - Get all suggestions
- `POST /api/suggestions` - Create new suggestion
- `GET /api/suggestions/{id}` - Get specific suggestion

## 🎨 Design System

The application uses a warm, community-focused color palette:

- **Primary**: `#774E3C` (Warm Brown)
- **Secondary**: `#E8DCC4` (Cream)
- **Accent**: `#D4C4A8` (Light Beige)

Typography features the elegant Libre Baskerville font for headings, creating a sophisticated and welcoming aesthetic.

## 🌍 Localization

The platform is designed for the Romanian community in Florești, with:

- Romanian language interface
- Local cultural considerations
- Community-specific features and terminology

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (USER/ADMIN)
- Secure password handling
- CORS configuration
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Progressive Web App features

## 🚀 Deployment

The application is deployed on Railway with:

- Automatic builds from Git
- Health checks and monitoring
- Environment variable management
- SSL certificate handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Next.js team for the React framework
- Tailwind CSS for the utility-first CSS framework
- The Florești community for inspiration and feedback

---

**EpicVision** - Connecting the community of Florești, one digital interaction at a time.
