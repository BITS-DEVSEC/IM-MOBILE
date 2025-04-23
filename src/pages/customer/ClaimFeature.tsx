import { Routes, Route } from "react-router-dom";
import { ClaimsList } from "./ClaimLists";
import { ClaimDetailsWrapper } from "./ClaimDetails";

export function ClaimsFeature() {
  return (
    <Routes>
      <Route path="/" element={<ClaimsList />} />
      <Route path="/:id" element={<ClaimDetailsWrapper />} />
    </Routes>
  );
}
