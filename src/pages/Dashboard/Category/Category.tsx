import { useEffect, useState } from "react";
import { Input } from "../../../components";
import Button from "../../../components/Button";
import { HiOutlineTag } from "react-icons/hi2";
import type { CategoryType } from "../../../@types";
import { GetById } from "../../../services";


const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(()=> {
    GetById("/categories",setCategories)
  },[setCategories])
  

  return (
    <section className="relative w-full p-3 sm:p-4">
      {/* page bg */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(1100px_circle_at_85%_65%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />

      <div className="h-full overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_12px_55px_rgba(0,0,0,0.55)]">
        {/* top neon line */}
        <div className="h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />

        <div className="h-full bg-white/5 backdrop-blur-2xl flex flex-col">
          {/* Header row (screenshotga yaqin) */}
          <div className="p-3 sm:p-4">

            {/* Search + create */}
            <div className="mt-4 flex flex-col lg:flex-row lg:items-center gap-3 rounded-3xl bg-white/5 ring-1 ring-white/10 p-3 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                <Input
                  extraClass="!mt-0 !w-full sm:!max-w-[320px] !border !border-white/10 !bg-white/5 !text-white placeholder:!text-white/40 !px-4 !rounded-2xl"
                  name="search"
                  placeholder="Kategoriya qidirish..."
                  type="text"
                />

                <div className="flex items-center gap-2 text-white/55 text-xs sm:text-sm">
                  <HiOutlineTag className="text-[16px]" />
                  <span> ta kategoriya</span>
                </div>
              </div>

              <Button
                extraClass="!mt-0 !w-full lg:!w-[140px] !h-11 !rounded-2xl !bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] !shadow-[0_0_18px_rgba(99,102,241,0.28)] hover:!brightness-110"
                type="button"
              >
                Yaratish
              </Button>
            </div>

            {/* title */}
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-white text-lg font-semibold">Kategoriyalar</p>
                <p className="text-white/50 text-xs sm:text-sm">
                  Test data bilan ko‘rinishi
                </p>
              </div>

              <div className="hidden md:block h-1 w-28 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
            </div>
          </div>

          {/* Content */}
          <div className="px-3 sm:px-4 pb-4 flex-1 overflow-auto">
            {categories.length === 0 ? (
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-10 text-center text-white/60">
                Kategoriya topilmadi
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {categories.map((c:any) => (
                  <article
                    key={c.id}
                    className="cursor-pointer group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition duration-300 hover:bg-white/[0.07] hover:-translate-y-0.5"
                  >
                    {/* glow */}
                    <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(280px_circle_at_20%_25%,rgba(34,211,238,0.16),transparent_60%),radial-gradient(300px_circle_at_80%_80%,rgba(217,70,239,0.12),transparent_60%)]" />

                    {/* image area */}
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.04]"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://placehold.co/600x400?text=No+Image";
                        }}
                      />

                      {/* overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,11,24,0.92),rgba(6,11,24,0.2),transparent_75%)]" />

                      {/* slug pill */}
                      <div className="absolute left-3 top-3 rounded-full bg-white/10 ring-1 ring-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
                        #{c.slug}
                      </div>

                      {/* accent bubble */}
                      <div className="absolute right-3 top-3 h-8 w-8 rounded-2xl bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-25 blur-[1px]" />
                    </div>

                    {/* body */}
                    <div className="relative p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-white font-semibold text-[17px] leading-snug line-clamp-1">
                            {c.name}
                          </p>
                          <p className="mt-1 text-[11px] text-white/50">
                            Slug:{" "}
                            <span className="text-white/75">{c.slug}</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 h-px bg-white/10" />

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[11px] text-white/45">Holat</span>
                        <span className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80">
                          Active
                        </span>
                      </div>

                      <div className="mt-4 h-0.5 w-14 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;