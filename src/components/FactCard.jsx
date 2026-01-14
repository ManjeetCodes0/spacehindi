export default function FactCard({ title, text }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-[1.03] transition">
      <h3 className="text-xl font-semibold text-blue-400 mb-3">
        {title}
      </h3>

      <p className="text-gray-300 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
