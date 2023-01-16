import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AddInput from "../component/AddInput";

describe("modify add form", () => {
  const fn = jest.fn();
  test("add new item", async () => {
    render(<AddInput onAdd={fn} />);
    const title = screen.getByPlaceholderText(/add new title/i);
    const link = screen.getByPlaceholderText(/add new link$/i);
    const linkTitle = screen.getByPlaceholderText(/add new link title/i);
    const addBtn = screen.getByRole("button", { name: /add/i });

    fireEvent.change(title, {
      target: {
        value: "new title"
      }
    });
    fireEvent.change(link, {
      target: {
        value: "new link"
      }
    });
    fireEvent.change(linkTitle, {
      target: {
        value: "new link title"
      }
    });
    fireEvent.click(addBtn);
    expect(fn).toHaveBeenCalledWith({
      title: "new title",
      link: "new link",
      linkTitle: "new link title",
    });
  });
});
