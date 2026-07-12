interface Props {
  title: string;
  value: number;
}

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}