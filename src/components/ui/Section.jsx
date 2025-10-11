export default function Section({ id, eyebrow, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`py-16 md:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-6">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            <span className="text-gradient">{title}</span>
          </h2>
        )}
        {subtitle && <p className="text-slate-600 max-w-3xl mt-3">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
