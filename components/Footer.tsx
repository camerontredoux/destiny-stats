import { client_id } from "@utils/api";
import Link from "next/link";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const oAuthURL = `https://www.bungie.net/en/OAuth/Authorize?client_id=${client_id}&response_type=code`;
  return (
    <div className="mx-auto mt-4 flex h-44 w-5/6 flex-col items-center justify-between border-t border-neutral-800 p-4 text-center text-neutral-600 sm:flex-row sm:text-left">
      <ul>
        <li>
          <Link href="/">
            <a aria-label="Destiny Stats Home Page">Destiny Stats</a>
          </Link>
        </li>
        <li>
          <a href={oAuthURL}>Authorize</a>
        </li>
        <li>Test</li>
      </ul>
      <ul className="sm:text-right">
        <li>GitHub</li>
        <li>LinkedIn</li>
        <li>
          <a
            href="https://bungie.net/en/Application"
            rel="noreferrer"
            target="_blank"
          >
            Bungie Application
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
