import React, { useState } from "react";
import "./index.scss";

export interface Props {
  shouldRemember: boolean;
  onUsernameChange: (username: string) => void;
  onPasswordChange: (password: string) => void;
  onRememberChange: (remember: boolean) => void;
  onSubmit: (username: string, password: string, remember: boolean) => void;
}

function LoginForm(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(props.shouldRemember);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
    props.onUsernameChange(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    props.onPasswordChange(value);
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setRemember(checked);
    props.onRememberChange(checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(username, password, remember);
  };

  return (
    <form data-testid="login-form" className='form-area' onSubmit={handleSubmit}>
      <div className='box'>
        <label htmlFor="username">Username:</label>
        <input
          placeholder="input username"
          type="text"
          name="username"
          className='content'
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div className='box'>
        <label htmlFor="password">Password:</label>
        <input
          placeholder="input password"
          type="password"
          name="password"
          className='content'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className='box'>
        <label>
          <input
            name="remember"
            type="checkbox"
            checked={remember}
            onChange={handleRememberChange}
          />
          Remember me?
        </label>
        <button type="submit" className='submit-btn'>
          Sign in
        </button>
      </div>
    </form>
  );
}

export default function Login(props: Partial<Props>) {
  const defaultProps: Props = {
    onPasswordChange() {
      return;
    },
    onRememberChange() {
      return;
    },
    onUsernameChange() {
      return;
    },
    onSubmit() {
      return;
    },
    shouldRemember: true
  };
  return(
    <LoginForm { ...defaultProps } { ...props } />
  );
}

