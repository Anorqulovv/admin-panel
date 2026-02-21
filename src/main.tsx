import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TokenContext } from "./context/Context";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TokenContext>
        <Toaster position="top-center" reverseOrder={false}/>
        <App />
    </TokenContext>
  </BrowserRouter>
);
