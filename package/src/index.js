import { useEffect } from "react";

import useForwardRef from "@bscop/use-forward-ref";

const isTouchCapable = Boolean(
  "ontouchstart" in window ||
  // @ts-ignore
  ("DocumentTouch" in window && document instanceof window.DocumentTouch) ||
  window.navigator.maxTouchPoints > 0
);

/**
 * A custom React hook to fire an event
 * when user clicks outside the component.
 * @name useClickOut
 * @param {Function} handler
 * @param {import("./index").HookOptions|boolean} [activeOrOpts]
 * @returns {React.RefObject<HTMLElement>}
 */
const useClickOut =
  (handler, activeOrOpts) => {
    const { active = true, ref = null, touch = false } =
      typeof activeOrOpts == "boolean"
        ? {
            active: activeOrOpts,
          }
        : activeOrOpts || {};

    const targetRef = useForwardRef(ref);

    useEffect(
      () => {
        const onClick =
          (event) => {
            if (targetRef.current?.contains(event.target) === false) {
              handler(event);
            }
          };

        if (active) {
          document.body.addEventListener("click", onClick, true);
          if (touch && isTouchCapable) {
            document.body.addEventListener("touchstart", onClick, true);
          }
        }

        return () => {
          if (active) {
            document.body.removeEventListener("click", onClick, true);
            if (touch && isTouchCapable) {
              document.body.removeEventListener("touchstart", onClick, true);
            }
          }
        };
      },
      [handler, active, touch, targetRef]
    );

    return targetRef;
  };

export default useClickOut;
