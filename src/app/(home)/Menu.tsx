'use client'
import { sliderLists } from "@/Constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Menu() {

    const [currentIndex, setcurrentIndex] = useState<number>(0)

    const contentRef = useRef< HTMLDivElement|null>(null)

    useGSAP(()=>{
        gsap.fromTo('#title', {
            opacity:0
        }, {
            opacity:1,duration:1
        })
        gsap.fromTo('.cocktail img', {
            opacity:0,xPercent:-100
        }, {
            xPercent:0,opacity:1,duration:1,ease:"power1.inOut"
        })
        gsap.fromTo('.details h2', {
            yPercent:100,opacity:0
        }, {
            yPercent:0,opacity:100,ease:'power1.inOut'
        })
        gsap.fromTo('.details p', {
            yPercent:100,opacity:0
        }, {
            yPercent:0,opacity:100,ease:'power1.inOut'
        })

    },[currentIndex])

    const totalCocktails = sliderLists.length;

    const goToSlide = (index:number)=>{
        const newIndex = (index+totalCocktails) % totalCocktails
        
        setcurrentIndex(newIndex)
    }

    const getCocktailAt = (indexOffset:number)=>{
        return sliderLists[(currentIndex+indexOffset+totalCocktails)%totalCocktails]
    }

    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(3);
    const nextCocktail = getCocktailAt(1);
    return (
        <section id="menu" aria-labelledby="menu-heading" className="overflow-hidden pb-40">
            <div id="m-left-leaf" className=" h-80 w-49 mb-8 md:-mb-8 md:h-121 md:w-56 ">
                <Image
                    src={"/images/slider-left-leaf.png"}
                    alt="left-leaf"
                    fill
                    className="object-contain"
                />
            </div>
            <div id="m-right-leaf" className=" h-55 w-35 mt-40 md:mt-10 md:h-121 md:w-56">
                <Image
                    src={"/images/slider-right-leaf.png"}
                    alt="right-leaf"
                    fill
                    className="object-contain"
                />
            </div>

            <h2 id="menu-heading" className="sr-only">
                Cocktail menu
            </h2>

            <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                {
                    sliderLists.map((cocktial, index) => {
                        const isActive = index === currentIndex;

                        return (
                            <button key={cocktial.id} className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`} 
                            onClick={()=>goToSlide(index)}>
                                {cocktial.name}
                            </button>
                        )
                    })
                }
            </nav>

            <div className="content">
                <div className="arrows">
                    <button className="text-left" onClick={()=>goToSlide(currentIndex-1)}>
                        <span>{prevCocktail.name}</span>
                            <div className=" cursor-pointer h-10 w-10 relative z-50">
                        <Image src={'/images/right-arrow.png'} alt="right-arrow" height={40} width={40} aria-hidden="true" className="pointer-events-none"/>
                            </div>

                    </button>
                    <button className="text-left" onClick={()=>goToSlide(currentIndex+1)}>
                        <span>{nextCocktail.name}</span>

                        <div className=" cursor-pointer h-10 w-10 relative z-50">
                        <Image src={'/images/left-arrow.png'} alt="left-arrow" height={40} width={40} aria-hidden="true" className="pointer-events-none"/>
                            </div>

                    </button>

                </div>

                <div className="cocktail">
                    <Image src={`${currentCocktail.image}`} alt="" height={2000} width={2000}/>

                </div>
                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>

                    </div>
                    <div className="details">
                        <h2>{currentCocktail.name}</h2>
                        <p>{currentCocktail.description}</p>

                    </div>

                </div>

            </div>

        </section>
    )
}