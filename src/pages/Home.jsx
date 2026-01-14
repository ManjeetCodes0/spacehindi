import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          ब्रह्मांड के <span className="text-blue-400">अविश्वसनीय</span> रहस्य
        </h1>

        <p className="mt-6 max-w-2xl text-gray-300 text-lg">
          ऐसे साइंस और स्पेस फैक्ट्स, जो आपकी सोच बदल देंगे।
          छोटे, रोचक और दिमाग घुमा देने वाले।
        </p>

        <button className="mt-10 px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-600 transition">
          फैक्ट्स देखें 🚀
        </button>
      </section>
    </>
  );
}
