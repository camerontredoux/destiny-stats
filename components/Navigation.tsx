import React from "react";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <div className="flex items-center justify-center p-4 font-bold uppercase text-neutral-300">
      Destiny 2 Statistics
    </div>
  );
};

export default Navigation;
