# AI-Powered Notes App

A full-stack application built with Next.js, TypeScript, TailwindCSS, and Supabase that allows users to create, edit, and delete notes with AI-powered summarization.

## Features

- **Authentication**: Sign up and login with email/password or Google authentication
- **Notes Management**: Create, edit, and delete personal notes
- **AI Summarization**: Generate concise summaries of your notes using the DeepSeek API
- **Responsive Design**: Works seamlessly on all device sizes
- **Dark/Light Mode**: Toggle between dark and light theme based on preference

## Tech Stack

- **Frontend**: Next.js 13 (with App Router), TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Supabase (Authentication, Database)
- **State Management**: React Query for data fetching and caching
- **AI Integration**: DeepSeek API for note summarization
- **Styling**: TailwindCSS with Shadcn UI components
- **Deployment**: Ready for Vercel deployment

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm/yarn
- Supabase account
- DeepSeek API key (or Groq API key as fallback)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd ai-notes-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase and API keys

4. Set up Supabase
   - Create a new Supabase project
   - Run the migrations in the `supabase/migrations` folder to set up the database schema
   - Configure authentication providers (Email/Password and Google)

5. Run the development server
   ```bash
   npm run dev
   ```

## Deployment

This application is configured for easy deployment on Vercel:

1. Push your repository to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel
4. Deploy!

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   └── page.tsx          # Home/landing page
├── components/           # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── notes/            # Note-related components
│   └── ui/               # UI components (Shadcn UI)
├── lib/                  # Utility functions
│   └── supabase/         # Supabase client
├── providers/            # React context providers
├── types/                # TypeScript type definitions
└── supabase/             # Supabase migrations
```

## License

MIT

## DeepSeek API Integration

If you want to use the DeepSeek API for AI summaries:

1. Register for a DeepSeek API key at https://platform.deepseek.com
2. Add your key to the `.env.local` file as `DEEPSEEK_API_KEY=your-key`

If no DeepSeek API key is provided, the app will fall back to a simple extractive summarization method that works locally without API calls.