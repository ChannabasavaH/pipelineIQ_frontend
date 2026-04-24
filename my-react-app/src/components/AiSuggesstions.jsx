export default function AiSuggestions({ title, data }) {

  return (
    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl my-8">
      <h2 className="mb-3 font-semibold text-blue-400">{title}</h2>

      {data.map((text, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
            {i+1}
          </span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}