import { useContext } from "react";
import { AuthRoute, DashboardRoute } from "./routes";
import { context } from "./context/Context";

const App = () => {
  const { token } = useContext(context)
  return token ? <DashboardRoute /> : <AuthRoute />
}

export default App
