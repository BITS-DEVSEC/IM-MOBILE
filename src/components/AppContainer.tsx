import React from "react";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "0 auto",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        border: "1px solid #eaeaea",
      }}
    >
      {children}
    </div>
  );
};

export default AppContainer;
