import { useEffect, useState } from "react";
import { instance, useDebounce } from "../../../hooks";
import ProductCard from "../../../components/ProductCard";
import type { ProductType } from "../../../@types";
import { Button, Input, Select } from "../../../components";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [search, setSearch] = useState<string>("")
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryID] = useState<string>("all");
  const navigate = useNavigate()

  const title = useDebounce(search,1000)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await instance().get<ProductType[]>("/products",{
          params: {title,categoryId:categoryId == "all" ? "" : categoryId }
        });
        setProducts(res.data);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [title,categoryId]);

  return (
    <div className="relative h-[95%] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_12px_55px_rgba(0,0,0,0.55)]">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(217,70,239,0.18),transparent_60%),radial-gradient(1100px_circle_at_85%_65%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-px -z-10 bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />

      <div className="h-full bg-white/5 backdrop-blur-2xl flex flex-col">
        <div className="p-4">
          <div className="flex items-center justify-between gap-4 rounded-3xl bg-white/5 ring-1 ring-white/10 px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-4">
                <Input onChange={e => setSearch(e.target.value)} type="text" />
              <div className="min-w-55">
                <Select value={categoryId} URL="/categories" setValue={setCategoryID} />
              </div>
            </div>

            <Button onClick={() => navigate("create")} type="button" extraClass="!w-[100px] cursor-pointer ">Yaratish</Button>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-white font-semibold">Mahsulotlar</p>
              <p className="text-white/50 text-xs">
                Mahsulotlarni boshqarish, tahrirlash va o‘chirish
              </p>
            </div>
            <div className="hidden md:block h-1 w-28 rounded-full bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] opacity-70" />
          </div>
        </div>

        <div className="px-4 pb-4 flex-1 overflow-auto">
          {loading && (
            <div className="mb-4 rounded-3xl bg-white/5 ring-1 ring-white/10 p-4 text-white/70">
              Yuklanmoqda...
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-10 text-center text-white/60">
              Mahsulot topilmadi
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
                <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;