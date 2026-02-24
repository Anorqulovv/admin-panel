import type { FC } from "react";
import { HiOutlineTag } from "react-icons/hi";
import type { ProductType } from "../@types";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  p: ProductType;
}

const ProductCard: FC<ProductCardProps> = ({ p }) => {
  const navigate = useNavigate();

  function handleMore() {
    navigate(`/products/${p.id}`);
  }
  return (
    <div onClick={handleMore} className="cursor-pointer group relative overflow-hidden rounded-[28px] bg-white/4 ring-1 ring-white/10 shadow-[0_22px_70px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/6">
      {/* gradient border glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -inset-0.5 rounded-[30px] bg-[linear-gradient(135deg,rgba(34,211,238,0.45),rgba(217,70,239,0.35),rgba(99,102,241,0.35))] blur-xl" />
      </div>

      {/* image block */}
      <div className="relative">
        <div className="relative h-44 overflow-hidden">
          <img
            src={p.images?.[0] || p.category?.image}
            alt={p.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06] group-hover:opacity-95"
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_10%,rgba(34,211,238,0.20),transparent_55%),linear-gradient(to_top,rgba(6,11,24,0.92),transparent_60%)]" />
        </div>

        {/* top-left category chip */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/85 ring-1 ring-white/10 backdrop-blur-xl">
          <HiOutlineTag className="text-[14px]" />
          {p.category?.name}
        </div>

        {/* bottom-right price badge */}
        <div className="absolute right-3 bottom-3 rounded-2xl bg-white/10 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur-xl">
          <span className="bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] bg-clip-text text-transparent">
            ${p.price}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="relative p-4">
        {/* title + slug */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-white font-semibold leading-snug line-clamp-1">
              {p.title}
            </p>
            <p className="mt-1 text-[11px] text-white/40 line-clamp-1">
              {p.slug}
            </p>
          </div>

          {/* mini sparkle */}
          <div className="h-8 w-8 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-xl grid place-items-center opacity-70 group-hover:opacity-100 transition">
            <div className="h-3 w-3 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] blur-[0.2px]" />
          </div>
        </div>

        {/* description */}
        <p className="mt-3 text-xs text-white/60 line-clamp-2">
          {p.description}
        </p>

        {/* divider */}
        <div className="mt-4 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.14),transparent)]" />

        {/* footer */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-white/45">Category ID</span>
          <span className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80">
            #{p.category?.id}
          </span>
        </div>

        {/* accent bar */}
        <div className="mt-4 h-0.5 w-16 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
      </div>
    </div>
  );
};

export default ProductCard;