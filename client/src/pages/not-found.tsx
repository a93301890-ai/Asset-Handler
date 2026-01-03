import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="glass-panel p-12 rounded-lg text-center max-w-md w-full border border-white/10">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-display font-bold text-white mb-4">404</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          The page you are looking for has vanished into the shadows.
        </p>
        <Link href="/">
          <button className="w-full py-3 bg-primary text-black font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-colors">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
