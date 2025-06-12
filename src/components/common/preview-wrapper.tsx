export default function PreviewWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center rounded border p-2 sm:p-6 md:p-16">
      {children}
    </div>
  );
}
