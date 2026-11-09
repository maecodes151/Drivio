import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import { registerUser, saveUserSession } from "../services/userAuth";

const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { token } = await registerUser({
        fullname: { firstname, lastname },
        
        email,
        password,
      });

      saveUserSession(token);

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.message);
    }
  };
26
  const inputClassName = "h-[48px] w-full rounded-md border border-white/15 bg-white/[0.035] px-3.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/35 focus:border-[#aab99a]";

  return (
    <AuthLayout
      heading="Start your journey."
      description="Create your account and experience a better way to move."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/userlogin"
            className="font-medium text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-[#d4dfc4]"
          >
            Log in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={submitHandler}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-firstname" className="mb-2 block text-sm text-white/80">
              First name
            </label>
            <input
              id="signup-firstname"
              name="firstname"
              type="text"
              autoComplete="given-name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className={inputClassName}
              placeholder="First name"
            />
          </div>

          <div>
            <label htmlFor="signup-lastname" className="mb-2 block text-sm text-white/80">
              Last name
            </label>
            <input
              id="signup-lastname"
              name="lastname"
              type="text"
              autoComplete="family-name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className={inputClassName}
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-2 block text-sm text-white/80">
            Email address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClassName}
            placeholder="you@example.com"
          />
        </div>

        <PasswordInput
          id="signup-password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <PasswordInput
          id="signup-confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        {error && (
          <p className="rounded-md border border-red-300/20 bg-red-300/[0.06] px-3.5 py-3 text-sm leading-5 text-red-200" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="group flex h-[52px] w-full items-center justify-between rounded-md bg-[#c8d6b1] px-4 text-sm font-semibold text-[#11130f] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#d9e3ca]"
        >
          <span>Create Account</span>
          <span aria-hidden="true" className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>

        <Link
          to="/captain-login"
          className="group mt-2 flex h-[52px] w-full items-center justify-between rounded-md border border-white/15 bg-white/[0.02] px-4 text-sm font-medium text-white transition-colors duration-300 hover:border-[#c8d6b1]/60 hover:bg-white/[0.04]"
        >
          <span>Login as Captain</span>
          <span aria-hidden="true" className="text-lg text-[#c8d6b1] transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default UserSignup;