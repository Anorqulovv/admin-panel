import { useEffect, useState } from "react";
import {
  FiTrash2,
  FiUser,
  FiShield,
  FiHash,
  FiMail,
  FiImage,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteFn, GetById } from "../../../services";
import type { UserType } from "../../../@types";
import { Button, Loading, MiniButton, Modal } from "../../../components";

const UserMore = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading,setLoading] = useState<boolean>(false);
  const [delModal, setDelModal] = useState<boolean>(false)
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    GetById(`users/${id}`, setUser);
  }, [id]);

  function handleSubmit(){
    setLoading(true)
    DeleteFn(`users/${id}`,setLoading,setDelModal,"user is deleted",navigate)
  }

  return (
    <div>
      <div className="mx-auto w-full">
        {/* Main wrapper */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          {/* glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_10%_10%,rgba(217,70,239,0.12),transparent_55%),radial-gradient(700px_circle_at_90%_85%,rgba(34,211,238,0.10),transparent_55%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.8),rgba(217,70,239,0.7),transparent)]" />

          <div className="relative p-4">
            {/* HEADER CARD */}
            <div className="mb-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 ">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.22em] uppercase text-white/40">
                    User Details
                  </p>
                  <h1 className="mt-1 text-2xl md:text-4xl font-semibold text-white wrap-break-word">
                    {user?.name || "Loading..."}
                  </h1>
                  <p className="mt-1 text-sm text-white/45">
                    Foydalanuvchi haqida ma’lumot
                  </p>
                </div>

                <div className=" flex justify-center items-center gap-3">
                  <MiniButton onClick={() => setDelModal(true)} type="button" extraClass="flex items-center size-12 rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/70 hover:bg-white/10 hover:text-white transition">
                    <FiTrash2 />
                  </MiniButton>
                  <Button type="button" onClick={() => navigate(`/users/${id}/update`)} extraClass="inline-flex items-center gap-2 h-12 px-6 !mt-0 rounded-2xl text-white font-semibold bg-[linear-gradient(135deg,#22d3ee,#6366f1,#d946ef)] hover:opacity-90 transition shadow-[0_10px_30px_rgba(99,102,241,.2)]">
                    Tahrirlash
                  </Button>
                </div>
              </div>
            </div>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.55fr_1fr]">
              {/* LEFT: HERO PREVIEW */}
              <div className="relative h-157.5 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "user avatar"}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}

                {/* overlays for dark effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,18,32,0.25),rgba(11,18,32,0.65))]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(217,70,239,0.16),transparent_45%)]" />
                {/* top badges */}
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur">
                    <FiHash className="text-[12px]" />
                    ID: {user?.id ?? "-"}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur">
                    <FiShield className="text-[12px]" />
                    {user?.role || "No role"}
                  </span>
                </div>

                {/* bottom overlay preview */}
                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-4 md:p-5">
                  <p className="text-[11px] tracking-[0.22em] uppercase text-white/45">
                    Preview
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-white wrap-break-word">
                    {user?.name || "Unknown user"}
                  </h3>
                  <p className="mt-1 text-white/65 break-all">
                    {user?.email || "No email"}
                  </p>

                  <div className="mt-3 h-0.5 w-14 rounded-full bg-[linear-gradient(90deg,#22d3ee,#d946ef)]" />
                </div>
              </div>

              {/* RIGHT: INFO PANELS */}
              <div className="grid gap-4">
                {/* ASOSIY MALUMOT */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-4 text-[11px] tracking-[0.22em] uppercase text-white/45">
                    Asosiy ma’lumot
                  </p>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                      <p className="text-xs text-white/45">ID</p>
                      <p className="mt-1 text-2xl font-semibold text-white">
                        {user?.id ?? "-"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                      <div className="flex items-center gap-2 text-white/55 text-xs">
                        <FiUser />
                        <span>Nomi</span>
                      </div>
                      <p className="mt-2 text-xl font-semibold text-white wrap-break-word">
                        {user?.name || "-"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                      <div className="flex items-center gap-2 text-white/55 text-xs">
                        <FiMail />
                        <span>Email</span>
                      </div>
                      <p className="mt-2 text-lg font-semibold text-white break-all">
                        {user?.email || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QO‘SHIMCHA */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-4 text-[11px] tracking-[0.22em] uppercase text-white/45">
                    Qo‘shimcha
                  </p>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                      <div className="flex items-center gap-2 text-white/55 text-xs">
                        <FiShield />
                        <span>Role</span>
                      </div>
                      <p className="mt-2 text-white font-medium capitalize">
                        {user?.role || "-"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                      <div className="flex items-center gap-2 text-white/55 text-xs">
                        <FiImage />
                        <span>Avatar URL</span>
                      </div>
                      <p className="mt-2 text-white/85 text-sm break-all">
                        {user?.avatar || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal
        open={delModal}
        onClose={() => setDelModal(false)}
        title="Userni ochirmoqchimisiz!"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4">
          <Button
            onClick={() => setDelModal(false)}
            extraClass="w-[150px]"
            type="button"
          >
            Bekor qilish
          </Button>

          <Button
            onClick={handleSubmit}
            extraClass="w-[150px]"
            type="button"
          >
            {loading ? <Loading /> : "O'chirish"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserMore;