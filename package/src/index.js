import { useEffect, useRef } from "react";

/**
 * A custom React hook to fire an event
 * when user clicks outside the component.
 * @name useClickOut
 * @param {Function} onClickOut
 * @param {boolean} active
 * @returns {React.RefObject<HTMLElement>}
 */
const useClickOut =
  (onClickOut, active) => {
    const targetRef = useRef(null);

    useEffect(
      () => {
        const onClick =
          (event) => {
            if (targetRef.current?.contains(event.target) === false) {
              onClickOut();
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
      [onClickOut, active]
    );

    return targetRef;
  };

export default useClickOut;
