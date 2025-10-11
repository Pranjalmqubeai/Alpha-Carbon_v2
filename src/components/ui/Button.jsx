export default function Button({
  as = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const Comp = as;
  const base =
    "inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-xl transition focus-visible:focus-ring";
  const styles = {
    primary:
      "bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800",
    ghost:
      "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
  };
  return (
    <Comp className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
