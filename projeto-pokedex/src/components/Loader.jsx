import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4">
      <Loader2 className="animate-spin text-[#D54C42] text-2xl" />
      <span className="text-gray-500 font-semibold text-2xl animate-pulse">
        Carregando...
      </span>
    </div>
  );
}

export default Loader;
