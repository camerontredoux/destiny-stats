import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#111]">
      <header>
        <Navigation />
      </header>
      <main className="flex flex-1 flex-col items-center gap-4 text-neutral-300">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
