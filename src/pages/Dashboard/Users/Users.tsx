import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import type { UserType } from "../../../@types";
import { instance } from "../../../hooks";
import { PATH } from "../../../components";


const Users = () => {
  const [users,setUsers] = useState<UserType[]>([])

  useEffect(()=>{
    instance().get(PATH.users).then(res => setUsers(res.data))
  },[users])
  
  return (
    <section className="relative h-[95%] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_12px_55px_rgba(0,0,0,0.55)]">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(1100px_circle_at_85%_65%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-px -z-10 bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />

      <div className="h-full bg-white/5 backdrop-blur-2xl flex flex-col">
        {/* header */}
        <div className="p-4 sm:p-5">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-white/45 text-xs tracking-[0.22em] uppercase">
                  Users
                </p>
                <h2 className="mt-1 text-white text-lg sm:text-xl font-semibold">
                  Foydalanuvchilar ro‘yxati
                </h2>
                <p className="mt-1 text-white/50 text-sm">
                  Test ma’lumotlar asosida UI preview
                </p>
              </div>
            </div>

            <div className="mt-4 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

            {/* static pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full px-3 py-1 text-xs ring-1 bg-white/10 ring-white/15 text-white">
                Hammasi
              </span>
              <span className="rounded-full px-3 py-1 text-xs ring-1 bg-white/5 ring-white/10 text-white/70">
                customer
              </span>
              <span className="rounded-full px-3 py-1 text-xs ring-1 bg-white/5 ring-white/10 text-white/70">
                admin
              </span>
            </div>
          </div>
        </div>

        {/* grid */}
        <div className="px-4 sm:px-5 pb-5 flex-1 overflow-auto">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {users.map((u) => (
              <div
                key={u.id}
                className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition duration-300 hover:bg-white/[0.07] hover:-translate-y-0.5"
              >
                {/* glow */}
                <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(280px_circle_at_20%_25%,rgba(34,211,238,0.16),transparent_60%),radial-gradient(300px_circle_at_80%_80%,rgba(217,70,239,0.12),transparent_60%)]" />

                {/* neon top line */}
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.85),rgba(217,70,239,0.7),transparent)] opacity-70" />

                {/* header */}
                <div className="relative p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="size-14 rounded-2xl object-cover ring-1 ring-white/10 bg-white/5"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/120x120?text=User";
                          }}
                        />
                        <span className="absolute -bottom-1 -right-1 size-4 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] ring-2 ring-[#060B18]" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-white font-semibold leading-snug line-clamp-1">
                          {u.name}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-white/55 min-w-0">
                          <FiMail className="shrink-0" />
                          <span className="truncate">{u.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* role + id */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-3">
                      <p className="text-[11px] text-white/45">Role</p>
                      <span
                        className={[
                          "mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
                          u.role === "admin"
                            ? "bg-white/10 text-white ring-white/15"
                            : "bg-white/5 text-white/80 ring-white/10",
                        ].join(" ")}
                      >
                        <HiOutlineShieldCheck className="text-[13px]" />
                        {u.role}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-3">
                      <p className="text-[11px] text-white/45">User ID</p>
                      <p className="mt-2 text-sm font-medium text-white/90">
                        #{u.id}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-px bg-white/10" />
                </div>

                {/* footer */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white/45">Status</span>
                    <span className="inline-flex items-center gap-2 text-[11px] text-white/85 font-medium">
                      <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                      Active
                    </span>
                  </div>

                  <div className="mt-3 h-0.5 w-16 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-75" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;