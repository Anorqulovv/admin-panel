import { useEffect, useState, type SubmitEvent } from "react";
import { Input, Loading, Select } from "../../../components";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../hooks";
import { CrudFn } from "../../../services";

const ProductCrud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [images, setImages] = useState<string>("");

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    setLoading(true);
    evt.preventDefault();
    const data = { title, price, description, categoryId, images: [images] };
    CrudFn(
      id,
      id ? `/products/${id}`: `/products`,
      data,
      setLoading,
      navigate,
      `Mahsulot ${id ? "tahrirlandi" : "qoshildi"}`
    );
  }

  useEffect(() => {
    if (id) {
      instance()
        .get(`/products/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setPrice(res.data.price);
          setDescription(res.data.description);
          setCategoryId(res.data.category.id);
          setImages(res.data.images[0]);
        });
    }
  }, [id]);

  return (
    <section className="relative min-h-[calc(100vh-24px)] w-full p-4">
      {/* same background as dashboard */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_25%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] p-5 sm:p-6"
      >
        {/* top neon line */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />
        {/* inner aura */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_15%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(217,70,239,0.10),transparent_55%),radial-gradient(700px_circle_at_50%_110%,rgba(99,102,241,0.10),transparent_55%)]" />

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-white/45 text-xs tracking-[0.22em] uppercase">
              Products
            </p>
            <h1 className="mt-1 truncate text-white text-xl sm:text-2xl font-semibold">
              Mahsulot {id ? "tahrirlash" : "qo'shish"}
            </h1>
            <p className="mt-1 text-white/50 text-sm">Ma’lumotlarni kiriting</p>
          </div>

          <Button
            extraClass="!mt-0 !w-full sm:!w-[140px] !h-[48px] !rounded-2xl !px-4 !py-2.5 !shadow-[0_12px_35px_rgba(59,130,246,0.25)] hover:!shadow-[0_16px_55px_rgba(59,130,246,0.35)]"
            type="submit"
            onClick={() => handleSubmit}
          >
            {loading ? <Loading /> : "Saqlash"}
          </Button>
        </div>

        {/* Divider */}
        <div className="mt-5 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* Form */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {/* Left card */}
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)] p-5">
            <p className="text-white/55 text-xs tracking-[0.2em] uppercase">
              Asosiy
            </p>

            <div className="mt-4 flex flex-col gap-5">
              <label className="grid gap-2">
                <span className="text-white/75 text-sm">Mahsulot nomi</span>
                <Input
                  value={title}
                  setValue={setTitle}
                  extraClass="!border-0 !bg-black/20 !ring-1 !ring-white/10 !rounded-2xl !pl-4 focus:!ring-white/20"
                  type="text"
                  name="title"
                  placeholder="Mahsulot nomini kiriting"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-white/75 text-sm">Mahsulot narxi</span>
                <Input
                  value={price}
                  setValue={setPrice}
                  extraClass="!border-0 !bg-black/20 !ring-1 !ring-white/10 !rounded-2xl !pl-4 focus:!ring-white/20"
                  type="text"
                  name="price"
                  placeholder="Mahsulot narxini kiriting"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-white/75 text-sm">Mahsulot haqida</span>
                <Input
                  value={description}
                  setValue={setDescription}
                  extraClass="!border-0 !bg-black/20 !ring-1 !ring-white/10 !rounded-2xl !pl-4 focus:!ring-white/20"
                  type="text"
                  name="description"
                  placeholder="Mahsulot haqida..."
                />
              </label>

              <div className="mt-1 h-0.5 w-12 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
            </div>
          </div>

          {/* Right card */}
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.25)] p-5">
            <p className="text-white/55 text-xs tracking-[0.2em] uppercase">
              Qo‘shimcha
            </p>

            <div className="mt-4 flex flex-col gap-5">
              <label className="grid gap-2">
                <span className="text-white/75 text-sm">Kategoriya tanlang</span>
                <Select
                  extraClass="w-full !border-0 !bg-black/20 !ring-1 !ring-white/10 !rounded-2xl !py-[13px] focus:!ring-white/20"
                  value={categoryId}
                  setValue={setCategoryId}
                  URL="/categories"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-white/75 text-sm">Mahsulot rasmi</span>
                <Input
                  value={images}
                  setValue={setImages}
                  extraClass="!border-0 !bg-black/20 !ring-1 !ring-white/10 !rounded-2xl !pl-4 focus:!ring-white/20"
                  type="text"
                  name="images"
                  placeholder="Mahsulot rasmini kiriting"
                />
              </label>

              {/* preview */}
              <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-3">
                <p className="text-xs text-white/55">Preview</p>
                <div className="mt-2 aspect-16/10 overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/10">
                  <img
                    src={images || "https://picsum.photos/id/10/1200/700"}
                    alt="preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://picsum.photos/id/10/1200/700";
                    }}
                  />
                </div>
              </div>

              <div className="mt-1 h-0.5 w-12 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
            </div>
          </div>
        </div>

        {/* mobile save */}
        <div className="mt-6 sm:hidden">
          <Button
            extraClass="!mt-0 !w-full !h-[48px] !rounded-2xl !px-4 !py-2.5 !shadow-[0_12px_35px_rgba(59,130,246,0.25)] hover:!shadow-[0_16px_55px_rgba(59,130,246,0.35)]"
            type="submit"
          >
            {loading ? <Loading /> : "Saqlash"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProductCrud;