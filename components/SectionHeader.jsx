export function SectionHeader({ label, title, subtitle, centered = false, dark = false }) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <span
        className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest before:h-0.5 before:w-5 before:rounded-full before:content-[''] ${
          dark ? 'text-indigo-300 before:bg-indigo-300' : 'text-indigo-500 before:bg-indigo-500'
        }`}
      >
        {label}
      </span>
      <h2
        className={`mb-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl ${
          dark ? 'text-white' : 'text-zinc-950'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-xl text-base leading-relaxed md:text-lg ${
            centered ? 'mx-auto' : ''
          } ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
