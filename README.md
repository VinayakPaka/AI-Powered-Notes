# SmartNotes - AI-Powered Note-Taking Application

SmartNotes is a modern web application that allows users to create, manage, and organize notes with the power of AI summarization. This full-stack application is built with Next.js, TypeScript, TailwindCSS, and Supabase.



## Features

- **Authentication** - Secure login, registration, and OAuth integration with Google
- **Note Management** - Create, edit, delete, and organize your notes
- **AI Summarization** - Generate concise summaries of your notes using Google Gemini AI
- **Responsive Design** - Works seamlessly across desktop, tablet, and mobile
- **Theming Support** - Dark and light mode with system preference detection
- **Real-time Data** - Instant updates with Supabase real-time subscriptions

## Tech Stack

- **Frontend Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with Shadcn/ui components
- **Authentication & Database**: Supabase
- **AI Integration**: Google Gemini API
- **State Management**: React Query

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v18 or newer)
- npm or yarn
- A Supabase account (free tier works)
- Google Gemini API key for AI summarization

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Gemini API
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VinayakPaka/AI-Powered-Notes.git
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Go to your Supabase project
   - Create tables according to the types defined in `types/supabase.ts`
   - Set up authentication providers (Email/Password and Google OAuth)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Database Schema

The application uses the following database structure:

### Notes Table
- `id`: UUID (primary key)
- `user_id`: UUID (foreign key to auth.users)
- `title`: String
- `content`: Text
- `summary`: Text (nullable)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Profiles Table
- `id`: UUID (primary key, matches auth.users.id)
- `email`: String
- `full_name`: String (nullable)
- `avatar_url`: String (nullable)
- `updated_at`: Timestamp (nullable)

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes
│   │   └── summarize/    # AI summarization endpoint
│   ├── auth/             # Authentication routes
│   ├── dashboard/        # Dashboard and note management
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── notes/            # Note-related components
│   └── ui/               # UI components (Shadcn UI)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   └── supabase/         # Supabase client configuration
├── providers/            # React context providers
│   └── supabase-provider.tsx # Supabase auth provider
├── public/               # Static assets
└── types/                # TypeScript type definitions
    └── supabase.ts       # Generated Supabase types
```

## Authentication Flow

The application uses Supabase Authentication with the following flow:

1. User signs up/logs in via email/password or OAuth (Google)
2. On successful authentication, user is redirected to the callback route
3. The callback route exchanges the auth code for a session
4. User is redirected to the dashboard
5. A middleware ensures protected routes require authentication

## AI Summarization

Notes can be automatically summarized using the Google Gemini API:

1. When a user creates or updates a note, they can request a summary
2. The frontend sends the note content to the `/api/summarize` endpoint
3. The API validates the request and calls the Google Gemini API
4. The summary is returned and stored with the note

## Deployment

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Create a new project on Vercel and import your repository
3. Set up the environment variables in the Vercel dashboard
4. Deploy the application

### Manual Deployment

To build the application for production:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Development Workflow

1. Create feature branches for new features or bug fixes
2. Make changes and test locally
3. Create a pull request to the main branch
4. After review, merge changes
5. Deploy to production

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Google Gemini](https://ai.google.dev/)
