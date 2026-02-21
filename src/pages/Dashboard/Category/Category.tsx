import { useMemo, useState } from "react";
import { Input } from "../../../components";
import Button from "../../../components/Button";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineTag } from "react-icons/hi2";
import { MiniButton } from "../../../components";

type CategoryType = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

const Category = () => {
  const [search, setSearch] = useState("");

  const categories = useMemo<CategoryType[]>(
  () => [
    { id: 1, name: "Clothes", slug: "clothes", image: "https://placehold.co/600x400" },
    { id: 2, name: "Electronics", slug: "electronics", image: "https://placehold.co/600x400" },
    // ...
  ],
  []
);

const filtered = useMemo(() => {
  const q = search.trim().toLowerCase();
  if (!q) return categories;
  return categories.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q)
  );
}, [search, categories]);

  return (
    <div className="relative h-[95%] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_12px_55px_rgba(0,0,0,0.55)]">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(1100px_circle_at_85%_65%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-px -z-10 bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />

      <div className="h-full bg-white/5 backdrop-blur-2xl flex flex-col">
        {/* top bar */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-4 rounded-3xl bg-white/5 ring-1 ring-white/10 px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-4">
              <Input
                 extraClass="!mt-0 !w-80 !border !border-white/10 !bg-white/5 !text-white placeholder:!text-white/40 !px-4"
                 name="search"
                 placeholder="Kategoriya qidirish..."
                 type="text"
                 value={search}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
               />
              <div className="hidden md:flex items-center gap-2 text-white/55 text-xs">
                <HiOutlineTag className="text-[16px]" />
                {filtered.length} ta kategoriya
              </div>
            </div>

            <Button
              extraClass="!mt-0 !w-[140px] !bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] !shadow-[0_0_18px_rgba(99,102,241,0.28)] hover:!brightness-110"
              type="button"
            >
              Yaratish
            </Button>
          </div>

          {/* title row */}
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-white font-semibold">Kategoriyalar</p>
              <p className="text-white/50 text-xs">Test data bilan ko‘rinishi</p>
            </div>
            <div className="hidden md:block h-1 w-28 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
          </div>
        </div>

        {/* content */}
        <div className="px-4 pb-4 flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-10 text-center text-white/60">
              Kategoriya topilmadi
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition hover:bg-white/[0.07]"
                >
                  {/* glow */}
                  <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(280px_circle_at_20%_25%,rgba(34,211,238,0.16),transparent_60%),radial-gradient(300px_circle_at_80%_80%,rgba(217,70,239,0.12),transparent_60%)]" />

                  {/* image */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,11,24,0.90),transparent_65%)]" />

                    {/* slug pill */}
                    <div className="absolute left-3 top-3 rounded-full bg-white/10 ring-1 ring-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
                      #{c.slug}
                    </div>

                    {/* tiny corner accent */}
                    <div className="absolute right-3 top-3 h-8 w-8 rounded-2xl bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-25 blur-[1px]" />
                  </div>

                  {/* body */}
                  <div className="relative p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-white font-semibold leading-snug line-clamp-1">
                          {c.name}
                        </p>

                        {/* nicer subtitle */}
                        <p className="mt-1 text-[11px] text-white/50">
                          Slug: <span className="text-white/75">{c.slug}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 opacity-95">
                        <MiniButton type="button">
                          <FiEdit2 />
                        </MiniButton>
                        <MiniButton
                          type="button"
                          extraClass="hover:shadow-[0_0_18px_rgba(217,70,239,0.18)]"
                        >
                          <FiTrash2 />
                        </MiniButton>
                      </div>
                    </div>

                    {/* soft divider */}
                    <div className="mt-4 h-px bg-white/10" />

                    {/* footer row */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] text-white/45">Holat</span>
                      <span className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80">
                        Active
                      </span>
                    </div>

                    {/* tiny gradient accent */}
                    <div className="mt-4 h-0.5 w-14 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
