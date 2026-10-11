import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

/** "Request an Episode" — composes an email to Anish in the visitor's mail app (no backend needed). */
type Draft = { subject: string; body: string };

export default function ContactForm() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copied, setCopied] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') ?? '').trim();
    const from = String(f.get('email') ?? '').trim();
    const message = String(f.get('message') ?? '').trim();
    const subject = `Portfolio message from ${name}`;
    const body = `${message}\n\n— ${name}${from ? ` (${from})` : ''}`;
    setDraft({ subject, body });
    setCopied(false);
    // Works when the visitor has a mail app set up; the buttons below cover everyone else.
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    if (!draft) return;
    const text = `To: ${profile.email}\nSubject: ${draft.subject}\n\n${draft.body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const gmail = draft
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`
    : '#';

  const field =
    'w-full rounded-lg bg-ink-2 px-4 py-3 text-[15px] text-bone ring-1 ring-white/10 transition placeholder:text-smoke focus:outline-none focus:ring-crimson-2/70';

  return (
    <section id="request" className="relative py-16 sm:py-24">
      <SectionHeading kicker="Pitch a story" title="Request an Episode" />
      <div className="gutter grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
          <p className="font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] italic leading-[1.15] text-bone">Have a role, a project or an idea? Let&apos;s make the next episode together.</p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="text-bone hover:text-crimson-2">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">Phone</dt>
              <dd>
                <a href={`tel:${profile.phone}`} className="text-bone hover:text-crimson-2">
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">Elsewhere</dt>
              <dd className="space-x-4">
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="text-bone hover:text-crimson-2">
                  LinkedIn ↗
                </a>
                <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-bone hover:text-crimson-2">
                  GitHub ↗
                </a>
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.form
          onSubmit={submit}
          className="space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">Your name</span>
              <input name="name" required autoComplete="name" placeholder="Jane Doe" className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">Your email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={field} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">Message</span>
            <textarea name="message" required rows={5} placeholder="Tell me about the role or project…" className={`${field} resize-none`} />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" data-cursor="play" className="flex min-h-12 items-center gap-2 rounded-md bg-crimson px-7 text-[15px] font-bold text-white shadow-[0_0_40px_rgba(229,19,43,0.35)] transition hover:bg-crimson-2">
              ▶ Send Request
            </button>
          </div>
          {draft && (
            <div role="status" className="rounded-xl bg-ink-2 p-4 ring-1 ring-white/10">
              <p className="text-sm text-bone">Your message is ready. If your mail app didn&apos;t open, send it another way:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={gmail} target="_blank" rel="noreferrer" className="flex min-h-10 items-center rounded-md bg-bone px-4 text-sm font-bold text-ink transition hover:bg-white">
                  Open in Gmail ↗
                </a>
                <button type="button" onClick={copy} className="flex min-h-10 items-center rounded-md border border-white/25 px-4 text-sm font-semibold text-bone transition hover:border-bone">
                  {copied ? '✓ Copied' : 'Copy message'}
                </button>
                <a href={`mailto:${profile.email}`} className="flex min-h-10 items-center rounded-md border border-white/25 px-4 text-sm font-semibold text-bone transition hover:border-bone">
                  {profile.email}
                </a>
              </div>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
