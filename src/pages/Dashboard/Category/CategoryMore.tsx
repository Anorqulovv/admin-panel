import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { FiHash, FiImage } from "react-icons/fi";
import { HiOutlineTag } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import type { CategoryType } from "../../../@types";
import { DeleteFn, GetById } from "../../../services";
import { Loading, MiniButton, Modal } from "../../../components";
import { AiFillDelete } from "react-icons/ai";

const CategoryMore = () => {
  const [category, setCategory] = useState<CategoryType>();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false)
  const [delModal, setDelModal] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    GetById(`categories/${id}`, setCategory);
  }, [id]);

  function handleDelete(){
    setLoading(true)
    DeleteFn(`/categories/${Number(id)}`, setLoading, setDelModal, "Categoriya o'chirildi", navigate)
  }

  return (
    <section className="relative w-full p-3 sm:p-4">
      {/* page background */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_18%_18%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(1100px_circle_at_88%_68%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />

      <div className="overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_12px_55px_rgba(0,0,0,0.55)]">
        {/* neon line */}
        <div className="h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />

        <div className="bg-white/5 backdrop-blur-2xl">
          {/* Top */}
          <div className="p-3 sm:p-4">
            <div className=" flex  h-25 rounded-3xl bg-white/5 ring-1 ring-white/10  shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between w-full mx-5">
                <div>
                  <p className="text-white/45 text-xs tracking-[0.22em] uppercase">
                    Category details
                  </p>
                  <h1 className="mt-1 text-white text-xl sm:text-2xl font-semibold truncate">
                    {category?.name}
                  </h1>
                  <p className="mt-1 text-white/50 text-sm">
                    Kategoriya haqida ma’lumot
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <MiniButton extraClass="!w-[45px] !h-[45px]" onClick={() => setDelModal(true)}>
                    <AiFillDelete />
                  </MiniButton>

                  <Button
                    onClick={() => navigate("update")}
                    type="button"
                    extraClass="!mt-0 !w-full lg:!w-[160px] !h-12.5 !rounded-2xl !bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] !shadow-[0_0_18px_rgba(99,102,241,0.28)] hover:!brightness-110"
                  >
                    Tahrirlash
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="px-3 sm:px-4 pb-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            {/* Left - image preview */}
            <div className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
              <div className="relative h-145 overflow-hidden">
                <img
                  src={category?.image}
                  alt={category?.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/1200x800?text=No+Image";
                  }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,11,24,0.97),rgba(6,11,24,0.35),transparent_70%)]" />

                {/* top chips */}
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
                    <FiHash className="text-[12px]" />
                    ID: {category?.id}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
                    <HiOutlineTag className="text-[13px]" />#{category?.slug}
                  </span>
                </div>

                {/* bottom overlay content */}
                <div className="absolute left-4 right-4 bottom-4">
                  <div className="rounded-2xl bg-black/25 backdrop-blur-md ring-1 ring-white/10 p-4">
                    <p className="text-white/55 text-xs tracking-[0.2em] uppercase">
                      Preview
                    </p>
                    <h2 className="mt-1 text-white text-lg sm:text-xl font-semibold">
                      {category?.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/60">
                      Slug:{" "}
                      <span className="text-white/80">#{category?.slug}</span>
                    </p>

                    <div className="mt-3 h-0.5 w-16 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-80" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - info blocks */}
            <div className="flex flex-col gap-4">
              {/* basic info */}
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)] p-5">
                <p className="text-white/55 text-xs tracking-[0.2em] uppercase">
                  Asosiy ma’lumot
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-4">
                    <p className="text-white/45 text-xs">ID</p>
                    <p className="mt-1 text-white font-medium">{category?.id}</p>
                  </div>

                  <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-4">
                    <p className="text-white/45 text-xs">Nomi</p>
                    <p className="mt-1 text-white font-medium">
                      {category?.name}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-4">
                    <p className="text-white/45 text-xs">Slug</p>
                    <p className="mt-1 text-white font-medium">
                      #{category?.slug}
                    </p>
                  </div>
                </div>
              </div>

              {/* image url + status */}
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)] p-5">
                <p className="text-white/55 text-xs tracking-[0.2em] uppercase">
                  Qo‘shimcha
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl bg-black/15 ring-1 ring-white/10 p-4">
                    <div className="grid place-items-center h-9 w-9 rounded-xl bg-white/5 ring-1 ring-white/10 text-white/75 shrink-0">
                      <FiImage />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/45 text-xs">Rasm URL</p>
                      <p className="mt-1 text-sm text-white/85 break-all">
                        {category?.image}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-4">
                    <p className="text-white/45 text-xs">Holat</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-xs font-medium text-white/85">
                        Active
                      </span>
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
        title="Categoryni ochirmoqchimisiz!"
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
            onClick={handleDelete}
            extraClass="w-[150px]"
            type="button"
          >
            {loading ? <Loading /> : "O'chirish"}
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default CategoryMore;
