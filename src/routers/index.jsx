import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ImpuestoView,LoginView,AguaView,RegisterView} from "../pages";
import { MainLayout } from "../layouts";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainLayout/>}>
           <Route path="/impuesto" element={<ImpuestoView/>} />
           <Route path="/agua" element={<AguaView/>} />
          </Route>
          <Route path="/login" element={<LoginView/>} /> 
          <Route path="/register" element={<RegisterView/>} /> 
      </Routes>
    </BrowserRouter>
  );
};


export default Router;