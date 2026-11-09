import { Link } from "react-router-dom";
import heroImage from "../assets/drivio-hero.jpg";

const AuthLayout = ({ children, heading, description, footer }) => (
  <main className="min-h-screen min-h-[100svh] bg-[#090a0f] text-white lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">
    <section className="flex min-h-screen min-h-[100svh] flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-16 lg:py-10 xl:px-24">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          aria-label="Drivio home"
          className="text-[1.65rem] font-semibold tracking-[-0.09em] text-white transition-colors duration-300 hover:text-[#d4dfc4] sm:text-3xl"
        >
          drivio<span className="text-[#c8d6b1]">.</span>
        </Link>
        <Link
          to="/"
          className="text-sm text-white/60 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8d6b1]"
        >
          Back to home
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-12">
        <div className="mb-8">
          <p className="mb-4 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.19em] text-white/55">
            <span className="h-px w-7 bg-[#c8d6b1]" aria-hidden="true" />
            The Drivio experience
          </p>
          <h1 className="text-4xl font-medium tracking-[-0.06em] text-white sm:text-[2.8rem]">
            {heading}
          </h1>
          <p className="mt-3 max-w-[360px] text-sm leading-6 text-white/65 sm:text-[0.95rem]">
            {description}
          </p>
        </div>
        {children}
        <div className="mt-7 text-center text-sm text-white/60">{footer}</div>
      </div>

      <footer className="flex items-center justify-between border-t border-white/10 pt-4 text-[0.67rem] tracking-wide text-white/45 sm:text-xs">
        <span>© {new Date().getFullYear()} Drivio</span>
        <span>Move with intention.</span>
      </footer>
    </section>

    <aside className="relative hidden min-h-screen overflow-hidden bg-[#171718] lg:block" aria-label="Drivio city ride">
      <img
        className="absolute inset-0 h-full w-full object-cover object-[54%_center]"
        src={heroImage}
        alt="A city night viewed from the cabin of a premium electric car"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,15,0.15)_0%,transparent_36%,rgba(9,10,15,0.78)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 p-10 xl:p-14">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/65">
          Thoughtful rides. Seamless days.
        </p>
        <p className="mt-3 max-w-[430px] text-3xl font-medium leading-tight tracking-[-0.05em] text-white xl:text-4xl">
          Get there comfortably. Arrive ready.
        </p>
      </div>
    </aside>
  </main>
);

export default AuthLayout;
