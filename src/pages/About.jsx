import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />

      <section className="px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">हमारा उद्देश्य</h2>

        <p className="text-gray-300 leading-relaxed">
          SpaceHindi का मकसद है साइंस और स्पेस को
          आसान, रोचक और हिंदी में सभी तक पहुँचाना।
          यहाँ फैक्ट्स रटे हुए नहीं, बल्कि सोच बदलने वाले होते हैं।
        </p>
      </section>
    </>
  );
}
