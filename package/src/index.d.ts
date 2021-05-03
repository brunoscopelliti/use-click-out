import React from "react";

type EventHandler = () => void;

declare const useClickOut : <T extends HTMLElement>(handler : EventHandler, active : boolean) => React.RefObject<T>;

export default useClickOut;
