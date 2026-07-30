import InfoCardAbout from "@/components/organisms/infoCardAbout";
import CardAbout from "@/components/atoms/card-about";
import Hero from "@/components/organisms/hero";

export default function AboutPage() {
  return (
    <main className="w-full flex flex-col items-center overflow-hidden">
      <Hero page="about" />
      <div className="w-full max-w-[90%] mx-auto flex flex-col items-center gap-8 py-6 ">
        <CardAbout />
        <InfoCardAbout />
      </div>
    </main>
  )
}
