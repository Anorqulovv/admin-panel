import { useEffect, useState, type ChangeEvent } from "react";
import type { UserType } from "../../../@types";
import { instance, useDebounce } from "../../../hooks";
import { Input, MiniButton, PATH, UsersCard } from "../../../components";

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<"all" | "customer" | "admin">(
    "all"
  );

  const debounce = useDebounce(search, 1000);

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleSubmit(role: "all" | "customer" | "admin") {
    setRoleFilter(role);
  }

  useEffect(() => {
    instance()
      .get(PATH.users)
      .then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log("Users fetch error:", err);
        setUsers([]);
      });
  }, []);

  const filteredUsers = users.filter((u) => {
    const q = debounce.trim().toLowerCase();

    const matchesSearch =
      !q ||
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q);

    const matchesRole = roleFilter === "all" ? true : u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <section className="relative h-[95%] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_12px_55px_rgba(0,0,0,0.55)]">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(1100px_circle_at_85%_65%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-px -z-10 bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />

      <div className="h-full bg-white/5 backdrop-blur-2xl flex flex-col">
        {/* header */}
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center rounded-3xl bg-white/5 ring-1 ring-white/10 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-2">
              <div className="min-w-0">
                <p className="text-white/45 text-xs tracking-[0.22em] uppercase">
                  Users
                </p>
                <h2 className="mt-1 text-white text-lg sm:text-xl font-semibold">
                  Foydalanuvchilar ro‘yxati
                </h2>
                <p className="mt-1 text-white/50 text-sm">
                  {filteredUsers.length} ta foydalanuvchi topildi
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <MiniButton
                  type="button"
                  onClick={() => handleSubmit("all")}
                  extraClass={`w-[70px] h-[25px] text-[12px] cursor-pointer rounded-full px-1 text-xs ring-1 transition ${
                    roleFilter === "all"
                      ? "bg-white text-black ring-white"
                      : "bg-white/10 ring-white/15 text-white"
                  }`}
                >
                  Hammasi
                </MiniButton>

                <MiniButton
                  type="button"
                  onClick={() => handleSubmit("customer")}
                  extraClass={`w-[70px] h-[25px] text-[12px] cursor-pointer rounded-full px-1 text-xs ring-1 transition ${
                    roleFilter === "customer"
                      ? "bg-white text-black ring-white"
                      : "bg-white/10 ring-white/15 text-white"
                  }`}
                >
                  customer
                </MiniButton>

                <MiniButton
                  type="button"
                  onClick={() => handleSubmit("admin")}
                  extraClass={`w-[70px] h-[25px] text-[12px] cursor-pointer rounded-full px-1 text-xs ring-1 transition ${
                    roleFilter === "admin"
                      ? "bg-white text-black ring-white"
                      : "bg-white/10 ring-white/15 text-white"
                  }`}
                >
                  admin
                </MiniButton>
              </div>
            </div>

            <div className="w-full lg:w-75">
              <Input
                value={search}
                onChange={changeInput}
                type="text"
                placeholder="Search users..."
              />
            </div>
          </div>
        </div>

        {/* grid */}
        <div className="px-4 sm:px-5 pb-5 flex-1 overflow-auto">
          {filteredUsers.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredUsers.map((u) => (
                <UsersCard u={u} key={u.id} />
              ))}
            </div>
          ) : (
            <div className="h-full min-h-55 grid place-items-center rounded-3xl bg-white/5 ring-1 ring-white/10">
              <div className="text-center">
                <p className="text-white/80 text-lg font-medium">
                  Foydalanuvchi topilmadi
                </p>
                <p className="mt-1 text-white/45 text-sm">
                  Qidiruv yoki filter ni o‘zgartirib ko‘ring
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Users;