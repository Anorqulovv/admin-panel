import { Route, Routes } from "react-router-dom"
import { Category, DashboardHome, NotFound, Products, Users } from "../pages"
import { PATH } from "../components"
import { Header, Sitebar } from "../modules"
import ProductsMore from "../pages/Dashboard/Products/ProductsMore"
import ProductCrud from "../pages/Dashboard/Products/ProductCrud"

const DashboardRoute = () => {
    const routeList = [
        { id: 1, path: PATH.home, element: <DashboardHome /> },
        { id: 2, path: PATH.products, element: <Products /> },
        { id: 3, path: PATH.category, element: <Category /> },
        { id: 4, path: PATH.users, element: <Users /> },
        { id: 5, path: PATH.notFound, element: <NotFound /> },
        { id: 6, path: PATH.productsMore, element: <ProductsMore />},
        { id: 7, path: PATH.productsUpdate, element: <ProductCrud />}
    ]
    return (
        <div className="flex">
            <Sitebar/>
            <div className="w-[78%] h-screen relative overflow-y-auto ">
                <Header/>
                <Routes>{routeList.map(item => <Route key={item.id} path={item.path} element={item.element} />)}</Routes>
            </div>
        </div>
    )
}

export default DashboardRoute