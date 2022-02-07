import React, { createContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

interface LayoutProps {}

export const PlayerContext = createContext<any | null>(null);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [bungieName, setBungieName] = useState<string | null>(null);

  const playerRef = useRef<any | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch("https://localhost:3000/api/bungie", {
        method: "POST",
        body: JSON.stringify({ id: bungieName }),
      });
      playerRef.current = await data.json();
      return data;
    };
    getData();
  }, [bungieName]);

  return (
    <div className="flex min-h-screen flex-col bg-[#111]">
      <header>
        <Navigation setBungieName={setBungieName} />
      </header>
      <main className="flex flex-1 flex-col items-center gap-4 text-neutral-300">
        <PlayerContext.Provider value={playerRef.current}>
          {children}
        </PlayerContext.Provider>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
