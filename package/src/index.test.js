/* eslint-env jest */

import React from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useClickOut from "./";

const TestApp =
  ({ active, spy }) => {
    const ref = useClickOut(spy, active);

    return (
      <div ref={ref}>
        Demo application
        <button data-testid="button-in" type="button">
          Click here!
        </button>
      </div>
    );
  };

TestApp.propTypes = {
  active: PropTypes.bool,
  spy: PropTypes.func.isRequired,
};

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

    const { getByTestId } =
      render(<TestApp active={false} spy={onClickOut} />, { wrapper: Wrapper });

    userEvent.click(getByTestId("logo"));

    expect(onClickOut).not.toHaveBeenCalled();
  });

  it("doesn't executed the handler when click happens inside the component", () => {
    const onClickOut = jest.fn();

    const { getByTestId } =
      render(<TestApp active={true} spy={onClickOut} />, { wrapper: Wrapper });

    userEvent.click(getByTestId("button-in"));

    expect(onClickOut).not.toHaveBeenCalled();
  });

  it("executes the handler when user clicks outside the component", () => {
    const onClickOut = jest.fn();

    const { getByTestId } =
      render(<TestApp active={true} spy={onClickOut} />, { wrapper: Wrapper });

    userEvent.click(getByTestId("logo"));

    expect(onClickOut).toHaveBeenCalledTimes(1);
  });

  it("executes the handler when user clicks outside the component / active by default", () => {
    const onClickOut = jest.fn();

    const { getByTestId } =
      render(<TestApp spy={onClickOut} />, { wrapper: Wrapper });

    userEvent.click(getByTestId("logo"));

    expect(onClickOut).toHaveBeenCalledTimes(1);
  });
});
