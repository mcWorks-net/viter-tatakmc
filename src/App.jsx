import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { devNavUrl } from "./components/helpers/functions-general";
import Clients from "./components/pages/developer/clients/Clients.jsx";
import Profile from "./components/pages/developer/clients/profile/Profile";
import Orders from "./components/pages/developer/orders/Orders.jsx";
import Services from "./components/pages/developer/settings/services/Services.jsx";
import PageNotFound from "./components/partials/PageNotFound.jsx";
import { StoreProvider } from "./components/store/StoreContext.jsx";
import SystemLogin from "./components/pages/access/developer/SystemLogin";
import SystemCreatePassword from "./components/pages/access/developer/SystemCreatePassword";
import SystemForgotPassword from "./components/pages/access/developer/SystemForgotPassword";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path={`*`} element={<PageNotFound />} />
              <Route
                path={`${devNavUrl}/settings/services`}
                element={<Services />}
              />
              <Route path={`${devNavUrl}/orders`} element={<Orders />} />

              <Route path={`${devNavUrl}/clients`} element={<Clients />} />
              <Route
                path={`${devNavUrl}/clients/profile`}
                element={<Profile />}
              />

              {/* ACCESS */}

              <Route
                path={`${devNavUrl}/system/login`}
                element={<SystemLogin />}
              />

              <Route
                path={`${devNavUrl}/system/create-password`}
                element={<SystemCreatePassword />}
              />

              <Route
                path={`${devNavUrl}/system/forgot-password`}
                element={<SystemForgotPassword />}
              />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
