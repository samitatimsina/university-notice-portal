interface Props {
  priority: "Low" | "Medium" | "High";
}

export default function PriorityBadge({ priority }: Props) {
  const color =
    priority === "High"
      ? "bg-red-100 text-red-700"
      : priority === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}
    >
      {priority}
    </span>
  );
}