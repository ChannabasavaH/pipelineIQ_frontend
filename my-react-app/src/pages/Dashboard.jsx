import { useLocation } from "react-router-dom";
import SummaryCards from "../components/SummaryCards";
import JobsTable from "../components/JobsTable";
import Issues from "../components/Issues";
import Suggestions from "../components/Suggestions";
import AiSuggestions from "../components/AiSuggesstions";

export default function Dashboard() {
  const { state } = useLocation();

  if (!state) return <div className="pt-32 text-center">No Data</div>;

  const jobsArray = state?.parsed?.jobs
    ? Object.entries(state.parsed.jobs).map(([name, job]) => ({
        name,
        steps: job.steps?.length || 0,
      }))
    : [];
const parseAiSuggestions = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;

  return String(raw)
    .split("\n")
    .map((line) =>
      line
        .replace(/^[-•*\d.]+\s*/, "")
        .trim()
    )
    .filter(Boolean);
};

  const transformedData = {
    estimated_time: state.estimatedTime,
    execution:
      typeof state.execution === "string"
        ? state.execution
        : state.execution?.type || state.execution?.details || "unknown",
    total_jobs: jobsArray.length,
    issues: state.suggestions.length,
    jobs: jobsArray,
    suggestions: state.suggestions,
    ai_suggestions: parseAiSuggestions(state.ai_suggestions),
  };

  return (
    <div className="min-h-screen pt-28 px-6">
      <SummaryCards data={transformedData} />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <JobsTable jobs={transformedData.jobs} />
        <Issues issues={transformedData.issues} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Suggestions title="Suggestions" data={transformedData.suggestions} />
        <AiSuggestions
          title="AI Suggestions"
          data={transformedData.ai_suggestions}
        />
      </div>
    </div>
  );
}
