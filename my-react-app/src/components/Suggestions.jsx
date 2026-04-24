export default function Suggestions({ title, data }) {
  return (
    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl my-8">
      <h2 className="mb-3 font-semibold text-green-400">{title}</h2>

      {data.map((s, i) => {
        const label =
          typeof s.message === "string"
            ? s.message
            : s.message?.details || JSON.stringify(s.message);

        return (
          <div key={i} className="flex items-center gap-2">
            {s.impact && (
              <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700">
                {s.impact}
              </span>
            )}
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}