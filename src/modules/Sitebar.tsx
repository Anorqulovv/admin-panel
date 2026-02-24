import { NavLink } from "react-router-dom";
import { PATH } from "../components";

// react-icons
import { GoHome } from "react-icons/go";
import { FiBox } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi2";

const NavIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="grid size-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 text-white/80">
    {children}
  </span>
);

const Sitebar = () => {
  const nav = [
    { label: "Asosiy", href: PATH.home, icon: <GoHome className="text-[18px]" /> },
    { label: "Mahsulotlar", href: PATH.products, icon: <FiBox className="text-[18px]" /> },
    { label: "Kategoriyalar", href: PATH.category, icon: <BiCategoryAlt className="text-[18px]" /> },
    { label: "Foydalanuvchilar", href: PATH.users, icon: <HiOutlineUsers className="text-[18px]" /> },
  ];


  return (
    <aside className="relative h-screen w-[22%] p-4">
      {/* Login-page palette background */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />

      <div className="relative h-full rounded-3xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.55)] overflow-hidden">
        {/* top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />

        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] shadow-[0_10px_25px_rgba(99,102,241,0.22)]">
              <span className="text-white font-bold">A</span>
            </div>
            <div className="leading-tight">
              <p className="text-white font-semibold tracking-wide">Admin</p>
              <p className="text-white/55 text-xs">Admin info</p>
            </div>
          </div>
          <div className="mt-5 h-px bg-white/10" />
        </div>

        <nav className="px-3 pb-4">
          <p className="px-2 pb-2 text-xs font-medium tracking-widest text-white/40">
            MENU
          </p>

          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    [
                      "group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition relative overflow-hidden",
                      "ring-1",
                      isActive
                        ? "bg-white/10 ring-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                        : "bg-transparent ring-transparent hover:bg-white/6 hover:ring-white/10",
                    ].join(" ")
                  }
                >
                  {/* hover/active glow */}
                  <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(240px_circle_at_20%_20%,rgba(34,211,238,0.16),transparent_60%),radial-gradient(260px_circle_at_80%_80%,rgba(217,70,239,0.12),transparent_60%)]" />

                  <div className="relative transition">
                    <NavIcon>{item.icon}</NavIcon>
                  </div>

                  <div className="relative flex-1 title-wrapper">
                    <p className="text-sm nav-title font-medium text-white/75 group-hover:text-white">
                      {item.label}
                    </p>

                    {/* underline gradient */}
                    <div className="mt-1 h-0.5 w-0 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-0 transition-all duration-300 group-hover:w-10 group-hover:opacity-100" />
                  </div>

                  <span className="relative size-2 dots rounded-full transition bg-white/10 group-hover:bg-white/20" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* subtle corner shine */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/8 blur-3xl" />
      </div>
    </aside>
  );
};

export default Sitebar;
