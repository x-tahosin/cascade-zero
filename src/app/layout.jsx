import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "CASCADE-ZERO // Autonomous Causal Incident Simulator & War Room",
  description: "Deterministic topological causal simulation for high-stakes software release horizons. Backed by Sanity Content Lake v3.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-full antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      <body className="min-h-full flex flex-col bg-[#05080e] text-slate-100 font-sans antialiased">
        <Navbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
