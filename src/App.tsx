import { Route, Routes } from "react-router-dom";

import Modal from "./components/Modal";
import { PageWrapper } from "./components/PageWrapper";
import { CurrencyDetails } from "./pages/CurrencyDetails";
import { Portfolio } from "./pages/Portfolio";

export const App = () => (
  <PageWrapper>
    <Modal />
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/currency/:currencyId" element={<CurrencyDetails />} />
    </Routes>
  </PageWrapper>
);
