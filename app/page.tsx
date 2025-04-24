import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Icons.note className="h-6 w-6" />
          <span className="font-bold text-xl">SmartNotes</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6 animate-fadeIn">
              Your Notes, <span className="text-blue-600 dark:text-blue-400">Intelligently</span> Summarized
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fadeIn">
              Take notes effortlessly and let AI turn your thoughts into clear, concise summaries
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/register">
                <Button size="lg" className="animate-fadeIn">
                  Start for free
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="animate-fadeIn">
                  Log in
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 rounded-lg overflow-hidden shadow-xl border border-border animate-fadeIn">
              <div className="bg-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Project Meeting Notes</h3>
                    <p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="p-2 rounded-full bg-secondary">
                      <Icons.edit className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <p className="text-card-foreground mb-6">
                  Discussed upcoming project milestones with the team. Sarah will work on the frontend redesign while James focuses on API optimization. We need to address performance issues on the dashboard by next sprint. The client requested additional analytics features which we'll need to scope out. Marketing team will provide new assets by Friday...
                </p>
                <div className="rounded-md border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4 transition-all animate-pulse-blue">
                  <h4 className="mb-2 font-medium flex items-center text-blue-800 dark:text-blue-300">
                    <Icons.ai className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    AI Summary
                  </h4>
                  <p className="text-sm leading-relaxed text-blue-700 dark:text-blue-200 italic">
                    Team assigned tasks with Sarah handling frontend redesign and James working on API optimization. Dashboard performance issues need addressing next sprint, and client requested new analytics features which require scoping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Powerful Features, Simple Design</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all hover:shadow-md">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Icons.ai className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Summarization</h3>
                <p className="text-muted-foreground">
                  Transform lengthy notes into concise summaries with our advanced AI powered by Google Gemini.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all hover:shadow-md">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Icons.note className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simple Note Taking</h3>
                <p className="text-muted-foreground">
                  Create, edit, and organize your notes with an intuitive interface designed for productivity.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all hover:shadow-md">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Icons.moon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Dark Mode Support</h3>
                <p className="text-muted-foreground">
                  Enjoy a comfortable note-taking experience day or night with full dark mode support.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">01</div>
                  <h3 className="text-2xl font-semibold mb-2">Create Your Notes</h3>
                  <p className="text-muted-foreground">
                    Write down your thoughts, meeting notes, or ideas in our clean and distraction-free editor.
                  </p>
                </div>
                <div className="md:w-1/2 bg-card p-4 rounded-lg shadow-sm border border-border">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-2">
                    <div className="h-6 w-2/3 bg-muted rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted/70 rounded w-full"></div>
                      <div className="h-4 bg-muted/70 rounded w-full"></div>
                      <div className="h-4 bg-muted/70 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="md:w-1/2">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">02</div>
                  <h3 className="text-2xl font-semibold mb-2">Generate AI Summary</h3>
                  <p className="text-muted-foreground">
                    Click a button and watch as our AI analyzes your content and creates a concise summary of key points.
                  </p>
                </div>
                <div className="md:w-1/2 bg-card p-4 rounded-lg shadow-sm border border-border">
                  <div className="mb-3 flex justify-end">
                    <div className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center">
                      <Icons.ai className="h-3 w-3 mr-1" />
                      Processing...
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="space-y-2 mb-4 opacity-50">
                      <div className="h-4 bg-muted/70 rounded w-full"></div>
                      <div className="h-4 bg-muted/70 rounded w-full"></div>
                      <div className="h-4 bg-muted/70 rounded w-5/6"></div>
                    </div>
                    <div className="h-10 bg-blue-100 dark:bg-blue-900/20 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">03</div>
                  <h3 className="text-2xl font-semibold mb-2">Access Anywhere</h3>
                  <p className="text-muted-foreground">
                    Your notes and AI summaries are securely stored and accessible from any device, whenever you need them.
                  </p>
                </div>
                <div className="md:w-1/2 bg-card p-4 rounded-lg shadow-sm border border-border">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm font-medium">Your Notes</div>
                    <div className="text-xs text-muted-foreground">3 devices</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-12 bg-secondary rounded-md flex items-center px-3 justify-between">
                      <div className="h-4 w-1/3 bg-muted rounded"></div>
                      <Icons.refresh className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="h-12 bg-secondary rounded-md flex items-center px-3 justify-between">
                      <div className="h-4 w-2/5 bg-muted rounded"></div>
                      <Icons.refresh className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-blue-600 dark:bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Start Organizing Your Thoughts Today</h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of users who are saving time and staying organized with our powerful note-taking app and AI summarization.
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50">
                Get Started for Free
              </Button>
            </Link>
            <p className="mt-4 text-sm opacity-75">No credit card required</p>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icons.note className="h-5 w-5" />
              <span className="font-semibold">SmartNotes</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Help
              </a>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SmartNotes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}