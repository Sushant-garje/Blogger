import React from "react";
import { Container, Logo, Logoutbtn } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const navigator = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const NavList = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-4 shadow-md bg-gradient-to-r from-gray-800 to-gray-600 text-white">
      <Container>
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo width="70px" />
          </Link>
          <ul className="flex items-center gap-3">
            {NavList.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigator(item.slug)}
                      className="px-5 py-2 text-sm font-medium rounded-full bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm"
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
        </nav>
      </Container>
    </header>
  );
}

export default Header;
