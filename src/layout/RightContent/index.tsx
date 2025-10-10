import React from "react";
import Language from "./Language";
import Avater from "./Avater/index";

const GlobalHeaderRight: React.FC = () => (
  <div className="flex flex-row items-center justify-center">
    <Language />
    <Avater />
  </div>
);

export default GlobalHeaderRight;
