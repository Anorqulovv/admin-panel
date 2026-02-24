import { useNavigate } from "react-router-dom";
import type { CategoryType } from "../@types";

type CategoryCardProps = {
  c: CategoryType;
};

const CategoryCard = ({ c }: CategoryCardProps) => {
  const navigate = useNavigate();
  function handleMore() {
    navigate(`/categories/${c.id}`);
  }
  return (
    <article
      onClick={() => handleMore()}
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

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,11,24,0.92),rgba(6,11,24,0.2),transparent_75%)]" />

        <div className="absolute left-3 top-3 rounded-full bg-white/10 ring-1 ring-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
          #{c.slug}
        </div>

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
              Slug: <span className="text-white/75">{c.slug}</span>
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
  );
};

export default CategoryCard;