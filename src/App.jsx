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
import { Terminal, Server, RefreshCw, ExternalLink, Info } from "lucide-react";

function App() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Searching for page...");
  const [funFact, setFunFact] = useState("");

  const funFacts = [
    "The 404 error code comes from room 404 at CERN where the World Wide Web was developed, which was the room where the site index was stored.",
    "In the early days of the web, 404 errors were so common that the Error 404 page was often the most-viewed page on many websites.",
    "Some websites have turned their 404 pages into games, like Google's T-Rex dinosaur game that appears when Chrome can't connect to the internet.",
    "The HTTP 1.0 specification (from 1996) lists only 16 status codes, while the modern HTTP standard has over 60 different status codes.",
    "A '418 I'm a Teapot' status code actually exists as an April Fools' joke from 1998, indicating that the server refuses to brew coffee because it's a teapot.",
    "The first web server in the United States was set up at Stanford University in December 1990, less than a year after the web was invented.",
    "Many people consider a well-designed 404 page as a mark of a company that cares about user experience.",
    "The most common cause of 404 errors is moving or renaming pages without setting up proper redirects.",
    "Unlike 404 (Not Found), a 410 status code means 'Gone' – the resource has been intentionally removed and won't be coming back.",
    "The global internet handles approximately 22 billion HTTP requests per second, and a small percentage of those result in 404 errors.",
  ];

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

  const messages = [
    "Checking alternate dimensions",
    "Asking AI if it knows",
    "Looking behind the couch",
    "Searching in /dev/null",
    "Consulting the documentation",
    "Reversing polarity",
    "Blaming the intern",
  ];

  useEffect(() => {
    if (progress > 0 && progress < 100 && progress % 15 === 0) {
      setLoadingText(messages[Math.floor(progress / 15) % messages.length]);
    }
  }, [progress]);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-2">
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
            <a
              href="https://o-d.dev"
              className="text-xs text-sky-400 flex items-center gap-1 hover:underline"
            >
              Go to homepage <ExternalLink className="h-3 w-3" />
            </a>
          </CardFooter>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
