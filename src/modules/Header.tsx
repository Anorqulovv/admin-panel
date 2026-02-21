import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { PATH, Loading, Modal } from "../components";
import { useContext, useState } from "react";
import { context } from "../context/Context";
import toast from "react-hot-toast";
import { IoArrowBackOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

type IconButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
};

const IconButton = ({ children, onClick, title }: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="grid place-items-center w-11 h-11 rounded-2xl bg-white/5 ring-1 ring-white/10 text-white/90 hover:text-white hover:bg-white/10 transition"
    >
      {children}
    </button>
  );
};

const Header = () => {
  const { setToken } = useContext(context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [logOutModal, setLogOutModal] = useState<boolean>(false);
  const route = useLocation();

  function handleLogOut() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLogOutModal(false);
      setToken("");
      navigate(PATH.home);
      toast.success("Chiqib ketdinggiz!");
    }, 1000);
  }

  return (
    <header className="sticky z-50 top-0 w-full px-4 py-4">
      {/* Login page palette background */}
      <div className="rounded-2xl absolute inset-0 -z-10 bg-[#060B18]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_15%_30%,transparent_60%),radial-gradient(900px_circle_at_85%_70%,rgba(217,70,239,0.14),transparent_55%),radial-gradient(800px_circle_at_50%_120%,rgba(99,102,241,0.12),transparent_55%)]" />

      <div className="relative mx-auto flex items-center justify-between rounded-3xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] px-4 py-3 overflow-hidden">
        {/* top neon line */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(34,211,238,0.9),rgba(217,70,239,0.85),rgba(99,102,241,0.55),transparent)]" />

        <div className="flex items-center gap-4">
          <IconButton onClick={() => navigate(-1)} title="Orqaga">
            <IoArrowBackOutline className="text-[22px]" />
          </IconButton>

          <div className="leading-tight">
            <p className="text-white text-[20px] font-semibold">
              {route.pathname === PATH.home && "Asosiy"}
              {route.pathname === PATH.category && "Kategoriyalar"}
              {route.pathname === PATH.products && "Mahsulotlar"}
              {route.pathname === PATH.users && "Foydalanuvchilar"}
            </p>
          </div>
        </div>

        {/* ✅ onClick qo‘shildi */}
        <Button
          onClick={() => setLogOutModal(true)}
          extraClass="!bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] !w-[110px] cursor-pointer !shadow-[0_0_18px_rgba(99,102,241,0.28)] hover:!brightness-110"
          type="button"
        >
          <span className="inline-flex items-center gap-2">
            <FiLogOut className="text-[18px]" />
            Chiqish
          </span>
        </Button>
      </div>

      <Modal
        title="Tizimdan chiqish"
        open={logOutModal}
        onClose={() => setLogOutModal(false)}
      >
        <div className="flex gap-5">
          {/* ✅ Bekor qilish onClick */}
          <Button
            onClick={() => setLogOutModal(false)}
            extraClass="!w-[130px] !text-white/80 !bg-white/15 !ring-1 !ring-white/10 hover:!bg-white/10 hover:!text-white"
            type="button"
          >
            Bekor qilish
          </Button>

          {/* ✅ Logout onClick */}
          <Button
            onClick={handleLogOut}
            extraClass="!w-[130px] !bg-[linear-gradient(135deg,#22d3ee,#d946ef,#6366f1)] !shadow-[0_0_18px_rgba(99,102,241,0.28)] hover:!brightness-110 hover:!shadow-[0_0_30px_rgba(99,102,241,0.45)]"
            type="button"
          >
            {loading ? <Loading /> : "Chiqish"}
          </Button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
