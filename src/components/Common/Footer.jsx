import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

// ── SkillForge Logo — compact, no overflow ────────────────────────────────────
function SkillForgeLogo() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", overflow: "visible", padding: "3px 0" }}>
      {/* Icon box */}
      <div
        style={{
          width: "30px",
          height: "30px",
          minWidth: "30px",
          borderRadius: "7px",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          border: "1.5px solid #334155",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 1px rgba(234,179,8,0.15)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="12" width="14" height="3" rx="1.5" fill="#EAB308"/>
          <rect x="6" y="10" width="8"  height="2.5" rx="1" fill="#EAB308" opacity="0.75"/>
          <path d="M12 2L7.5 9H11L9 18l8-10h-4.5L12 2z" fill="#ffffff" opacity="0.9"/>
        </svg>
      </div>
      {/* Wordmark */}
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: "1.15rem",
          letterSpacing: "-0.02em",
          lineHeight: 2,
          whiteSpace: "nowrap",
          display: "inline-block",
          overflow: "visible",
          verticalAlign: "middle",
        }}
      >
        <span style={{ color: "#f1f5f9" }}>Skill</span>
        <span style={{ color: "#EAB308" }}>Forge</span>
      </span>
    </div>
  );
}

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&display=swap');`}</style>

      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">

          {/* ── Section 1 ── */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">

              <Link to="/" style={{ textDecoration: "none", display: "block" }}>
                <SkillForgeLogo />
              </Link>

              <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <div key={i} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                    <Link to={ele.toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 text-lg">
                <FaFacebook className="hover:text-richblack-50 cursor-pointer transition-colors duration-200" />
                <FaGoogle   className="hover:text-richblack-50 cursor-pointer transition-colors duration-200" />
                <FaTwitter  className="hover:text-richblack-50 cursor-pointer transition-colors duration-200" />
                <FaYoutube  className="hover:text-richblack-50 cursor-pointer transition-colors duration-200" />
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => (
                  <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Support</h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Plans</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => (
                  <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Community</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => (
                  <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Section 2 ── */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                <h1 className="text-richblack-50 font-semibold text-[16px]">{ele.title}</h1>
                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, index) => (
                    <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                      <Link to={link.link}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => (
              <div
                key={i}
                className={`${
                  BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                } px-3`}
              >
                <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>{ele}</Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            Created with <span style={{ color: "#EAB308" }}>❤️</span> by{" "}
            <span style={{ color: "#f1f5f9", fontWeight: 600 }}>Durgesh</span>
            {" "}© 2026{" "}
            <span style={{ color: "#EAB308", fontWeight: 600 }}>SkillForge</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;


