"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {

  const videoRef = useRef<HTMLVideoElement|null>(null)

  const isMobile = useMediaQuery({maxWidth:767})

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars,words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 300 }, 0)
      .to(".left-leaf", { y: -300 }, 0);


      const startValue = isMobile?'top 50%': 'center 60%';
      const endValue = isMobile?'120% top' : 'bottom top';


      if (videoRef.current) {
        const video = videoRef.current;
    
        const setupVideoScroll = () => {
          gsap.timeline({
            scrollTrigger: {
              trigger: video,    
              start: startValue,
              end: endValue,
              scrub: true,
              pin: true,
            },
          })
          .to(video, {
            currentTime: video.duration,  
            ease: "none",
          });
        };
    
        if (video.readyState >= 1) {
          setupVideoScroll();  
        } else {
          video.addEventListener("loadedmetadata", setupVideoScroll);
        }
      }

  }, []);

  return (
    <>
      <section id="hero" className="noisy overflow-hidden ">
        <h1 className="title">MOJITO</h1>

        <div className="left-leaf h-80 w-46 md:h-121 md:w-70">
          <Image
            src={"/images/hero-left-leaf.png"}
            alt="left-leaf"
            fill
            className="object-contain"
          />
        </div>
        <div className="right-leaf h-50 md:h-121 md:w-56">
          <Image
            src={"/images/hero-right-leaf.png"}
            alt="right-leaf"
            fill
            className="object-contain"
          />
        </div>

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool ,Crisp, Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails ">
              <p className="subtitle w-70">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes - designed to delight your
                senses.
              </p>
              <Link href={"#cocktails"} className="a">
                {" "}
                View Cocktails
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video 
          ref={videoRef}
          src={'/videos/output.mp4'}
          muted
          playsInline
          preload="auto"
          />
      </div>
    </>
  );
}
