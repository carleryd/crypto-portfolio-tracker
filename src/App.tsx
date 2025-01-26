import { Route, Routes } from "react-router-dom";

import { PageWrapper } from "./components/PageWrapper";
import { CurrencyDetails } from "./pages/CurrencyDetails";
import { Home } from "./pages/Home";

export const App = () => (
  <PageWrapper>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/currency/:currencyId" element={<CurrencyDetails />} />
    </Routes>
  </PageWrapper>
);
