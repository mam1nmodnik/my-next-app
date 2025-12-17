import { LoadingOutlined } from "@ant-design/icons";

type MyButtonProps = {
  loading?: boolean;
  text: string;
  className?: string;
  onClick?: () => void;
};

export function MyButton({ loading, text, className, onClick }: MyButtonProps) {
  return (
    <button
      className={
        className
          ? className
          : "w-full text-lg p-2 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-md backdrop-saturate-150 shadow-md hover:shadow-lg hover:backdrop-blur-lg hover:bg-white/20 transition-all duration-300 ease-in-out"
      }
      onClick={onClick}
    >
      {loading ? <LoadingOutlined /> : text}
    </button>
  );
}
