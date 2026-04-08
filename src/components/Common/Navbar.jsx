import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

const logoStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&display=swap');

  @keyframes sf-slide-down {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0px); }
  }

  .sf-nav-item {
    position: relative;
  }
  .sf-nav-item::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 1.5px;
    border-radius: 99px;
    background: #EAB308;
    transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .sf-nav-item:hover::after,
  .sf-nav-item.is-active::after {
    width: 100%;
  }

  .sf-mobile-menu {
    animation: sf-slide-down 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .sf-login-btn {
    background: transparent;
    color: #e2e8f0;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 7px 18px;
    border-radius: 8px;
    border: 1px solid #334155;
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
    white-space: nowrap;
  }
  .sf-login-btn:hover {
    border-color: #64748b;
    background: rgba(255,255,255,0.05);
  }

  .sf-signup-btn {
    background: #EAB308;
    color: #0f172a;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 7px 18px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
    white-space: nowrap;
  }
  .sf-signup-btn:hover {
    background: #ca8a04;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(234, 179, 8, 0.30);
  }
  .sf-signup-btn:active { transform: scale(0.97); }
`

// ── SkillForge SVG Logo Mark ──────────────────────────────────────────────────
function SkillForgeLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Icon box — same style as SkillForge's "S" circle */}
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          border: "1.5px solid #334155",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 0 0 1px rgba(234,179,8,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Anvil + spark — forge mark */}
          <rect x="3" y="12" width="14" height="3" rx="1.5" fill="#EAB308"/>
          <rect x="6" y="10" width="8"  height="2.5" rx="1" fill="#EAB308" opacity="0.8"/>
          {/* spark / bolt */}
          <path d="M12 2L7.5 9H11L9 18l8-10h-4.5L12 2z" fill="#ffffff" opacity="0.9"/>
        </svg>
      </div>

      {/* Wordmark */}
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: "1.15rem",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          display: "flex",
          alignItems: "baseline",
          gap: "0px",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "#f1f5f9" }}>Skill</span>
        <span style={{ color: "#EAB308" }}>Forge</span>
      </div>
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const location   = useLocation()
  const token      = useSelector((state) => state.auth?.token     ?? null)
  const user       = useSelector((state) => state.profile?.user   ?? null)
  const totalItems = useSelector((state) => state.cart?.totalItems ?? 0)

  const [subLinks,       setSubLinks]       = useState([])
  const [loading,        setLoading]        = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        if (isMounted) setSubLinks(Array.isArray(res?.data?.data) ? res.data.data : [])
      } catch (error) {
        console.log("Could not fetch Categories.", error)
        if (isMounted) setSubLinks([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchCategories()
    return () => { isMounted = false }
  }, [])

  useEffect(() => { setMobileMenuOpen(false) }, [location])

  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: logoStyles }} />

      <div
        className={`relative flex h-16 items-center justify-center border-b border-b-richblack-700 ${
          location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">

          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <SkillForgeLogo />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-7 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 sf-nav-item ${
                        matchRoute("/catalog/:catalogName") ? "text-yellow-25 is-active" : "text-richblack-25"
                      } transition-colors duration-200 hover:text-yellow-25`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
                      <div className="invisible absolute left-1/2 top-1/2 z-[1000] w-[220px] -translate-x-1/2 translate-y-[3em] rounded-xl bg-richblack-5 p-4 text-richblack-900 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 translate-x-[80%] -translate-y-[40%] rotate-45 rounded bg-richblack-5" />
                        {loading ? (
                          <p className="text-center text-sm">Loading…</p>
                        ) : Array.isArray(subLinks) && subLinks.length > 0 ? (
                          subLinks
                            .filter((s) => Array.isArray(s?.courses) && s.courses.length > 0)
                            .map((subLink, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                className="block rounded-lg py-2 pl-3 text-sm transition-all duration-150 hover:bg-richblack-50"
                              >
                                {subLink.name}
                              </Link>
                            ))
                        ) : (
                          <p className="text-center text-sm">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <p
                        className={`sf-nav-item ${
                          matchRoute(link.path) ? "text-yellow-25 is-active" : "text-richblack-25"
                        } transition-colors duration-200 hover:text-yellow-25`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Desktop Auth / Cart ── */}
          <div className="hidden items-center gap-x-3 md:flex">
            {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative group mr-1">
                <AiOutlineShoppingCart className="text-2xl text-richblack-200 transition-all duration-200 group-hover:text-yellow-25 group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-yellow-400 text-xs font-bold text-richblack-900">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {!token && (
              <>
                <Link to="/login">
                  <button className="sf-login-btn">Log in</button>
                </Link>
                <Link to="/signup">
                  <button className="sf-signup-btn">Sign up</button>
                </Link>
              </>
            )}
            {token && <ProfileDropdown />}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="mr-2 md:hidden p-1 rounded-lg transition-all duration-200 hover:bg-richblack-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <AiOutlineClose fontSize={22} fill="#94a3b8" />
              : <AiOutlineMenu  fontSize={22} fill="#94a3b8" />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileMenuOpen && (
          <div className="sf-mobile-menu absolute top-16 left-0 z-[1000] w-full bg-richblack-800 border-b border-richblack-700 px-6 py-5 md:hidden">
            <ul className="flex flex-col gap-4">
              {NavbarLinks.map((link, index) => (
                <li key={index} className="transition-all duration-200 hover:translate-x-1">
                  {link.title === "Catalog" ? (
                    <div className="flex flex-col gap-2">
                      <p className="font-medium text-richblack-100">Catalog</p>
                      <div className="ml-4 flex flex-col gap-2">
                        {subLinks
                          .filter((s) => Array.isArray(s?.courses) && s.courses.length > 0)
                          .map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="text-sm text-richblack-300 transition-all duration-200 hover:text-yellow-25 hover:translate-x-1"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`text-base transition-colors duration-200 hover:text-yellow-25 ${
                        matchRoute(link.path) ? "text-yellow-25" : "text-richblack-100"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3 border-t border-richblack-700 pt-5">
              {!token ? (
                <>
                  <Link to="/login">
                    <button className="sf-login-btn w-full">Log in</button>
                  </Link>
                  <Link to="/signup">
                    <button className="sf-signup-btn w-full">Sign up</button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link to="/dashboard/cart" className="relative group">
                      <AiOutlineShoppingCart className="text-2xl text-richblack-200 group-hover:text-yellow-25 transition-colors duration-200" />
                      {totalItems > 0 && (
                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-yellow-400 text-xs font-bold text-richblack-900">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  )}
                  <ProfileDropdown />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar 

// import { useEffect, useState } from "react"
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// import { BsChevronDown } from "react-icons/bs"
// import { AiOutlineClose } from "react-icons/ai"
// import { useSelector } from "react-redux"
// import { Link, matchPath, useLocation } from "react-router-dom"

// import logo from "../../assets/Logo/Logo-Full-Light.png"
// import { NavbarLinks } from "../../data/navbar-links"
// import { apiConnector } from "../../services/apiConnector"
// import { categories } from "../../services/apis"
// import { ACCOUNT_TYPE } from "../../utils/constants"
// import ProfileDropdown from "../core/Auth/ProfileDropdown"

// function Navbar() {
//   const location = useLocation()
//   const token = useSelector((state) => state.auth?.token ?? null)
//   const user = useSelector((state) => state.profile?.user ?? null)
//   const totalItems = useSelector((state) => state.cart?.totalItems ?? 0)

//   const [subLinks, setSubLinks] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   useEffect(() => {
//     let isMounted = true
//     const fetchCategories = async () => {
//       setLoading(true)
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)
//         if (isMounted) {
//           setSubLinks(Array.isArray(res?.data?.data) ? res.data.data : [])
//         }
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//         if (isMounted) setSubLinks([])
//       } finally {
//         if (isMounted) setLoading(false)
//       }
//     }
//     fetchCategories()
//     return () => { isMounted = false }
//   }, [])

//   // Close menu on route change
//   useEffect(() => {
//     setMobileMenuOpen(false)
//   }, [location])

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <div
//       className={`relative flex h-14 items-center justify-center border-b border-b-richblack-700 ${
//         location.pathname !== "/" ? "bg-richblack-800" : ""
//       } transition-all duration-200`}
//     >
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
//         </Link>

//         {/* Desktop Nav Links */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div
//                     className={`group relative flex cursor-pointer items-center gap-1 ${
//                       matchRoute("/catalog/:catalogName")
//                         ? "text-yellow-25"
//                         : "text-richblack-25"
//                     }`}
//                   >
//                     <p>{link.title}</p>
//                     <BsChevronDown />
//                     <div className="invisible absolute left-1/2 top-1/2 z-[1000] w-[220px] -translate-x-1/2 translate-y-[3em] rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                       <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 translate-x-[80%] -translate-y-[40%] rotate-45 rounded bg-richblack-5"></div>
//                       {loading ? (
//                         <p className="text-center">Loading...</p>
//                       ) : Array.isArray(subLinks) && subLinks.length > 0 ? (
//                         subLinks
//                           .filter(
//                             (subLink) =>
//                               Array.isArray(subLink?.courses) &&
//                               subLink.courses.length > 0
//                           )
//                           .map((subLink, i) => (
//                             <Link
//                               key={i}
//                               to={`/catalog/${subLink.name
//                                 .split(" ")
//                                 .join("-")
//                                 .toLowerCase()}`}
//                               className="block rounded-lg py-2 pl-2 hover:bg-richblack-50"
//                             >
//                               {subLink.name}
//                             </Link>
//                           ))
//                       ) : (
//                         <p className="text-center">No Courses Found</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={link.path}>
//                     <p
//                       className={`${
//                         matchRoute(link.path)
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Desktop Auth / Cart */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {!token && (
//             <>
//               <Link to="/login">
//                 <button className="rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
//                   Log in
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
//                   Sign up
//                 </button>
//               </Link>
//             </>
//           )}
//           {token && <ProfileDropdown />}
//         </div>

//         {/* ✅ FIXED: Mobile Hamburger Button */}
//         <button
//           className="mr-4 md:hidden"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           {mobileMenuOpen ? (
//             <AiOutlineClose fontSize={24} fill="#AFB2BF" />
//           ) : (
//             <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//           )}
//         </button>
//       </div>

//       {/* ✅ Mobile Menu Dropdown */}
//       {mobileMenuOpen && (
//         <div className="absolute top-14 left-0 z-[1000] w-full bg-richblack-800 border-b border-richblack-700 px-6 py-4 md:hidden">
//           <ul className="flex flex-col gap-4 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div className="flex flex-col gap-2">
//                     <p className="font-medium">Catalog</p>
//                     <div className="ml-4 flex flex-col gap-2">
//                       {subLinks
//                         .filter(
//                           (subLink) =>
//                             Array.isArray(subLink?.courses) &&
//                             subLink.courses.length > 0
//                         )
//                         .map((subLink, i) => (
//                           <Link
//                             key={i}
//                             to={`/catalog/${subLink.name
//                               .split(" ")
//                               .join("-")
//                               .toLowerCase()}`}
//                             className="text-sm text-richblack-100 hover:text-yellow-25"
//                           >
//                             {subLink.name}
//                           </Link>
//                         ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={link.path} className="hover:text-yellow-25">
//                     {link.title}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>

//           <div className="mt-4 flex flex-col gap-3 border-t border-richblack-700 pt-4">
//             {!token ? (
//               <>
//                 <Link to="/login">
//                   <button className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
//                     Log in
//                   </button>
//                 </Link>
//                 <Link to="/signup">
//                   <button className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
//                     Sign up
//                   </button>
//                 </Link>
//               </>
//             ) : (
//               <div className="flex items-center gap-4">
//                 {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//                   <Link to="/dashboard/cart" className="relative">
//                     <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//                     {totalItems > 0 && (
//                       <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
//                         {totalItems}
//                       </span>
//                     )}
//                   </Link>
//                 )}
//                 <ProfileDropdown />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Navbar


