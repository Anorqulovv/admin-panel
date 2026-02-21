import axios from "axios"

// const URL = import.meta.env.VITE_API
const instance = () => axios.create({baseURL: "https://api.escuelajs.co/api/v1" })

export default instance