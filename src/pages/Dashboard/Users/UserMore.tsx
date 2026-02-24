import { FiMail, FiUser, FiX } from "react-icons/fi";


const UserMore = () => {
  const data = {
    name: "name",
    email: "email"
  }
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220]/95 shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
      >
        {/* glow bg */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_circle_at_15%_15%,rgba(34,211,238,0.15),transparent_55%),radial-gradient(500px_circle_at_85%_75%,rgba(217,70,239,0.12),transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.8),transparent)]" />

        <div className="relative p-5">
          {/* header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/45">
                User More
              </p>
              <h3 className="mt-1 text-white text-lg font-semibold">
                Foydalanuvchi ma’lumotlari
              </h3>
              <p className="mt-1 text-sm text-white/50">
                Batafsil ko‘rish oynasi
              </p>
            </div>

            <button
              className="grid place-items-center size-10 rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/70 hover:text-white hover:bg-white/10 transition"
              aria-label="Yopish"
            >
              <FiX />
            </button>
          </div>

          {/* avatar mock */}
          <div className="mt-5 flex items-center gap-4 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
            <div className="relative shrink-0">
              <div className="size-14 rounded-2xl bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] p-px">
                <div className="size-full rounded-2xl bg-[#0B1220] grid place-items-center text-white/90">
                  <FiUser className="text-xl" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 size-3 rounded-full bg-emerald-400 ring-2 ring-[#0B1220]" />
            </div>

            <div className="min-w-0">
              <p className="text-white font-semibold truncate">{data.name}</p>
              <p className="text-xs text-white/45 mt-0.5">Active user</p>
            </div>
          </div>

          {/* info cards */}
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <FiUser />
                <span>Name</span>
              </div>
              <p className="mt-2 text-white font-medium wrap-break-word">{data.name}</p>
            </div>

            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <FiMail />
                <span>Email</span>
              </div>
              <p className="mt-2 text-white font-medium break-all">{data.email}</p>
            </div>
          </div>

          {/* footer */}
          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              className="h-10 px-4 rounded-xl bg-white/5 ring-1 ring-white/10 text-white/85 hover:bg-white/10 transition"
            >
              Yopish
            </button>
            <button
              className="h-10 px-4 rounded-xl text-white font-medium bg-[linear-gradient(135deg,#22d3ee,#6366f1,#d946ef)] hover:opacity-90 transition"
              type="button"
            >
              Edit (UI)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMore;