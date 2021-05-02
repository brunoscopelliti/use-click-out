import React from "react";

type handler = () => void;

declare const useClickOut : (onClickOut : handler, active : boolean) => React.RefObject;

export default useClickOut;
