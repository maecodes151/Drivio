

import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import { registerCaptain, saveCaptainSession } from "../services/captainAuth";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { token } = await registerCaptain({
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: Number(vehicleCapacity),
          vehicleType,
        },
      });

      saveCaptainSession(token);

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("car");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const inputClassName = "h-[48px] w-full rounded-md border border-white/15 bg-white/[0.035] px-3.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-white/35 focus:border-[#aab99a]";

  return (
    <AuthLayout
      heading="Join the fleet."
      description="Set up your captain profile and start taking rides on your schedule."
      footer={
        <>
          Already a captain?{" "}
          <Link
            to="/captain-login"
            className="font-medium text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-[#d4dfc4]"
          >
            Log in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={submitHandler} noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="captain-signup-firstname" className="mb-2 block text-sm text-white/80">
              First name
            </label>
            <input
              id="captain-signup-firstname"
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
            <label htmlFor="captain-signup-lastname" className="mb-2 block text-sm text-white/80">
              Last name
            </label>
            <input
              id="captain-signup-lastname"
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
          <label htmlFor="captain-signup-email" className="mb-2 block text-sm text-white/80">
            Email address
          </label>
          <input
            id="captain-signup-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClassName}
            placeholder="captain@drivio.com"
          />
        </div>

        <PasswordInput
          id="captain-signup-password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <PasswordInput
          id="captain-signup-confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vehicle-color" className="mb-2 block text-sm text-white/80">
              Vehicle color
            </label>
            <input
              id="vehicle-color"
              name="vehicleColor"
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              className={inputClassName}
              placeholder="Black"
            />
          </div>

          <div>
            <label htmlFor="vehicle-plate" className="mb-2 block text-sm text-white/80">
              Plate number
            </label>
            <input
              id="vehicle-plate"
              name="vehiclePlate"
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              className={inputClassName}
              placeholder="AB 1234"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vehicle-capacity" className="mb-2 block text-sm text-white/80">
              Seating capacity
            </label>
            <input
              id="vehicle-capacity"
              name="vehicleCapacity"
              type="number"
              min="1"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              className={inputClassName}
              placeholder="4"
            />
          </div>

          <div>
            <label htmlFor="vehicle-type" className="mb-2 block text-sm text-white/80">
              Vehicle type
            </label>
            <select
              id="vehicle-type"
              name="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className={`${inputClassName} appearance-none`}
            >
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="rounded-md border border-red-300/20 bg-red-300/[0.06] px-3.5 py-3 text-sm leading-5 text-red-200" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="group flex h-[52px] w-full items-center justify-between rounded-md bg-[#c8d6b1] px-4 text-sm font-semibold text-[#11130f] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#d9e3ca]"
        >
          <span>Create Captain Account</span>
          <span aria-hidden="true" className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>

        <Link
          to="/userlogin"
          className="group mt-2 flex h-[52px] w-full items-center justify-between rounded-md border border-white/15 bg-white/[0.02] px-4 text-sm font-medium text-white transition-colors duration-300 hover:border-[#c8d6b1]/60 hover:bg-white/[0.04]"
        >
          <span>Login as User</span>
          <span aria-hidden="true" className="text-lg text-[#c8d6b1] transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default CaptainSignup;