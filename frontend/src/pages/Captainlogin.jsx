import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

   

    setEmail("");
    setPassword("");
  };

  return (
    <AuthLayout
      heading="Welcome back, Captain."
      description="Access your fleet dashboard, trip updates, and rider activity in one place."
      footer={
        <>
          Need a captain account?{" "}
          <Link
            to="/captain-signup"
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
            htmlFor="captain-email"
            className="mb-2 block text-sm text-white/80"
          >
            Email address
          </label>

          <input
            id="captain-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-[50px] w-full rounded-md border border-white/15 bg-white/[0.035] px-3.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/35 focus:border-[#aab99a]"
            placeholder="captain@drivio.com"
          />
        </div>

        <PasswordInput
          id="captain-password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-white/65">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 accent-[#c8d6b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8d6b1]"
            />
            Keep me signed in
          </label>

          <button
            type="button"
            className="text-white/65 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="group flex h-[52px] w-full items-center justify-between rounded-md bg-[#c8d6b1] px-4 text-sm font-semibold text-[#11130f] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#d9e3ca]"
        >
          <span>Log in as Captain</span>
          <span
            aria-hidden="true"
            className="text-lg transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>

        <Link
          to="/userlogin"
          className="group mt-2 flex h-[52px] w-full items-center justify-between rounded-md border border-white/15 bg-white/[0.02] px-4 text-sm font-medium text-white transition-colors duration-300 hover:border-[#c8d6b1]/60 hover:bg-white/[0.04]"
        >
          <span>Login as User</span>
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

export default CaptainLogin;