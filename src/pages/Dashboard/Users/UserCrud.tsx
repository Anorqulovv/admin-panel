import { useEffect,useState } from "react";
import { FiEye, FiMail, FiUser } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Loading } from "../../../components";
import { instance } from "../../../hooks";
import { CrudFn } from "../../../services";

const UserCrud = () => {
  const { id } = useParams();
  const [loading, setLoading ] = useState<boolean>(false)
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleSave(){
    const data = {name,email,password,avatar}
    CrudFn(id,id ? `/users/${id}`:'/users',data,setLoading,navigate,id ? "user tahrirlandi": "user yaratildi")
  }

  useEffect(()=>{
    if(id){
      instance().get(`/users/${id}`).then(res => {
      setName(res.data.name || "");
      setEmail(res.data.email || "");
      setPassword(res.data.password || "");
      setAvatar(res.data.avatar || "");
      })
    }
    
  },[id])

  return (
    <div className="min-h-[calc(100vh-84px)] px-2 py-2">
      <div className="mx-auto w-full">
        {/* Main wrapper */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          {/* bg glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_10%_10%,rgba(217,70,239,0.12),transparent_55%),radial-gradient(700px_circle_at_90%_85%,rgba(34,211,238,0.10),transparent_55%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.8),rgba(217,70,239,0.7),transparent)]" />

          <div className="relative p-4">
            {/* Header */}
            <div className="mb-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 md:px-5 md:py-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.22em] uppercase text-white/40">
                    Users
                  </p>
                  <h1 className="mt-1 text-2xl md:text-4xl font-semibold text-white">
                    {id ? "Foydalanuvchini tahrirlash" : "Foydalanuvchi qo‘shish"}
                  </h1>
                  <p className="mt-1 text-sm text-white/45">
                    Foydalanuvchi ma’lumotlarini kiriting
                  </p>
                </div>
                <Button onClick={() => handleSave()} type="button" extraClass="inline-flex items-center gap-2 h-12 px-6 rounded-2xl text-white font-semibold bg-[linear-gradient(135deg,#22d3ee,#6366f1,#d946ef)] hover:opacity-90 transition shadow-[0_10px_30px_rgba(99,102,241,.25)]" >
                  {loading ? <Loading /> : "Saqlash"}
                </Button>
               
              </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
              {/* LEFT - FORM */}
              <form
                id="user-crud-form"
                className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-5"
              >
                <p className="mb-4 text-[11px] tracking-[0.22em] uppercase text-white/45">
                  Asosiy
                </p>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm text-white/70">
                      Foydalanuvchi nomi
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nicolas"
                        className="h-12 w-full rounded-2xl border border-white/10 bg-white/3 pl-11 pr-4 text-white outline-none placeholder:text-white/30 focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-300/30"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm text-white/70">
                      Email
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <FiMail />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nico@gmail.com"
                        className="h-12 w-full rounded-2xl border border-white/10 bg-white/3 pl-11 pr-4 text-white outline-none placeholder:text-white/30 focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-300/30"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-sm text-white/70">
                      Parol
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="1234"
                      className="h-12 w-full rounded-2xl border border-white/10 bg-white/3 px-4 text-white outline-none placeholder:text-white/30 focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-300/30"
                    />
                  </div>

                  {/* Avatar URL */}
                  <div>
                    <label className="mb-2 block text-sm text-white/70">
                      Avatar rasmi (URL)
                    </label>
                    <input
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="https://picsum.photos/800"
                      className="h-12 w-full rounded-2xl border border-white/10 bg-white/3 px-4 text-white outline-none placeholder:text-white/30 focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-300/30"
                    />
                  </div>

                  <div className="pt-1">
                    <div className="h-0.5 w-14 rounded-full bg-[linear-gradient(90deg,#22d3ee,#d946ef)]" />
                  </div>
                </div>
              </form>

              {/* RIGHT - LIVE PREVIEW */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-5">
                <p className="mb-4 text-[11px] tracking-[0.22em] uppercase text-white/45">
                  Preview
                </p>

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 min-h-102.5">
                  {/* image */}
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name || "User avatar preview"}
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}

                  {/* overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.15),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(217,70,239,.15),transparent_45%),linear-gradient(135deg,#111827,#0b1220,#101a2f)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,18,32,0.15),rgba(11,18,32,0.7))]" />

                  {/* badge */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur">
                      <FiEye className="text-[12px]" />
                      User Preview
                    </span>
                  </div>

                  {/* bottom overlay */}
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-4 md:p-5">
                    <p className="text-[11px] tracking-[0.22em] uppercase text-white/45">
                      Live Preview
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold text-white wrap-break-word">
                      {name || "Nicolas"}
                    </h3>
                    <p className="mt-1 text-white/65 break-all">
                      {email || "nico@gmail.com"}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                      <span className="inline-flex items-center rounded-xl px-2.5 py-1 bg-white/10 ring-1 ring-white/10">
                        customer
                      </span>
                      <span className="inline-flex items-center rounded-xl px-2.5 py-1 bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20">
                        ready
                      </span>
                    </div>

                    <div className="mt-3 h-0.5 w-14 rounded-full bg-[linear-gradient(90deg,#22d3ee,#d946ef)]" />
                  </div>
                </div>
              </div>
            </div>
            {/* /Content grid */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCrud;
