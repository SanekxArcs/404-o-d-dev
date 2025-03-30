import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Terminal, 
  Server, 
  RefreshCw, 
  ExternalLink, 
  Info,
  Globe,
  ExternalLinkIcon,
  PinIcon,
  Search
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import data from JSON files
import domainData from "./data/domains.json";
import { funFacts } from "./data/funFacts.json";
import { messages } from "./data/loadingMessages.json";

function App() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Searching for page...");
  const [funFact, setFunFact] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  

  const [domains] = useState(() => {

    const sortedDomains = [...domainData.domains].sort((a, b) => {

      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      return a.name.localeCompare(b.name);
    });
    
    return sortedDomains;
  });
  
  const [filteredDomains, setFilteredDomains] = useState(domains);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    setFunFact(funFacts[randomIndex]);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setLoadingText("Confirmed: This page doesn't exist");
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearTimeout(timer);
  }, [progress]);

  useEffect(() => {
    if (progress > 0 && progress < 100 && progress % 15 === 0) {
      setLoadingText(messages[Math.floor(progress / 15) % messages.length]);
    }
  }, [progress]);

  // Handle search in the domains dialog
  useEffect(() => {
    if (searchTerm) {
      setFilteredDomains(
        domains.filter(domain => 
          domain.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredDomains(domains);
    }
  }, [searchTerm, domains]);

  return (
    <div className="flex overflow-hidden flex-col items-center justify-center min-h-[100svh] max-h-[100dvh] bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-2">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-sky-400/40"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="animate-pulse-subtle absolute -top-16 -left-16 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="animate-pulse-slow absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="text-center mb-6">
          <h1 className="text-6xl font-extrabold text-white tracking-tight mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-500">
              404
            </span>
          </h1>
          <p className="text-slate-400 text-sm">
            Request ID: {Math.random().toString(36).substring(2, 12)}
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-black/40 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Terminal className="h-5 w-5 text-sky-400" />
                <span className="tracking-tight text-sky-400">
                  Page Not Found
                </span>
              </CardTitle>
              <RefreshCw
                className={`h-4 w-4 text-sky-400 ${
                  progress < 100 ? "animate-spin" : ""
                }`}
              />
            </div>
            <CardDescription>
              We've thoroughly scanned <strong>*.o-d.dev</strong> and couldn't
              locate this page.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{loadingText}</span>
                  <span className="text-sky-400 font-mono">{progress}%</span>
                </div>
                <Progress
                  value={progress}
                  className="h-1.5 bg-transparent rounded-full"
                />
              </div>

              <div className="flex items-start gap-3 text-sm border-l-2 border-sky-500/50 pl-3 py-1">
                <Server className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300">
                  <span className="font-mono bg-slate-800/50 px-1 rounded">
                    GET
                  </span>{" "}
                  request to this endpoint returned{" "}
                  <span className="font-medium text-purple-400">404</span>. This
                  could be because:
                  <ul className="list-disc list-inside mt-1 ml-1 text-slate-400 text-xs space-y-1">
                    <li>The page was moved or deleted</li>
                    <li>You mistyped the URL</li>
                    <li>We're still building this feature</li>
                    <li>The universe is conspiring against you</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm bg-slate-800/30 rounded-md p-3 mt-2">
                <Info className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-300 font-medium mb-1">
                    Fun Fact
                  </p>
                  <p className="text-xs text-slate-400">{funFact}</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t border-slate-800 flex justify-between items-center">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} o-d.dev
            </p>
            <div className="flex items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="text-xs text-purple-400 flex items-center gap-1 hover:underline">
                    <Globe className="h-3 w-3" />
                    All sites
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col bg-black/80 backdrop-blur-xl border-slate-800">
                  <DialogHeader>
                    <DialogTitle className="text-sky-400 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Available o-d.dev Sites
                    </DialogTitle>
                    <DialogDescription>
                      Browse all available subdomains on o-d.dev
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="relative mt-2 mb-3">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search sites..."
                      className="w-full bg-slate-800/50 text-slate-300 pl-10 pr-4 py-2 rounded-md border-slate-700 border focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Pinned Sites Section */}
                  {filteredDomains.some(domain => domain.pinned) && searchTerm.length === 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs uppercase text-slate-500 font-semibold mb-2 flex items-center gap-1">
                        <PinIcon className="h-3 w-3" /> Pinned Sites
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredDomains
                          .filter(domain => domain.pinned)
                          .map((domain) => (
                            <a
                              key={domain.name}
                              href={domain.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-800/70 transition-colors border border-sky-900/30 group bg-sky-950/20"
                            >
                              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-sky-500/30 to-purple-500/30 border border-sky-700/50">
                                {domain.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-sky-300 truncate flex items-center gap-1">
                                  {domain.name}
                                  <PinIcon className="h-3 w-3 text-sky-500/70" />
                                </p>
                                <p className="text-xs text-slate-400 truncate">{domain.url}</p>
                              </div>
                              <ExternalLinkIcon className="h-3 w-3 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* All Sites or Filtered Results */}
                  <div className="overflow-y-auto flex-1 pr-2 -mr-2">
                    {searchTerm.length > 0 && (
                      <h3 className="text-xs uppercase text-slate-500 font-semibold mb-2">
                        Search Results
                      </h3>
                    )}
                    
                    {!searchTerm.length && (
                      <h3 className="text-xs uppercase text-slate-500 font-semibold mb-2">
                        All Sites
                      </h3>
                    )}
                    
                    {filteredDomains.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredDomains
                          .filter(domain => !domain.pinned || searchTerm.length > 0)
                          .map((domain) => (
                            <a
                              key={domain.name}
                              href={domain.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-800/70 transition-colors border border-slate-800 group"
                            >
                              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-slate-700">
                                {domain.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-300 truncate flex items-center gap-1">
                                  {domain.name}
                                  {domain.pinned && searchTerm.length > 0 && (
                                    <PinIcon className="h-3 w-3 text-slate-500" />
                                  )}
                                </p>
                                <p className="text-xs text-slate-500 truncate">{domain.url}</p>
                              </div>
                              <ExternalLinkIcon className="h-3 w-3 text-slate-500 group-hover:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-slate-500">
                        <p>No matching sites found</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default App;
