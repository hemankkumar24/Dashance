"use client"

import React, { useState } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQItem from './components/Landing/FAQItem'

// GSAP  
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShimmerButton } from '@/components/ui/shimmer-button';
gsap.registerPlugin(ScrollTrigger, useGSAP);

const page = () => {


  useGSAP(() => {
    // Text Show Up Animation
    gsap.utils.toArray<HTMLElement>(".animate-show-up").forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 10, },
        {
          opacity: 1, y: 0, duration: 1, ease: "power1.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" }
        })
    });

    // Text Show from Left Animation (FAQ)
    gsap.utils.toArray<HTMLElement>(".animate-show-from-left").forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, x: 10, },
        {
          opacity: 1, x: 0, duration: 1., ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 50%", toggleActions: "play none none none" }
        })
    });

    // Constant Linear Movement Scroll
    const el = document.querySelector(".infinite-loop-x");
    if (!el) return;
    const width = el.scrollWidth / 2;

    const tl = gsap.fromTo(
      el,
      { x: -width },
      {
        x: 0,
        duration: 30,
        ease: "linear",
        repeat: -1,
      }
    );

    el.addEventListener("mouseenter", () => tl.pause());
    el.addEventListener("mouseleave", () => tl.resume());

    const words = gsap.utils.toArray<HTMLElement>(".word");

    // Words Being Seen Lock
    gsap.to(words, {
      opacity: 1,
      color: "#78716c",
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".word-section",
        start: "top top",
        end: "+=1000",
        scrub: 1,
        pin: true,
      }
    });

    // animation for more in control text
    const tops = gsap.utils.toArray<HTMLElement>(".top");
    const bottoms = gsap.utils.toArray<HTMLElement>(".bottom");

    const tl2 = gsap.timeline({ paused: true });

    tl2.to(tops, {
      y: "-100%",
      stagger: 0.03,
      duration: 0.5,
      ease: "power3.inOut",
    });

    tl2.to(
      bottoms,
      {
        y: "-100%",
        stagger: 0.03,
        duration: 0.5,
        ease: "power3.inOut",
      },
      0
    );

    const container = document.querySelector(".hover-text");
    if (!container) return;

    container.addEventListener("mouseenter", () => tl2.play());
    container.addEventListener("mouseleave", () => tl2.reverse());

  });

  // Text Storing for Text Animation
  const text = `Take control of your money with complete privacy and clarity. Track your spending, understand your habits, and make better financial decisions all without compromising your data. Built to keep your financial life secure, simple, and entirely yours. No tracking, no selling just smarter money management.`;

  // Use State for Hover Animation 
  const [hovered, setHovered] = useState(false)
  return (

    <div className='w-full bg-stone-50'>

      {/* Navbar Section */}
      <div className='w-full px-10 py-5 border-b-stone-500 border relative'>
        <div className='w-full flex justify-between items-center'>
          {/* Left Buttons and Right Buttons */}
          <div className='main-font text-lg'>
            Home
          </div>
          <button className='main-font text-lg'>
            Create Account
          </button>
        </div>
        {/* Middle Name */}
        <div className="absolute inset-0 flex items-start justify-center pt-5 main-font text-2xl">
          Dashance
        </div>
      </div>

      {/* Hero Segment */}
      <div className='h-full w-full'>

        {/* Box Above Hero */}
        <div className='relative w-full'>
          <div className='grid grid-cols-2 h-30'>
            <div className='border-r border-b w-full h-full border-stone-500'></div>
            <div className='border-l border-b w-full h-full border-stone-500'></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-10 bg-stone-600 pointer-events-none"></div>
        </div>
      </div>
      {/* Hero Text Section */}
      <div className='py-10 flex flex-col items-center border-b-stone-500 border-b'>
        <div className='text-8xl animate-show-up px-25 text-center main-font text-stone-800 opacity-0'>
          Beyond tracking: clearer, smarter, and
          {/* More in control Animation */}
          <span className="hover-text inline-block cursor-pointer italic-font">
            {Array.from(" more in control").map((char, i) => (
              <span key={i} className="letter inline-block relative overflow-hidden">

                {char === " " ? (

                  <span className="inline-block w-[0.3em]"></span>
                ) : (
                  <>
                    <span className="top block">{char}</span>
                    <span className="bottom block absolute left-0 top-full text-blue-600">
                      {char}
                    </span>
                  </>
                )}

              </span>
            ))}
          </span>
        </div>
        <div className='text-xl main-font text-stone-500 pt-5'>
          Track expenses, understand your spending, and make confident financial decisions all in one place.
        </div>
      </div>
      {/* Phone Section */}
      <div className='py-10 px-10 flex justify-between items-center main-font w-full h-[60vh] border-b-stone-500 border-b'>
        <div className=''>
          <div className='px-3 py-1 bg-stone-100 border-stone-200 border inline-block rounded-2xl text-stone-500 font-bold'>
            Smooth Onboarding
          </div>
          <div className='text-5xl pt-5 w-[70%]'>
            Your Personal finances, a few taps away
          </div>
          <div className='text-xl text-stone-500 pt-5 w-[70%]'>
            Track, manage, and grow your money effortlessly.
            From daily expenses to long-term goals everything in one place.
          </div>
          <button className='px-5 py-1 text-lg border border-stone-300 bg-white mt-5 inline-block rounded-2xl text-stone-800 hover:bg-stone-800 hover:text-stone-50 transition-colors duration-300 cursor-pointer'>
            Get Started
          </button>
        </div>
        <div>

        </div>
      </div>

      {/* Scroll Section */}
      <div className="py-2 border-b-stone-500 border-b text-3xl main-font whitespace-nowrap overflow-x-hidden mask">
        <div className='infinite-loop-x flex gap-5'>
          <span>Real-time insights</span>
          <span className='text-blue-700'>•</span>
          <span>Track every expense</span>
          <span className='text-blue-700'>•</span>
          <span>Understand spending patterns</span>
          <span className='text-blue-700'>•</span>
          <span>Financial clarity</span>
          <span className='text-blue-700'>•</span>
          <span>Fast & minimal</span>
          <span className='text-blue-700'>•</span>
          <span>Goal setting</span>
          <span className='text-blue-700'>•</span>
          <span>Analyze effortlessly</span>
          <span className='text-blue-700'>•</span>
          <span>Real-time insights</span>
          <span className='text-blue-700'>•</span>
          <span>Track every expense</span>
          <span className='text-blue-700'>•</span>
          <span>Understand spending patterns</span>
          <span className='text-blue-700'>•</span>
          <span>Financial clarity</span>
          <span className='text-blue-700'>•</span>
          <span>Fast & minimal</span>
          <span className='text-blue-700'>•</span>
          <span>Goal setting</span>
          <span className='text-blue-700'>•</span>
          <span>Analyze effortlessly</span>
        </div>
      </div>

      {/* Description Section */}
      <div className="word-section py-35 border-b border-b-stone-500 overflow-hidden">
        <div className='main-font text-5xl px-10'>
          <div className='text-stone-800 animate-show-up'>
            Private by design. Powerful by default.
          </div>
          <div className='text-stone-300 pt-2 leading-snug flex flex-wrap'>
            {text.split(" ").map((word, i) => (
              <span key={i} className="word opacity-30 mr-2 inline-block">
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='grid grid-cols-2 border-b border-b-stone-500'>
        <div className='p-10 main-font text-6xl border-r-stone-500 border-r animate-show-up'>
          FAQ
        </div>
        <div className='p-10 flex flex-col gap-5 main-font mb-6'>
          <div className='animate-show-from-left'>
            <FAQItem title="What can I do with Dashance?">
              Easily track your expenses, understand where your money goes, and set simple financial goals. Everything is designed to give you clarity without complexity.
            </FAQItem>
          </div>

          <div className='animate-show-from-left'>
            <FAQItem title="Do you track or monetize my data?">
              No. We don’t track your behavior or sell your data. Dashance exists to help you manage your finances not to profit from your information.
            </FAQItem>
          </div>

          <div className='animate-show-from-left'>
            <FAQItem title="How is this different from other finance apps?">
              Most apps focus on collecting data. Dashance focuses on giving you clear insights while keeping things simple and private.
            </FAQItem>
          </div>

          <div className='animate-show-from-left'>
            <FAQItem title="Is my financial data private?">
              Yes. Your data stays yours. We use secure systems to protect your information and never share it with third parties.
            </FAQItem>
          </div>

          <div className='animate-show-from-left'>
            <FAQItem title="Do I need to connect my bank account?">
              No. You can use Dashance without connecting your bank. Any integrations are optional and handled securely.
            </FAQItem>
          </div>

          <div className='animate-show-from-left'>
            <FAQItem title="Can I use this across devices?">
              Yes. You can use Dashance on your phone, laptop, or tablet. Your data is linked to your account and stays in sync across all your devices.
            </FAQItem>
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <div className='main-font'>
        <div className='bg-stone-900 relative w-full h-full pt-40 pb-140 flex flex-col items-center text-center overflow-hidden'>
          <div className='text-6xl text-stone-100 animate-show-up'>
            Start managing your money with <span className='italic-font'>clarity</span>
          </div>
          <div className='pt-5 text-3xl text-stone-400 w-[60%]'>
            Simple, private, and built for control. Everything you need to track, understand, and improve your finances.
          </div>
          <div className='pt-5 flex gap-5'>
              <ShimmerButton
                background={hovered ? "#000" : "#fff"}
                shimmerColor={hovered ? "#fff" : "#000"}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="transition-all duration-300 px-10 text-lg text-black hover:text-white"
              >
                Login
              </ShimmerButton>
            <button className='text-stone-100 text-lg'>
              Get Started
            </button>
          </div>
          <div className="absolute text-[420px] bottom-0 left-1/2 -translate-x-1/2 translate-y-3/10 text-stone-200/30 italic-font">
            Dashance
          </div>
        </div>
      </div>
    </div>
  )
}

export default page