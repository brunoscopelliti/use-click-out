import React from "react";

type EventHandler = () => void;

export type HookOptions = {
  active ?: boolean;
  ref ?: React.ForwardedRef<HTMLElement>;
}

export function useClickOut<T extends HTMLElement>(handler : EventHandler, active ?: boolean) : React.RefObject<T>;

export function useClickOut<T extends HTMLElement>(handler : EventHandler, opts ?: HookOptions) : React.RefObject<T>;

export default useClickOut;
