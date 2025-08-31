// import React from "react";
// import { Container, Logo, Logoutbtn } from "../index";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// function Header() {
//   const navigator = useNavigate();
//   const authStatus = useSelector((state) => state.auth.status);

//   const NavList = [
//     { name: "Home", slug: "/", active: true },
//     { name: "Login", slug: "/login", active: !authStatus },
//     { name: "Signup", slug: "/signup", active: !authStatus },
//     { name: "All Posts", slug: "/all-posts", active: authStatus },
//     { name: "Add Post", slug: "/add-post", active: authStatus },
//   ];

//   return (
//     <header className="py-4 shadow-md bg-gradient-to-r from-gray-800 to-gray-600 text-white">
//       <Container>
//         <nav className="flex items-center justify-between">
//           <Link to="/" className="flex items-center">
//             <Logo width="70px" />
//           </Link>
//           <ul className="flex items-center gap-3">
//             {NavList.map(
//               (item) =>
//                 item.active && (
//                   <li key={item.name}>
//                     <button
//                       onClick={() => navigator(item.slug)}
//                       className="px-5 py-2 text-sm font-medium rounded-full bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm"
//                     >
//                       {item.name}
//                     </button>
//                   </li>
//                 )
//             )}
//             {authStatus && (
//               <li>
//                 <Logoutbtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   );
// }

// export default Header;



import React, { useState } from "react";
import { Container, Logo, Logoutbtn } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const navigator = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavList = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleNavClick = (slug) => {
    navigator(slug);
    setIsMenuOpen(false);
  };

  return (
    <header className="py-3 sm:py-4 shadow-md bg-gradient-to-r from-gray-800 to-gray-600 text-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <Logo width="60px" className="sm:w-[70px]" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-3">
            {NavList.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigator(item.slug)}
                      className="px-3 lg:px-5 py-2 text-xs sm:text-sm font-medium rounded-full bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <ul className="pt-4 pb-2 space-y-2">
            {NavList.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.slug)}
                      className="w-full text-left px-4 py-3 text-sm font-medium rounded-lg bg-gray-700 hover:bg-blue-600 transition-all duration-300 shadow-sm"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className="pt-2">
                <div onClick={() => setIsMenuOpen(false)}>
                  <Logoutbtn />
                </div>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
