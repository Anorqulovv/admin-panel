import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-24px)] w-full p-4">
      {/* same background as dashboard */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />

      <div className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
        {/* top neon line */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />
        {/* inner aura */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_15%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(217,70,239,0.10),transparent_55%),radial-gradient(700px_circle_at_50%_110%,rgba(99,102,241,0.10),transparent_55%)]" />

        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:items-center sm:p-10">
          {/* Left */}
          <div>
            <p className="text-white/45 text-xs tracking-[0.22em] uppercase">
              Error
            </p>
            <h1 className="mt-2 text-white text-3xl sm:text-4xl font-semibold tracking-tight">
              Sahifa topilmadi
            </h1>
            <p className="mt-2 text-white/55 text-sm leading-6">
              Siz qidirayotgan sahifa o‘chirilgan bo‘lishi yoki manzil noto‘g‘ri
              yozilgan bo‘lishi mumkin.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white/85 ring-1 ring-white/10 transition hover:bg-white/8 hover:text-white"
              >
                <FiArrowLeft className="text-[18px]" />
                Orqaga qaytish
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(99,102,241,0.25)] transition hover:brightness-110"
              >
                <FiHome className="text-[18px]" />
                Asosiyga o‘tish
              </button>
            </div>

            <div className="mt-5 h-0.5 w-14 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
          </div>

          {/* Right */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 opacity-70 blur-2xl bg-[radial-gradient(240px_circle_at_20%_20%,rgba(34,211,238,0.18),transparent_60%),radial-gradient(260px_circle_at_80%_80%,rgba(217,70,239,0.14),transparent_60%)]" />

            <div className="relative rounded-3xl bg-black/20 p-6 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/55 ring-1 ring-white/10">
                  404
                </span>
                <span className="grid size-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/70">
                  <FiSearch className="text-[18px]" />
                </span>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[70px] leading-none font-semibold tracking-tight text-white/90">
                  404
                </p>
                <p className="mt-2 text-white/50 text-sm">
                  Not Found
                </p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 rounded-2xl bg-white/5 ring-1 ring-white/10"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;