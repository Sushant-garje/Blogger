import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="py-12 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -m-6">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center mb-4">
                <Logo width="110px" />
              </div>
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} All Rights Reserved. Made with ❤️
              </p>
            </div>
          </div>

          {["Company", "Support", "Legals"].map((section, idx) => (
            <div key={idx} className="w-full p-6 md:w-1/2 lg:w-2/12">
              <h3 className="mb-6 text-sm font-bold uppercase text-gray-300">
                {section}
              </h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                  (item, i) => (
                    <li key={i}>
                      <Link
                        to="/"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Footer;
