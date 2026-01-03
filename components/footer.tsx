export function Footer() {
    return (
        <footer className="py-12 border-t border-white/10 bg-black text-center relative z-20">
            <h2 className="text-4xl font-chakra font-bold text-tech-grey mb-6">KI-LLER</h2>
            <a
                href="mailto:contact@ki-ller.de"
                className="inline-block px-8 py-3 border border-[var(--neon-blue)] text-[var(--neon-blue)] hover:bg-[var(--neon-blue)] hover:text-black transition-all font-bold tracking-widest uppercase text-sm"
            >
                Kontakt aufnehmen
            </a>
            <p className="mt-8 text-xs text-tech-grey/60">
                © 2026 ANTIGRAVITY / KI-LLER AGENCY. ALL RIGHTS RESERVED.
            </p>
        </footer>
    );
}
