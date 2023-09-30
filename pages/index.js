import Layout from "../components/layouts/Default"
import Hero from "../components/Hero"
import AnimateIn from "../components/Animate"
import Calendar from "../components/Calendar"

export default function Home() {
  return (
    <Layout
      pageTitle="Home"
      imageUrl=""
      pageUrl="/"
      pageDescription=""
    >
      <Hero
        altText="Hero Image"
        mobileImg="/klaraMobile.jpeg"
        desktopImg="/klara.jpeg"
        heroPosition="top"
      >
        <div className="centerContent flex-col gap-4 uppercase text-white tracking-widest drop-shadow-lg">
          <AnimateIn animationType="slide" classes="delay-[1200ms]">
            <h1 className="lg:text-7xl font-bold">Klara</h1>
          </AnimateIn>
          <AnimateIn animationType="slide" slideDirection="right" classes="delay-[1200ms]">
            <h1 className="lg:text-7xl font-bold">Källström</h1>
          </AnimateIn>
        </div>
      </Hero>

      <Calendar />
    </Layout>
  )
}
