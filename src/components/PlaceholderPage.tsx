// Simple page used for About / legal pages until real content is written.
export default function PlaceholderPage({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <div className="mt-4 space-y-4 text-gray-700">
        {children ?? <p>This page is a placeholder. Content coming soon.</p>}
      </div>
    </div>
  );
}
