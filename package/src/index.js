import { useEffect } from "react";

import useForwardRef from "@bscop/use-forward-ref";

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
    const { active = true, ref = null } =
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
              handler();
            }
          };

        if (active) {
          document.body.addEventListener("click", onClick);
        }

        return () => {
          if (active) {
            document.body.removeEventListener("click", onClick);
          }
        };
      },
      [handler, active, targetRef]
    );

    return targetRef;
  };

export default useClickOut;
