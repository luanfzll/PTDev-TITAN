import { useSearchParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title.jsx";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-violet-700 to-violet-400  p-6">
      <div className="w-full max-w-[500px] mx-auto space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-violet-100"
          >
            <ChevronLeftIcon />
          </button>
          <Title>Detalhes da Tarefa</Title>
        </div>

        <div className="bg-violet-200 p-4 rounded-md">
          <h2 className="text-xl text-violet-700 font-bold break-all">
            {title}
          </h2>
          <p className="text-violet-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
