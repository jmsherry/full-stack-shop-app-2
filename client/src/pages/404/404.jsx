import React from "react";
import Header from "../../components/Header/Header";
import PageFrame from "../../components/PageFrame/PageFrame";

function NotFound() {
  return (
    <div className="App">
      <Header />
      <PageFrame>
        <h1>404 Not Found</h1>
      </PageFrame>
    </div>
  );
}

export default NotFound;
