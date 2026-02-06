export default function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  id: string;
  label: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-slate-400 mb-1" htmlFor={id} >{label}</label>
      <input
        id={id}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        className="
  p-2
  rounded-lg
  bg-black
  text-white
  border
  border-white/30
  focus:outline-none
  focus:border-blue-400
  transition
"
      />
    </div>
  );
}
