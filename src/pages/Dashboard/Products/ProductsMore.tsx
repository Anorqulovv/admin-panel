import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { ProductType } from "../../../@types"
import { Loading, MiniButton, Modal } from "../../../components"
import { AiFillDelete } from "react-icons/ai"
import Button from "../../../components/Button"
import { DeleteFn, GetById } from "../../../services"

const ProductsMore = () => {
  const { id } = useParams()
  const [moreData, setMoreData] = useState<ProductType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [delModal, setDelModal] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => GetById(`/products/${id}`, setMoreData), [id])
  const money = (n: number | undefined) => `$${Number(n).toFixed(2)}`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fmt = (iso: any) => new Date(iso).toLocaleString()

  // Delete Product
  function handleDeleteProduct() {
    setLoading(true)
    DeleteFn(`/products/${id}`, setLoading, setDelModal, "Mahsulot o'chirildi", navigate)
  }

  return (
    <div className="relative w-full">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -right-24 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-28 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-10">
        <div className="rounded-3xl border border-white/10 bg-linear-to-r from-white/8 via-white/5 to-white/8 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="min-w-0">
              <p className="text-[11px] font-medium tracking-[0.22em] text-white/55">
                PRODUCTS <span className="text-white/35">/</span> #{moreData?.id}
              </p>
              <h1 className="mt-1 truncate text-xl font-semibold text-white sm:text-2xl">
                {moreData?.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <MiniButton
                onClick={() => setDelModal(true)}
              >
                <AiFillDelete />
              </MiniButton>

              <Button
                onClick={() => navigate("update")}
                extraClass="!mt-0 !rounded-2xl !px-4 !py-2.5 !shadow-[0_12px_35px_rgba(59,130,246,0.25)] hover:!shadow-[0_16px_55px_rgba(59,130,246,0.35)]"
                type="button"
              >
                Tahrirlash
              </Button>
            </div>
          </div>

          {/* subtle divider */}
          <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        {/* Left / Images */}
        <div className="lg:col-span-7">
          <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-16/10 w-full overflow-hidden">
              <img
                src={moreData?.images?.[0]}
                alt={moreData?.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              {/* overlay */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10 opacity-100" />
              {/* top label */}
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                Preview
              </div>
            </div>

            <div className="flex flex-wrap gap-3 p-4 sm:p-5">
              {moreData?.images?.slice(0, 3).map((src) => (
                <div
                  key={src}
                  className="group/thumb relative aspect-square w-16 overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/6"
                >
                  <img
                    onError={(evt) =>
                      ((evt.target as HTMLImageElement).src =
                        "https://picsum.photos/id/10/100/100")
                    }
                    src={src}
                    alt="moreData"
                    className="h-full w-full object-cover transition duration-500 group-hover/thumb:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-0 ring-white/0 transition group-hover/thumb:ring-2 group-hover/thumb:ring-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right / Details */}
        <div className="lg:col-span-5">
          <div className="grid gap-5">
            {/* Price card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium tracking-wide text-white/55">Price</p>
                  <p className="mt-1 text-3xl font-semibold text-white">
                    {money(moreData?.price)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-medium tracking-wide text-white/55">Slug</p>
                  <p className="mt-1 max-w-55 truncate rounded-xl border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/85">
                    {moreData?.slug}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  ID: {moreData?.id}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  Category: {moreData?.category?.name}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <p className="text-xs font-medium tracking-wide text-white/55">Description</p>
              <p className="mt-2 text-sm leading-7 text-white/85">
                {moreData?.description}
              </p>
            </div>

            {/* Category */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <p className="text-xs font-medium tracking-wide text-white/55">Category</p>

              <div className="mt-4 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                  <img
                    src={moreData?.category?.image}
                    alt={moreData?.category?.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {moreData?.category?.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-white/55">
                    {moreData?.category?.slug}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-black/15 p-3 text-xs text-white/70">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Created</span>
                  <span className="truncate font-medium text-white/80">
                    {fmt(moreData?.category.creationAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Updated</span>
                  <span className="truncate font-medium text-white/80">
                    {fmt(moreData?.category?.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <p className="text-xs font-medium tracking-wide text-white/55">Meta</p>

              <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-black/15 p-3 text-xs text-white/70">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Created</span>
                  <span className="truncate font-medium text-white/80">
                    {fmt(moreData?.creationAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Updated</span>
                  <span className="truncate font-medium text-white/80">
                    {fmt(moreData?.updatedAt)}
                  </span>
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
        title="Mahsulotni ochirmoqchimisiz!"
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
            onClick={handleDeleteProduct}
            extraClass="w-[150px]"
            type="button"
          >
            {loading ? <Loading /> : "O'chirish"}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ProductsMore