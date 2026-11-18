import { FormEvent, useState } from "react";
import { RevealText } from "./Reveal";

const socials = [
  { label: "X", href: "https://x.com/", path: "M4 4l8 8M12 4 4 12" },
  { label: "Instagram", href: "https://www.instagram.com/", path: "M6 3.5h4A2.5 2.5 0 0 1 12.5 6v4A2.5 2.5 0 0 1 10 12.5H6A2.5 2.5 0 0 1 3.5 10V6A2.5 2.5 0 0 1 6 3.5Z M8 6.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", path: "M4 6.5V12M4 4.2h.01M7 12V8.2A1.6 1.6 0 0 1 10.2 8c.3 0 .8.4.8 1.4V12M7 8.5V12" },
  { label: "YouTube", href: "https://www.youtube.com/", path: "M3.2 6.2c.2-1 .9-1.5 2-1.6C6.4 4.4 8 4.4 8 4.4s1.6 0 2.8.2c1.1.1 1.8.6 2 1.6.2 1.2.2 2.6.2 2.6s0 1.4-.2 2.6c-.2 1-.9 1.5-2 1.6-1.2.2-2.8.2-2.8.2s-1.6 0-2.8-.2c-1.1-.1-1.8-.6-2-1.6C3 10.2 3 8.8 3 8.8s0-1.4.2-2.6Z M7 6.8v3.4l3-1.7-3-1.7Z" },
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "").trim();
    const next: Record<string, string> = {};
    if (!name) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!project) next.project = "Tell us about your project.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 700));
    form.reset();
    setStatus("success");
  }

  return (
    <section id="contact" className="shell grid gap-12 py-16 md:grid-cols-[minmax(0,640px)_minmax(280px,468px)] md:justify-between xl:py-24">
      <div>
        <h2 className="h-section">
          <RevealText text="Let’s talk." />
        </h2>
        <p className="copy mt-2.5 max-w-xl">Have a project or need help? Fill out the form, and we'll get back to you soon.</p>
        <div className="mt-10 flex gap-4">
          {socials.map((social) => (
            <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-ink/10 text-ink transition hover:bg-ink hover:text-cream">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d={social.path} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>
      </div>
      {status === "success" ? (
        <p className="copy-strong self-center" role="status">
          Thanks — I’ll get back to you soon.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <Field label="Name" name="name" placeholder="Enter your name" error={errors.name} />
          <Field label="Email" name="email" type="email" placeholder="Enter your email" error={errors.email} />
          <Field label="Your Project" name="project" placeholder="Tell us about your project" error={errors.project} multiline />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-11 rounded-lg bg-cream text-[16px] font-medium tracking-display text-ink disabled:opacity-60"
          >
            {status === "loading" ? "Sending" : "Submit"}
          </button>
        </form>
      )}
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  error,
  type = "text",
  multiline = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  error?: string;
  type?: string;
  multiline?: boolean;
}) {
  const className = "w-full bg-transparent text-[16px] tracking-body text-cream outline-none placeholder:text-cream/45";
  return (
    <label className={`block rounded-lg bg-ink px-4 pb-3 pt-3 ${multiline ? "min-h-[170px]" : "min-h-[74px]"}`}>
      <span className="meta block text-cream">{label}</span>
      {multiline ? (
        <textarea name={name} required placeholder={placeholder} className={`${className} mt-2 min-h-[100px] resize-none`} />
      ) : (
        <input name={name} type={type} required placeholder={placeholder} className={`${className} mt-2`} />
      )}
      {error && <span className="mt-1 block text-[13px] text-[#ffb4a8]">{error}</span>}
    </label>
  );
}
