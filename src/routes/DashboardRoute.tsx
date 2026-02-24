import { Route, Routes } from "react-router-dom"
import { Category, DashboardHome, NotFound, Products, Users } from "../pages"
import { PATH } from "../components"
import { Header, Sitebar } from "../modules"
import ProductsMore from "../pages/Dashboard/Products/ProductsMore"
import ProductCrud from "../pages/Dashboard/Products/ProductCrud"
import CategoryCrud from "../pages/Dashboard/Category/CategoryCrud"
import CategoryMore from "../pages/Dashboard/Category/CategoryMore"
import UserCrud from "../pages/Dashboard/Users/UserCrud"
import UserMore from "../pages/Dashboard/Users/UserMore"

const DashboardRoute = () => {
    const routeList = [
        { id: 1, path: PATH.home, element: <DashboardHome /> },
        { id: 2, path: PATH.products, element: <Products /> },
        { id: 3, path: PATH.category, element: <Category /> },
        { id: 4, path: PATH.users, element: <Users /> },
        { id: 5, path: PATH.notFound, element: <NotFound /> },
        { id: 6, path: PATH.productsMore, element: <ProductsMore />},
        { id: 7, path: PATH.productsUpdate, element: <ProductCrud />},
        { id: 8, path: PATH.productsCreate, element: <ProductCrud />},
        { id: 9, path: PATH.categoriesMore, element: <CategoryMore />},
        { id: 10, path: PATH.categoriesUpdate, element: <CategoryCrud />},
        { id: 11, path: PATH.categoriesCreate, element: <CategoryCrud />},
        { id: 12, path: PATH.usersMore, element: <UserMore />},
        { id: 13, path: PATH.usersCreate, element: <UserCrud />},
        { id: 14, path: PATH.usersUpdate, element: <UserCrud />}

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