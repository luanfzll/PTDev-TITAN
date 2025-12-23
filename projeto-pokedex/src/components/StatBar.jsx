function StatBar({ baseStats, color }) {
  return (
    <div className="bg-[#E8E8E8] h-3 rounded-full mb-2">
      <div
        className="h-3 rounded-full"
        style={{
          width: `${(baseStats / 255) * 100}%`,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}

export default StatBar;
