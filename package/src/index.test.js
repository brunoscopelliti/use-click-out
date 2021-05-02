/* eslint-env jest */

import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "./";

describe("noop", () => {
  it("should increment counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
