import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../component/Login";

// Unit tests
test("show login form", () => {
  render(<Login />);
  const form = screen.getByTestId("login-form");
  expect(form).toHaveFormValues({
    username: "",
    password: "",
    remember: true
  });
});

test("enter username", () => {
  const fn = jest.fn();
  render(<Login onUsernameChange={fn} />);
  const username = screen.getByRole("textbox");
  fireEvent.change(username, {
    target: {
      value: "your name"
    }
  });

  expect(fn).toHaveBeenCalledWith("your name");
});

test("enter password", () => {
  const fn = jest.fn();
  render(<Login onPasswordChange={fn} />);
  const password = screen.getByPlaceholderText(/input password/i);
  fireEvent.change(password, {
    target: {
      value: "your password"
    }
  });

  expect(fn).toHaveBeenCalledWith("your password");
});

test("enter remember me", () => {
  const fn = jest.fn();
  render(
    <Login
      onRememberChange={fn}
      shouldRemember={false}
    />
  );
  const remember = screen.getByLabelText(/Remember me/i);
  fireEvent.click(remember);

  expect(fn).toHaveBeenCalledWith(true);
});

// Integration tests
describe("user login", () => {
  test("submit login form", () => {
    const fn = jest.fn();
    render(
      <Login
        onSubmit={fn}
        shouldRemember={false}
      />
    );
    const username = screen.getByRole("textbox");
    const password = screen.getByPlaceholderText(/input password/i);
    const remember = screen.getByLabelText(/Remember me/i);
    const submit = screen.getByRole("button", { name: /sign in/i });
    fireEvent.change(username, {
      target: {
        value: "your name"
      }
    });
    fireEvent.change(password, {
      target: {
        value: "your password"
      }
    });
    fireEvent.click(remember);
    fireEvent.click(submit);

    expect(fn).toHaveBeenCalledWith("your name", "your password", true);
  });
});

