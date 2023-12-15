import React from "react";

const Spinner = () => {
  return (
    <div className="container spinnerWrapper d-flex mt-5 pt-5">
      <div
        className="spinner-border text-primary test-center m-auto"
        role="status"
      ></div>
    </div>
  );
};

export default Spinner;
