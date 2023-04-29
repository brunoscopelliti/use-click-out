import React, { MouseEvent } from "react";

type EventHandler = (event: MouseEvent) => void;

export type HookOptions = {
  active ?: boolean;
  ref ?: React.ForwardedRef<HTMLElement>;
  touch ?: boolean;
}

export function useClickOut<T extends HTMLElement>(handler : EventHandler, active ?: boolean) : React.RefObject<T>;

export function useClickOut<T extends HTMLElement>(handler : EventHandler, opts ?: HookOptions) : React.RefObject<T>;

export default useClickOut;
