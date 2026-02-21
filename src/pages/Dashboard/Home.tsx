import React, { useEffect, useMemo, useState } from "react";
import { instance } from "../../hooks";
import { Loading, PATH } from "../../components";
import { useNavigate } from "react-router-dom";

import { FiBox, FiArrowUpRight } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi2";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="relative grid size-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/85 overflow-hidden">
    {/* neon fill */}
    <div className="absolute inset-0 bg-[radial-gradient(90px_circle_at_25%_20%,rgba(34,211,238,0.18),transparent_60%),radial-gradient(90px_circle_at_80%_80%,rgba(217,70,239,0.14),transparent_60%)]" />
    <div className="relative">{children}</div>
  </div>
);

const ValueSkeleton = () => (
  <div className="mt-1 h-9 w-24 rounded-xl bg-white/8 ring-1 ring-white/10 overflow-hidden">
    <div className="h-full w-1/2 animate-pulse bg-white/10" />
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const [results, setResults] = useState<{
    products?: number;
    categories?: number;
    users?: number;
  }>({});

  useEffect(() => {
    const products = () => instance().get("/products");
    const categories = () => instance().get("/categories");
    const users = () => instance().get("/users");

    Promise.all([products(), categories(), users()]).then((res) => {
      setResults({
        products: res[0].data.length,
        categories: res[1].data.length,
        users: res[2].data.length,
      });
    });
  }, []);

  const stats = useMemo(
    () => [
      {
        label: "Mahsulotlar",
        value: results.products,
        icon: <FiBox className="text-[20px]" />,
        path: PATH.products,
        chip: "Products",
      },
      {
        label: "Kategoriyalar",
        value: results.categories,
        icon: <BiCategoryAlt className="text-[20px]" />,
        path: PATH.category,
        chip: "Categories",
      },
      {
        label: "Foydalanuvchilar",
        value: results.users,
        icon: <HiOutlineUsers className="text-[20px]" />,
        path: PATH.users,
        chip: "Users",
      },
    ],
    [results]
  );

  return (
    <section className="relative p-4 h-[95%]">
      {/* Login page palette background */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />

      {/* Shell */}
      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] p-6">
        {/* top neon line */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />
        {/* inner soft aura */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_15%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(217,70,239,0.10),transparent_55%),radial-gradient(700px_circle_at_50%_110%,rgba(99,102,241,0.10),transparent_55%)]" />

        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-white/45 text-xs tracking-[0.22em] uppercase">
              Dashboard
            </p>
            <h2 className="mt-1 text-white text-xl font-semibold">
              Asosiy sahifa
            </h2>
            <p className="mt-1 text-white/50 text-sm">Statistikalar</p>
          </div>

          <div className="flex items-center gap-3">
            {/* login-like gradient */}
            <div className="h-1 w-28 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
            <span className="text-white/40 text-xs">overview</span>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-3 ">
          {stats.map((s) => (
            <button
              type="button"
              onClick={() => navigate(s.path)}
              key={s.label}
              className={[
                "cursor-pointer bg-red-600 group relative text-left overflow-hidden rounded-3xl",
                "bg-white/5 ring-1 ring-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)]",
                "p-5 transition duration-300",
                "hover:bg-white/10 hover:ring-white/15",
                "hover:shadow-[0_22px_60px_rgba(0,0,0,0.35)]",
              ].join(" ")}
            >
              {/* hover neon glow */}
              <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(240px_circle_at_20%_20%,rgba(34,211,238,0.18),transparent_60%),radial-gradient(260px_circle_at_80%_80%,rgba(217,70,239,0.14),transparent_60%)]" />

              <div className="relative flex items-center justify-between">
                <IconBox>{s.icon}</IconBox>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white/5 ring-1 ring-white/10 px-2.5 py-1 text-[11px] text-white/55">
                    {s.chip}
                  </span>
                  <span className="grid size-9 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/70 transition group-hover:text-white">
                    <FiArrowUpRight className="text-[16px]" />
                  </span>
                </div>
              </div>

              <div className="relative mt-4">
                <p className="text-white/55 text-sm">{s.label}</p>

                <div className="mt-1">
                  {typeof s.value === "number" ? (
                    <p className="text-white text-3xl font-semibold tracking-tight">
                      {s.value}
                    </p>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Loading className="h-6! w-6! border-[3px]!" />
                      <ValueSkeleton />
                    </div>
                  )}
                </div>

                <div className="mt-4 h-0.5 w-12 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70 transition-all duration-300 group-hover:w-16" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
