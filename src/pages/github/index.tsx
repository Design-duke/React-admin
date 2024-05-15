import React from "react";

const Github: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <p className="mt-12 mb-12 text-xl font-bold text-gray-800">
        Github 仓库：
        <a
          href="https://github.com/Design-duke/React-admin"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          https://github.com/Design-duke/React-admin
        </a>
        &nbsp;求 ⭐⭐
      </p>
    </div>
  );
};

export default Github;
