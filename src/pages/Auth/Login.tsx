import { useContext, useState, type SubmitEvent } from "react";
import { Input, Loading, PATH } from "../../components";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginFn } from "../../services";
import { context } from "../../context/Context";

import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { IoSparklesOutline } from "react-icons/io5";

const EmailIcon = () => <HiOutlineMail className="text-[18px] text-white/70" />;
const PasswordIcon = () => (
  <HiOutlineLockClosed className="text-[18px] text-white/70" />
);

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(context);
  const [loading, setLoading] = useState(false);

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();
    setLoading(true);

    const data = {
      email: evt.target.email.value,
      password: evt.target.password.value,
    };

    LoginFn(data, setLoading, setToken, navigate);
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#060B18] flex items-center justify-center p-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-105 w-105 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -right-32 top-10 h-115 w-115 rounded-full bg-cyan-400/16 blur-3xl" />
        <div className="absolute left-1/2 -bottom-40 h-130 w-130 -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_30%,rgba(255,255,255,0.03))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_-10%,rgba(34,211,238,0.12),transparent_60%)]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md">
        {/* Gradient border glow */}
        <div className="absolute -inset-px rounded-[28px] bg-[linear-gradient(135deg,rgba(34,211,238,0.55),rgba(217,70,239,0.55),rgba(99,102,241,0.45))] blur-[10px] opacity-60" />

        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 backdrop-blur-2xl shadow-[0_30px_120px_-55px_rgba(0,0,0,0.95)]">
          {/* Top light line */}
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),transparent)]" />

          <div className="p-7 sm:p-9">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-white/60 text-xs tracking-[0.28em] uppercase">
                  Welcome back
                </p>
                <h2 className="mt-2 text-3xl font-bold text-white tracking-tight">
                  Kirish
                </h2>
                <p className="mt-2 text-sm text-white/55">
                  Email va parolingizni kiriting.
                </p>
              </div>

              <div className="grid size-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <IoSparklesOutline className="text-[22px] text-white/80" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} autoComplete="off" className="mt-7 space-y-4">
              {/* Email */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold tracking-widest text-white/60">
                  EMAIL
                </label>

                <div className="group relative rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition focus-within:border-white/20">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <EmailIcon />
                  </div>

                  {/* Input ichida padding bo‘lmasa, extraClass ishlaydi */}
                  <Input
                    type="email"
                    name="email"
                    placeholder="misol@gmail.com"
                    extraClass="!pl-12 !bg-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.95),rgba(217,70,239,0.85),transparent)] opacity-0 transition group-focus-within:opacity-100" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold tracking-widest text-white/60">
                  PAROL
                </label>

                <div className="group relative rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition focus-within:border-white/20">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <PasswordIcon />
                  </div>

                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    extraClass="!pl-12 !bg-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.95),rgba(217,70,239,0.85),transparent)] opacity-0 transition group-focus-within:opacity-100" />
                </div>
              </div>

              {/* Button */}
              <Button
                type="submit"
                extraClass="!w-full !h-[48px] !rounded-2xl !bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] !shadow-[0_18px_45px_rgba(99,102,241,0.25)] hover:!brightness-110"
              >
                {loading ? <Loading /> : "Kirish"}
              </Button>

              {/* Footer line */}
              <div className="pt-3">
                <div className="h-px w-full bg-white/10" />
                <p className="mt-4 text-center text-xs text-white/55">
                  Birinchi marta kelyapsizmi?{" "}
                  <Link
                    to={PATH.register}
                    className="font-semibold text-white/85 hover:text-white transition"
                  >
                    Ro&apos;yxatdan o&apos;tish
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Corner shine */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/8 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Login;
