import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Card from "../component/Card";

test("show loading", () => {
  render(<Card />);
  const total = screen.getByTestId(/total/i);
  expect(total).toHaveTextContent("0");
});

describe("modify card number", () => {
  test("add and then delete card", async () => {
    render(<Card />);
    const total = screen.getByTestId(/total/i);
    await waitFor(() => expect(total).toHaveTextContent("3"));

    const addBtn = screen.getByRole("button", { name: /add double/i });
    const deleteBtn = screen.getByRole("button", { name: /delete two/i });

    fireEvent.click(addBtn);
    expect(total).toHaveTextContent("6");

    fireEvent.click(deleteBtn);
    expect(total).toHaveTextContent("4");
  });
});
