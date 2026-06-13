export default function StaticPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-2 font-mono text-xs text-subdued">Last updated: {updated}</p>
      <div className="prose-static mt-8 space-y-6 text-sm leading-relaxed text-body [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}
