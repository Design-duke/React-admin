import React from "react";
import Language from "./Language";
import Avater from "./Avater/index";

const GlobalHeaderRight: React.FC = () => (
  <div className="flex flex-row items-center justify-center">
    <Avater />
    <Language />
  </div>
);

export default GlobalHeaderRight;
