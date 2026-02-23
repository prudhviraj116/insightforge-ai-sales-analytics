function GlassInsightCard({ text }) {
  return (
    <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg">
      <h3 className="text-lg font-bold mb-2">Smart Insight</h3>
      <p className="opacity-80">{text}</p>
    </div>
  );
}

export default GlassInsightCard;
