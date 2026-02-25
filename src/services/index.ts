import toast from "react-hot-toast"
import { instance } from "../hooks"
import { PATH } from "../components"
import type { RegisterDataType } from "../pages/Auth/Register"
import {type NavigateFunction } from "react-router-dom"
import type { Dispatch, SetStateAction } from "react"


export const RegisterFn = (data:RegisterDataType, navigate:NavigateFunction, setLoading:Dispatch<SetStateAction<boolean>>) => {
    instance().post("/users", data).then(() => {
        toast.success(`Muvaffaqiyatli qo'shildi ${data.name}`)
        setTimeout(() => navigate(PATH.login), 1000)
    }).catch(() => toast.error("Xatolik bor")).finally(() => setLoading(false))
}
export const LoginFn = (data:{email:string, password:string}, setLoading:Dispatch<SetStateAction<boolean>>, setToken:Dispatch<SetStateAction<string>>, navigate:NavigateFunction) => {
    instance().post("/auth/login", data).then((res) => {
      toast.success("Muvaffaqiyatli kirdinggiz!")
      setTimeout(() => {
        setToken(res.data.access_token)
        navigate(PATH.home)
      },1000)
    }).catch(() => toast.error("Xatolik bor!")).finally(() => setLoading(false))
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GetById = (URL:string, setValue:Dispatch<SetStateAction<any>>) => {
  instance().get(URL).then(res => {
    setValue(res.data)
  })
}
export const DeleteFn = async (
  URL: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setDelModal: Dispatch<SetStateAction<boolean>>,
  toastTitle: string,
  navigate: NavigateFunction
) => {
  try {
    await instance().delete(URL);

    toast.success(toastTitle);
    setDelModal(false);

    setTimeout(() => {
      navigate(-1);
    }, 800);
  } catch (error) {
    console.error(error);
    toast.error("O‘chirishda xatolik yuz berdi");
  } finally {
    setLoading(false);
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CrudFn = (id:string | undefined, URL:string,data:any,setLoading:Dispatch<SetStateAction<boolean>>, navigate:NavigateFunction,toastTitle:string) => {
  instance()[id ? "put" : "post"](URL, data).then(() => {
    toast.success(toastTitle);
    setLoading(false)
    setTimeout(() => navigate(-1), 1000)
  })
}