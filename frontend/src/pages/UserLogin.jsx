
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData,setUser]=useState({})

  const submitHandler = (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");
  
  };

  return (
    <AuthLayout
      heading="Welcome back."
      description="Your next journey is just a step away."
      footer={
        <>
          Don’t have an account?{" "}
          <Link
            to="/usersignup"
            className="font-medium text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-[#d4dfc4]"
          >
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={submitHandler} noValidate>
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm text-white/80"
          >
            Email address
          </label>

          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-[50px] w-full rounded-md border border-white/15 bg-white/[0.035] px-3.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/35 focus:border-[#aab99a]"
            placeholder="you@example.com"
          />
        </div>

        <PasswordInput
          id="login-password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="group flex h-[52px] w-full items-center justify-between rounded-md bg-[#c8d6b1] px-4 text-sm font-semibold text-[#11130f] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#d9e3ca]"
        >
          <span>Log in</span>
          <span
            aria-hidden="true"
            className="text-lg transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>

        <Link
          to="/captain-login"
          className="group mt-2 flex h-[52px] w-full items-center justify-between rounded-md border border-white/15 bg-white/[0.02] px-4 text-sm font-medium text-white transition-colors duration-300 hover:border-[#c8d6b1]/60 hover:bg-white/[0.04]"
        >
          <span>Login as Captain</span>
          <span
            aria-hidden="true"
            className="text-lg text-[#c8d6b1] transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default UserLogin;
