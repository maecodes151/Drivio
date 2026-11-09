import { useState } from "react";

const PasswordInput = ({ id, label, value, onChange, autoComplete, required = true, minLength = 6 }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-white/80">
        {label}
      </label>
      <div className="flex h-[50px] items-center rounded-md border border-white/15 bg-white/[0.035] transition-colors duration-200 focus-within:border-[#aab99a]">
        <input
          className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-white/35"
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
        />
        <button
          id={`${id}-toggle`}
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="h-full px-3.5 text-xs text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8d6b1]"
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          aria-pressed={visible}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
