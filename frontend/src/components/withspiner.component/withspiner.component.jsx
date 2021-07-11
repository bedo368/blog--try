import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./withspiner.component.style";

const WithSpinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default WithSpinner;
