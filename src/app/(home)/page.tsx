import Navbar from "@/components/Navbar";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Hero from "./Hero";
import Cocktails from "./Cocktails";
import About from "./About";
import Art from "./Art";
import Menu from "./Menu";
import Contact from "./Contact";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails/>
      <About/>
      <Art/>
      <Menu/>
      <Contact/>
    </main>
  );
}
