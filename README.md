# Nihongo Journey - Japanese Learning Platform

A comprehensive Japanese language learning platform built with Next.js, Prisma, and NextAuth.

## 🚀 Features

- **User Authentication**: Google OAuth and credentials-based login with NextAuth.js
- **Learning System**: Interactive lessons with multiple choice questions
- **Progress Tracking**: User progress, XP system, and study streaks
- **Vocabulary Builder**: Categorized vocabulary with memory tips
- **Community Features**: Study groups and messaging
- **Achievement System**: Badges and rewards for milestones
- **Subscription Management**: Free and Pro tiers
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth and credentials
- **State Management**: React hooks and context
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database (Docker container provided)
- Google OAuth credentials (for social login)

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd nihongo-journey
npm install
```

### 2. Database Setup

Start a PostgreSQL database using Docker:

```bash
docker run --name nihongo-journey \\
  -e POSTGRES_PASSWORD=12345678 \\
  -p 5432:5432 \\
  -d postgres
```

### 3. Environment Configuration

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with initial data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
nihongo-journey/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   └── auth/          # NextAuth API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── lessons/           # Lesson pages
│   ├── study/             # Study materials
│   ├── community/         # Community features
│   └── ...
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation component
│   ├── footer.tsx        # Footer component
│   └── ...
├── data/                 # Static data and content
│   ├── lesson-content.ts  # Lesson data
│   ├── study-content.ts   # Study materials
│   └── ...
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
└── types/                # TypeScript type definitions
```

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: User accounts with authentication and profile data
- **Lessons**: Learning content organized by categories
- **Progress**: User progress tracking for lessons
- **Vocabulary**: Japanese vocabulary items with categories
- **Achievements**: Gamification system with badges
- **Community**: Study groups and messaging
- **Subscriptions**: Pro/Free tier management

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with initial data
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database

## 🎨 Component Library

The project uses shadcn/ui components for a consistent and modern UI:

- **Form Components**: Input, Button, Select, Checkbox, etc.
- **Layout Components**: Card, Dialog, Sheet, Tabs, etc.
- **Data Display**: Table, Badge, Progress, Avatar, etc.
- **Navigation**: Navbar, Breadcrumb, Pagination, etc.

## 🔐 Authentication

NextAuth.js is configured with:

- **Google OAuth**: Social login with Google
- **Credentials**: Email/password authentication
- **JWT**: Secure session management
- **Prisma Adapter**: Database session storage

## 🌟 Features Implementation

### Learning System

- Multiple choice questions
- Progress tracking
- XP and leveling system
- Study streaks

### Vocabulary

- Categorized by topic (greetings, family, etc.)
- Romaji and English translations
- Memory tips and context

### Community

- Public/private study groups
- Messaging and replies
- Reaction system

### Gamification

- Achievement badges
- XP rewards
- Progress visualization
- Study streaks

## 🚀 Deployment

### Vercel Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Database

Use a hosted PostgreSQL service like:

- Vercel Postgres
- Supabase
- PlanetScale
- Railway

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support and questions:

- Create an issue on GitHub
- Join our community Discord
- Check the documentation

---

Happy learning! がんばって！ (Ganbatte!)
