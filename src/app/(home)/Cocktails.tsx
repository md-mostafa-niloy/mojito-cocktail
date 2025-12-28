'use client'
import { cocktailLists, mockTailLists } from "@/Constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export default function Cocktails() {

    useGSAP(()=>{
        const parallaxTimeline = gsap.timeline({
            scrollTrigger:{
                trigger:'#cocktails',
                start:'top 30%',
                end:'bottom 80%',
                scrub:true,
            }
        })

        parallaxTimeline.from('#c-left-leaf', {
            x:-100,y:100
        })
        parallaxTimeline.from('#c-right-leaf', {
            x:100,y:100
        })
    })
  return (
    <section id="cocktails" className="noisy">
      <div className="c-left-leaf h-61 w-55  md:h-83 md:w-73" id="c-left-leaf">
          <Image
            src={"/images/cocktail-left-leaf.png"}
            alt="left-leaf"
            fill
            className="object-contain"
          />
        </div>
<div className="c-right-leaf h-80 w-46 md:h-84 md:w-80" id="c-right-leaf">
          <Image
            src={"/images/cocktail-right-leaf.png"}
            alt="right-leaf"
            fill
            className="object-contain"
          />
        </div>

      <div className="list">
        <div className="popular">
          <h2>Most popular cocktails:</h2>
          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:mr-28">
                  <h3>{name}</h3>
                  <p>{country} | {detail}</p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Most popular mocktails:</h2>
          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:mr-28">
                  <h3>{name}</h3>
                  <p>{country} | {detail}</p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
