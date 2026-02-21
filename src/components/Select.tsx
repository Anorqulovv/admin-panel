import { useEffect, useState, type ChangeEvent, type Dispatch, type FC, type SelectHTMLAttributes, type SetStateAction } from "react";
import { instance } from "../hooks";


interface SelectType {
  extraClass?: string;
  URL?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customList?: any[];
  onChange?: SelectHTMLAttributes<HTMLSelectElement>;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
}

const Select: FC<SelectType> = ({extraClass, URL, customList, setValue, value}) => {
  const [list, setlist] = useState(URL? []: customList);

  useEffect(()=>{
    if(URL){
      instance().get(URL).then(res => setlist(res.data))
    }
  },[])

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) =>{
      setValue(e.target.value)
  }

  return (
    <select value = {value} onChange={handleSelectChange} defaultValue="all" className={` ${extraClass} appearance-none h-11 w-52 rounded-2xl bg-white/5 text-white/90 border border-white/10 px-4 pr-10 text-sm shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-400/30 focus:border-fuchsia-400/40 hover:bg-white/7 transition`}>
      <option value="all" className="rounded-2xl bg-slate-900 text-white">Barchasi</option>
      {list?.map(item => <option className="bg-slate-900" key={item.id} value={item.id}>{item.name}</option> )}
    </select>
  )
}

export default Select
