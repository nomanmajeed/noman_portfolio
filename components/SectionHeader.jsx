export function SectionHeader({ label, title, subtitle, centered = false }) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-300 before:h-0.5 before:w-5 before:rounded-full before:bg-indigo-300 before:content-['']">
        {label}
      </span>
      <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
