import { useEffect, useState } from "react";
import { Input, Loading } from "../../../components";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../hooks";
import { CrudFn } from "../../../services";

const CategoryCrud = () => {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  function handleSubmit() {
      setLoading(true);
      const data = { name,image };
      CrudFn(
        id,
        id ? `/categories/${id}`: `/categories`,
        data,
        setLoading,
        navigate,
        `Categoriya ${id ? "tahrirlandi" : "qoshildi"}`
      );
    }

  useEffect(() => {
    if (id) {
      instance()
        .get(`/categories/${id}`)
        .then((res) => {
          setName(res.data.name);
          setImage(res.data.image);
        });
    }
  }, [id]);

  return (
    <section className="relative min-h-[calc(100vh-24px)] w-full p-4">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />

      <form
        autoComplete="off"
        className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* top neon line */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />
        {/* inner aura */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_15%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(217,70,239,0.10),transparent_55%),radial-gradient(700px_circle_at_50%_110%,rgba(99,102,241,0.10),transparent_55%)]" />

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-white/45 text-xs tracking-[0.22em] uppercase">
              Categories
            </p>
            <h1 className="mt-1 truncate text-white text-xl sm:text-2xl font-semibold">
              Kategoriya {id ? "tahrirlash" : "qo'shish"}
            </h1>
            <p className="mt-1 text-white/50 text-sm">
              Kategoriya ma’lumotlarini kiriting
            </p>
          </div>

          <Button
            onClick={()=> handleSubmit()}
            extraClass="!mt-0 !w-full sm:!w-[140px] !h-[48px] !rounded-2xl !px-4 !py-2.5 !shadow-[0_12px_35px_rgba(59,130,246,0.25)] hover:!shadow-[0_16px_55px_rgba(59,130,246,0.35)]"
            type="submit"
          >
            {loading ? <Loading /> : "Saqlash"}
          </Button>
        </div>

        {/* Divider */}
        <div className="mt-5 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* Body */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {/* Left card - form */}
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)] p-5">
            <p className="text-white/55 text-xs tracking-[0.2em] uppercase">
              Asosiy
            </p>

            <div className="mt-4 flex flex-col gap-5">
              <label className="grid gap-2">
                <span className="text-white/75 text-sm">Kategoriya nomi</span>
                <Input
                  value={name}
                  setValue={setName}
                  extraClass="!border-0 !bg-black/20 !ring-1 !ring-white/10 !rounded-2xl !pl-4 focus:!ring-white/20"
                  type="text"
                  name="name"
                  placeholder="Kategoriya nomini kiriting"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-white/75 text-sm">
                  Kategoriya rasmi (URL)
                </span>
                <Input
                  value={image}
                  setValue={setImage}
                  extraClass="!border-0 !bg-black/20 !ring-1 !ring-white/10 !rounded-2xl !pl-4 focus:!ring-white/20"
                  type="text"
                  name="image"
                  placeholder="https://..."
                />
              </label>

              {/* meta preview blocks */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-4">
                  <p className="text-white/45 text-xs">Nomi</p>
                  <p className="mt-1 text-white font-medium wrap-break-word">
                    {name || "-"}
                  </p>
                </div>

                <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-4">
                  <p className="text-white/45 text-xs">Holat</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-xs font-medium text-white/85">
                      Draft Preview
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-4">
                <p className="text-white/45 text-xs">Rasm URL</p>
                <p className="mt-1 text-sm text-white/85 break-all">
                  {image || "-"}
                </p>
              </div>

              <div className="mt-1 h-0.5 w-12 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
            </div>
          </div>

          {/* Right card - preview */}
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)] p-5">
            <p className="text-white/55 text-xs tracking-[0.2em] uppercase">
              Preview
            </p>

            <div className="mt-4 flex flex-col gap-4">
              {/* image preview */}
              <div className="overflow-hidden rounded-2xl bg-black/15 ring-1 ring-white/10">
                <div className="relative h-100 overflow-hidden">
                  <img
                    src={image || "https://placeimg.com/640/480/any"}
                    alt={name || "Category preview"}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/1200x800?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,11,24,0.95),rgba(6,11,24,0.2),transparent_70%)]" />

                  <div className="absolute left-4 top-4 rounded-full bg-white/10 ring-1 ring-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
                    Category
                  </div>

                  <div className="absolute left-4 right-4 bottom-4">
                    <div className="rounded-2xl bg-black/25 backdrop-blur-md ring-1 ring-white/10 p-4">
                      <p className="text-white/55 text-xs tracking-[0.2em] uppercase">
                        Live preview
                      </p>
                      <h2 className="mt-1 text-white text-lg sm:text-xl font-semibold line-clamp-1">
                        {name || "Kategoriya nomi"}
                      </h2>

                      <div className="mt-3 h-0.5 w-16 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-80" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-1 h-0.5 w-12 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CategoryCrud;
