export default function PreviewWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center py-16 rounded border">{children}</div>
  );
}
