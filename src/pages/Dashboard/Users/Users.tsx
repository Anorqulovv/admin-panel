import { useMemo, useState } from "react";
import { Input } from "../../../components";
import Button from "../../../components/Button";
import { MiniButton } from "../../../components";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineShieldCheck, HiOutlineUser } from "react-icons/hi2";

type UserType = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "customer" | "admin" | string;
  avatar: string;
};

const Users = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "customer" | "admin">(
    "all",
  );

  const users = useMemo<UserType[]>(
    () => [
      {
        id: 1,
        email: "john@mail.com",
        password: "changeme",
        name: "Jhon",
        role: "customer",
        avatar: "...",
      },
      // ...
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      const matchText =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q);

      const matchRole = roleFilter === "all" ? true : u.role === roleFilter;
      return matchText && matchRole;
    });
  }, [search, roleFilter, users]);

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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />

              {/* role filter (simple pills) */}
              <div className="hidden md:flex items-center gap-2">
                {(["all", "customer", "admin"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRoleFilter(r)}
                    className={[
                      "rounded-full px-3 py-1 text-xs ring-1 transition",
                      r === roleFilter
                        ? "bg-white/10 ring-white/15 text-white"
                        : "bg-white/5 ring-white/10 text-white/60 hover:text-white hover:bg-white/10",
                    ].join(" ")}
                  >
                    {r === "all" ? "Hammasi" : r}
                  </button>
                ))}
              </div>

              <div className="hidden xl:flex items-center gap-2 text-white/55 text-xs">
                <HiOutlineUser className="text-[16px]" />
                {filtered.length} ta user
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
              <p className="text-white font-semibold">Foydalanuvchilar</p>
              <p className="text-white/50 text-xs">
                Userlarni ko‘rish, tahrirlash va o‘chirish (test data)
              </p>
            </div>
            <div className="hidden md:block h-1 w-28 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
          </div>
        </div>

        {/* content */}
        <div className="px-4 pb-4 flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-10 text-center text-white/60">
              Foydalanuvchi topilmadi
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((u) => (
                <div
                  key={u.id}
                  className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition hover:bg-white/[0.07]"
                >
                  {/* glow */}
                  <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(280px_circle_at_20%_25%,rgba(34,211,238,0.16),transparent_60%),radial-gradient(300px_circle_at_80%_80%,rgba(217,70,239,0.12),transparent_60%)]" />

                  {/* header */}
                  <div className="relative p-4 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="size-12 rounded-2xl object-cover ring-1 ring-white/10"
                            onError={(
                              e: React.SyntheticEvent<HTMLImageElement, Event>,
                            ) => {
                              e.currentTarget.src =
                                "https://placehold.co/120x120";
                            }}
                          />

                          <span className="absolute -bottom-1 -right-1 size-4 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] ring-2 ring-[#060B18]" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-white font-semibold leading-snug line-clamp-1">
                            {u.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-white/55 line-clamp-1">
                            {u.email}
                          </p>
                        </div>
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

                    {/* role pill */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] text-white/45">Role</span>
                      <span
                        className={[
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
                          u.role === "admin"
                            ? "bg-white/10 text-white ring-white/15"
                            : "bg-white/5 text-white/80 ring-white/10",
                        ].join(" ")}
                      >
                        <HiOutlineShieldCheck className="text-[14px]" />
                        {u.role}
                      </span>
                    </div>

                    {/* accent */}
                    <div className="mt-4 h-px bg-white/10" />
                  </div>

                  {/* footer */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/45">Status</span>
                      <span className="text-[11px] text-white/80 font-medium">
                        Active
                      </span>
                    </div>
                    <div className="mt-3 h-0.5 w-14 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
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

export default Users;
