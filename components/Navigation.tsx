import React, { FormEvent } from "react";

interface NavigationProps {
  setBungieName: React.Dispatch<any>;
}

const Navigation: React.FC<NavigationProps> = ({ setBungieName }) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      bungieName: { value: string };
    };
    const bungieName = target.bungieName.value;
    setBungieName(bungieName);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          className="rounded-md bg-transparent bg-neutral-900 p-2 text-center text-neutral-300 transition duration-100 ease-in-out placeholder:text-neutral-600 hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none focus:placeholder:text-transparent"
          type="text"
          id="bungieName"
          name="bungieName"
          placeholder="Bungie Name"
        />
      </form>
    </div>
  );
};

export default Navigation;
