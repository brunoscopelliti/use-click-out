import React, { useRef } from "react";
import PropTypes from "prop-types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useClickOut from "./";

const Wrapper =
  ({ children }) => {
    return (
      <>
        <header>
          <h1 data-testid="logo">Logo</h1>
        </header>
        <main>
          {children}
        </main>
        <footer>
          2021
        </footer>
      </>
    );
  };

Wrapper.propTypes = {
  children: PropTypes.element,
};

describe("useClickOut", () => {
  it("doesn't executed the handler when hook is not explicitly active", () => {
    const onClickOut = jest.fn();

    const TestApp =
      () => {
        /**
         * @type React.RefObject<HTMLDivElement>
         */
        const targetRef = useClickOut(onClickOut, false);
        return (
          <div ref={targetRef}>
            Demo application
            <button data-testid="button-in" type="button">
              Click here!
            </button>
          </div>
        );
      };

    render(<TestApp />, { wrapper: Wrapper });

    userEvent.click(screen.getByTestId("logo"));

    expect(onClickOut).not.toHaveBeenCalled();
  });

  it("doesn't executed the handler when hook is not explicitly active / opts", () => {
    const onClickOut = jest.fn();

    const TestApp =
      () => {
        /**
         * @type React.RefObject<HTMLDivElement>
         */
        const targetRef = useClickOut(onClickOut, { active: false });
        return (
          <div ref={targetRef}>
            Demo application
            <button data-testid="button-in" type="button">
              Click here!
            </button>
          </div>
        );
      };

    render(<TestApp />, { wrapper: Wrapper });

    userEvent.click(screen.getByTestId("logo"));

    expect(onClickOut).not.toHaveBeenCalled();
  });

  it("doesn't executed the handler when click happens inside the component", () => {
    const onClickOut = jest.fn();

    const TestApp =
      () => {
        /**
         * @type React.RefObject<HTMLDivElement>
         */
        const targetRef = useClickOut(onClickOut, true);
        return (
          <div ref={targetRef}>
            Demo application
            <button data-testid="button-in" type="button">
              Click here!
            </button>
          </div>
        );
      };

    render(<TestApp />, { wrapper: Wrapper });

    userEvent.click(screen.getByTestId("button-in"));

    expect(onClickOut).not.toHaveBeenCalled();
  });

  it("executes the handler when user clicks outside the component", () => {
    const onClickOut = jest.fn();

    const TestApp =
      () => {
        /**
         * @type React.RefObject<HTMLDivElement>
         */
        const targetRef = useClickOut(onClickOut, true);
        return (
          <div ref={targetRef}>
            Demo application
            <button data-testid="button-in" type="button">
              Click here!
            </button>
          </div>
        );
      };

    render(<TestApp />, { wrapper: Wrapper });

    userEvent.click(screen.getByTestId("logo"));

    expect(onClickOut).toHaveBeenCalledTimes(1);
  });

  it("executes the handler when user clicks outside the component / active by default", () => {
    const onClickOut = jest.fn();

    const TestApp =
      () => {
        /**
         * @type React.RefObject<HTMLDivElement>
         */
        const targetRef = useClickOut(onClickOut);
        return (
          <div ref={targetRef}>
            Demo application
            <button data-testid="button-in" type="button">
              Click here!
            </button>
          </div>
        );
      };

    render(<TestApp />, { wrapper: Wrapper });

    userEvent.click(screen.getByTestId("logo"));

    expect(onClickOut).toHaveBeenCalledTimes(1);
  });

  it("executes the handler when user clicks outside the component / opts", () => {
    const onClickOut = jest.fn();

    const TestApp =
      () => {
        /**
         * @type React.RefObject<HTMLDivElement>
         */
        const targetRef = useClickOut(onClickOut, { active: true });
        return (
          <div ref={targetRef}>
            Demo application
            <button data-testid="button-in" type="button">
              Click here!
            </button>
          </div>
        );
      };

    render(<TestApp />, { wrapper: Wrapper });

    userEvent.click(screen.getByTestId("logo"));

    expect(onClickOut).toHaveBeenCalledTimes(1);
  });

  it("executes the handler when user clicks outside the component / opts ref", () => {
    const onClickOut = jest.fn();

    const TestApp = React.forwardRef(
      (_, ref) => {
        /**
         * @type React.RefObject<HTMLDivElement>
         */
        const targetRef = useClickOut(onClickOut, { ref });
        return (
          <div ref={targetRef}>
            Demo application
            <button data-testid="button-in" type="button">
              Click here!
            </button>
          </div>
        );
      }
    );

    const TestAppWrapper =
      () => {
        const ref = useRef(null);
        return (
          <TestApp ref={ref} />
        );
      };

    render(<TestAppWrapper />, { wrapper: Wrapper });

    userEvent.click(screen.getByTestId("logo"));

    expect(onClickOut).toHaveBeenCalledTimes(1);
  });

  it("doesn't executed the handler when hook is not active / opts ref", () => {
    const onClickOut = jest.fn();

    const TestApp = React.forwardRef(
      (_, ref) => {
        /**
         * @type React.RefObject<HTMLDivElement>
         */
        const targetRef = useClickOut(onClickOut, { active: false, ref });
        return (
          <div ref={targetRef}>
            Demo application
            <button data-testid="button-in" type="button">
              Click here!
            </button>
          </div>
        );
      }
    );

    const TestAppWrapper =
      () => {
        const ref = useRef(null);
        return (
          <TestApp ref={ref} />
        );
      };

    render(<TestAppWrapper />, { wrapper: Wrapper });

    userEvent.click(screen.getByTestId("logo"));

    expect(onClickOut).not.toHaveBeenCalledTimes(1);
  });
});
