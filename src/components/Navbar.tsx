import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data/site";

export function Navbar({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > last && current > 80 && !open);
      last = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash, setOpen]);

  return (
    <>
      <header
        className={`fixed left-5 right-5 top-[30px] z-40 mx-auto transition-transform duration-500 md:left-1/2 md:right-auto md:w-[320px] md:-translate-x-1/2 ${
          hidden ? "-translate-y-24" : "translate-y-0"
        }`}
      >
        <div className="flex h-[60px] items-center justify-between rounded-[20px] bg-ink px-4">
          <Link to="/#hero-section" className="text-[22px] font-semibold leading-none tracking-body text-cream">
            Majd
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-9 w-11 place-items-center rounded-lg bg-cream text-ink"
          >
            {open ? (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M2 2 12 12M12 2 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <span className="flex gap-[3px]" aria-hidden="true">
                <span className="h-1 w-1 rounded-full bg-ink" />
                <span className="h-1 w-1 rounded-full bg-ink" />
                <span className="h-1 w-1 rounded-full bg-ink" />
              </span>
            )}
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-30 bg-ink/95 text-cream" role="dialog" aria-label="Menu">
          <nav className="flex h-full flex-col justify-center gap-6 px-8 md:px-24">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className="h-section text-cream hover:opacity-60">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
