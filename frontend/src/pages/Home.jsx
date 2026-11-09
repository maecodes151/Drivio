import { Link } from "react-router-dom";
import heroImage from "../assets/drivio-hero.jpg";

const Home = () => (
  <main className="relative isolate flex min-h-screen min-h-[100svh] overflow-hidden bg-[#090a0f] text-white">
    <img
      className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center] md:object-[62%_center]"
      src={heroImage}
      alt="A quiet city night seen from the cabin of a premium electric car"
      fetchPriority="high"
    />

    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,10,15,0.96)_0%,rgba(9,10,15,0.88)_32%,rgba(9,10,15,0.52)_61%,rgba(9,10,15,0.18)_100%)] max-md:bg-[linear-gradient(180deg,rgba(9,10,15,0.42)_0%,rgba(9,10,15,0.22)_30%,rgba(9,10,15,0.92)_76%,#090a0f_100%)]"
    />

    <div
      className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(9,10,15,0.42),transparent_34%)]"
      aria-hidden="true"
    />

    <div className="mx-auto flex min-h-screen min-h-[100svh] w-full max-w-[1600px] flex-col px-6 pb-7 pt-6 sm:px-10 sm:pb-9 sm:pt-8 lg:px-16 lg:pb-10 lg:pt-10">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          aria-label="Drivio home"
          className="text-[1.65rem] font-semibold tracking-[-0.09em] text-white transition-colors duration-300 hover:text-[#d4dfc4] sm:text-3xl"
        >
          drivio<span className="text-[#c8d6b1]">.</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-5">
          <Link
            to="/userlogin"
            className="rounded-full border border-white/35 bg-black/10 px-4 py-2 text-sm text-white/90 transition-colors duration-300 hover:border-white/70 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8d6b1] sm:px-5 sm:py-2.5"
          >
            Login{" "}
            <span aria-hidden="true" className="ml-1 text-[#c8d6b1]">
              ↗
            </span>
          </Link>
        </nav>
      </header>

      <section
        aria-labelledby="home-title"
        className="my-auto w-full max-w-[650px] py-20 max-md:mt-auto max-md:pt-[45vh] max-md:pb-10"
      >
        <p className="mb-5 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-white/70 sm:mb-6 sm:text-xs">
          <span className="h-px w-8 bg-[#c8d6b1]" aria-hidden="true" />A better
          way across the city
        </p>

        <h1
          id="home-title"
          className="max-w-[620px] text-[clamp(3.5rem,9vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.075em] text-white"
        >
          Your journey.
          <br />
          <span className="text-white/75">Your way.</span>
        </h1>

        <p className="mt-6 max-w-[440px] text-base leading-7 text-white/75 sm:mt-7 sm:text-lg sm:leading-8">
          Comfortable, reliable rides that make every city journey feel
          effortless.
        </p>

        <div className="mt-8 flex flex-col items-start gap-5 sm:mt-9 sm:flex-row sm:items-center sm:gap-7">
          <Link
            to="/userlogin"
            className="group inline-flex min-h-14 min-w-[184px] items-center justify-between gap-8 rounded-full bg-[#f4f3ef] py-2 pl-6 pr-2 text-sm font-medium text-[#11130f] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8d6b1]"
          >
            <span>Get Started</span>
            <span
              className="grid h-10 w-10 place-items-center rounded-full bg-[#171916] text-lg text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>

          <Link
            to="/usersignup"
            className="text-sm text-white/75 underline decoration-white/35 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8d6b1]"
          >
            New to Drivio? <span className="text-white">Create an account</span>
          </Link>
        </div>
      </section>

      <footer className="flex items-center justify-between gap-4 border-t border-white/20 pt-4 text-[0.67rem] tracking-wide text-white/65 sm:pt-5 sm:text-xs">
        <span className="shrink-0">
          © {new Date().getFullYear()} Drivio
          <span className="hidden sm:inline">. All rights reserved.</span>
        </span>
        <span className="text-right text-white/75">
          <span className="hidden sm:inline">
            Thoughtful rides. Seamless days.
          </span>
          <span className="sm:hidden">Move with intention.</span>
        </span>
      </footer>
    </div>
  </main>
);

export default Home;
