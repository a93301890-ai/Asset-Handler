import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Background3D } from "@/components/Background3D";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import BookTable from "@/pages/BookTable";
import Gallery from "@/pages/Gallery";
import Contacts from "@/pages/Contacts";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/book" component={BookTable} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contacts" component={Contacts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white flex flex-col font-body">
        <Background3D />
        <Navigation />
        <main className="flex-1 relative">
          <Router />
        </main>
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
