import { useEffect, useRef } from "react";

/**
 * A custom React hook to fire an event
 * when user clicks outside the component.
 * @name useClickOut
 * @param {Function} handler
 * @param {boolean} active
 * @returns {React.RefObject<HTMLElement>}
 */
const useClickOut =
  (handler, active = true) => {
    const targetRef = useRef(null);

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
      [handler, active]
    );

    return targetRef;
  };

export default useClickOut;
