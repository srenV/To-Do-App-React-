import React from "react";
import { Github, Linkedin } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex md:px-5 px-2 justify-between text-sm md:text-lg w-full font-bold font-mono">
      <div className="flex gap-5 flex-row ">
        <a href="https://github.com/srenV">
          <Github />
        </a>
        <a href="https://www.linkedin.com/in/soren-timo-voigt/">
          <Linkedin />
        </a>
      </div>
      <div></div>
      <div className="flex gap-5 flex-row">
        <a href="https://srenv.vercel.app/impressum" target="_blank">
          Impressum
        </a>
        <a
          className="text-nowrap"
          href="https://srenv.vercel.app/legal"
          target="_blank"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};
