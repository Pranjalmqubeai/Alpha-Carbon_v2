export function Card({ className = "", children }) {
  return <div className={`card ${className}`}>{children}</div>;
}
export function CardBody({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
export function CardTitle({ className = "", children }) {
  return <h4 className={`text-lg font-semibold ${className}`}>{children}</h4>;
}
export function CardSubtitle({ className = "", children }) {
  return <p className={`text-sm text-slate-600 ${className}`}>{children}</p>;
}
