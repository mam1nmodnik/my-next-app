export default function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-slate-700 pb-2">
      <span className="text-slate-400">{label}:</span>
      <span className="font-medium">
        {value ? value : "не задано"}
      </span>
    </div>
  );
}
