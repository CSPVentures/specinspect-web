export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="text-2xl font-bold text-navy dark:text-white">{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-subdued">{subtitle}</p>}
      <div className="card mt-6 p-6">{children}</div>
    </div>
  );
}
