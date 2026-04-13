"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

interface PlanetPreview {
  id: string;
  nameEn: string;
  nameHi: string;
  image: string;
  typeEn: string;
  typeHi: string;
}

const ALL_PLANETS: PlanetPreview[] = [
  {
    id: "mercury",
    nameEn: "Mercury",
    nameHi: "बुध ग्रह",
    image: "/universe/planets/mercury/mercury1.png",
    typeEn: "Terrestrial Planet",
    typeHi: "चट्टानी ग्रह",
  },
  {
    id: "venus",
    nameEn: "Venus",
    nameHi: "शुक्र ग्रह",
    image: "/universe/planets/venus/venus1.png",
    typeEn: "Terrestrial Planet",
    typeHi: "चट्टानी ग्रह",
  },
  {
    id: "earth",
    nameEn: "Earth",
    nameHi: "पृथ्वी",
    image: "/universe/planets/earth/earth1.png",
    typeEn: "Terrestrial Planet",
    typeHi: "चट्टानी ग्रह",
  },
  {
    id: "mars",
    nameEn: "Mars",
    nameHi: "मंगल ग्रह",
    image: "/universe/planets/mars/mars1.png",
    typeEn: "Terrestrial Planet",
    typeHi: "चट्टानी ग्रह",
  },
  {
    id: "jupiter",
    nameEn: "Jupiter",
    nameHi: "बृहस्पति",
    image: "/universe/planets/jupiter/jupiter1.png",
    typeEn: "Gas Giant",
    typeHi: "गैस दानव",
  },
  {
    id: "saturn",
    nameEn: "Saturn",
    nameHi: "शनि ग्रह",
    image: "/universe/planets/saturn/saturn1.png",
    typeEn: "Gas Giant",
    typeHi: "गैस दानव",
  },
  {
    id: "uranus",
    nameEn: "Uranus",
    nameHi: "अरुण ग्रह",
    image: "/universe/planets/uranus/uranus1.png",
    typeEn: "Ice Giant",
    typeHi: "बर्फ विशाल",
  },
  {
    id: "neptune",
    nameEn: "Neptune",
    nameHi: "वरुण ग्रह",
    image: "/universe/planets/neptune/neptune1.png",
    typeEn: "Ice Giant",
    typeHi: "बर्फ विशाल",
  },
  {
    id: "pluto",
    nameEn: "Pluto",
    nameHi: "प्लूटो",
    image: "/universe/planets/pluto/pluto1.png",
    typeEn: "Dwarf Planet",
    typeHi: "बौना ग्रह",
  },
];

export default function NextPlanets({
  currentPlanetId,
}: {
  currentPlanetId: string;
}) {
  const { lang } = useLang();

  const currentIndex = ALL_PLANETS.findIndex((p) => p.id === currentPlanetId);
  const displayPlanets: PlanetPreview[] = [];
  for (let i = 1; i <= 3; i++) {
    displayPlanets.push(ALL_PLANETS[(currentIndex + i) % ALL_PLANETS.length]);
  }

  if (displayPlanets.length === 0) return null;

  return (
    <section className="w-full py-16 lg:py-24 bg-black border-t border-white/10 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col mb-12">
           <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-2">
             {lang === "en" ? "Explore Further" : "आगे एक्सप्लोर करें"}
           </h3>
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white">
             {lang === "en" ? "Next Planets" : "अगले ग्रह"}
           </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayPlanets.map((planet) => (
            <Link key={planet.id} href={`/universe/${planet.id}`} className="group relative w-full h-[400px] rounded-2xl overflow-hidden bg-[#050a12] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col items-center justify-end p-8">
               <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
               
               <div className="relative w-[250px] h-[250px] mb-auto z-10">
                 <Image 
                   src={planet.image} 
                   alt={planet.nameEn} 
                   fill 
                   className="object-contain group-hover:scale-110 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all duration-700 ease-out" 
                 />
               </div>

               <div className="relative w-full z-20 text-center flex flex-col gap-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                    {lang === "en" ? planet.typeEn : planet.typeHi}
                  </span>
                  <h3 className="text-3xl font-bold uppercase tracking-wider text-white">
                    {lang === "en" ? planet.nameEn : planet.nameHi}
                  </h3>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
