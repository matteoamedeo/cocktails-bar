import React, { useEffect } from "react";

const RedirectSpinner = () => {
  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";
    body.style.paddingRight = "17px";
    // Cleanup: Restore the overflow property when the component unmounts
    return () => {
      body.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="redirectSpinner d-flex">
      <div
        className="spinner-border text-primary test-center m-auto"
        role="status"
      ></div>
    </div>
  );
};

export default RedirectSpinner;
