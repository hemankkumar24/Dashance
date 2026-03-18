import React from 'react'
import FAQItem from './components/Landing/FAQItem'

const page = () => {
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
        <div className="absolute inset-0 flex items-start justify-center pt-5 main-font text-2xl text-blue-700">
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
        <div className='text-8xl px-25 text-center main-font text-stone-800'>
          Beyond tracking: clearer, smarter, and
          <span className='italic-font'> more in control</span>
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
          <button className='px-5 py-1 text-lg border border-stone-300 bg-white mt-5 inline-block rounded-2xl text-stone-800'>
            Get Started
          </button>
        </div>
        <div>

        </div>
      </div>

      {/* Skill Section */}
      <div className="py-2 border-b-stone-500 border-b text-3xl main-font gap-5 justify-center flex overflow-x-hidden whitespace-nowrap">
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

      {/* Description Section */}
      <div className='py-25 border-b border-b-stone-500'>
        <div className='main-font text-5xl px-10'>
          <div className='text-stone-800'>
            Private by design. Powerful by default.
          </div>
          <div className='text-stone-500 pt-2'>
            Take control of your money with complete privacy and clarity. Track your spending, understand your habits, and make better financial decisions all without compromising your data. Built to keep your financial life secure, simple, and entirely yours. No tracking, no selling just smarter money management.
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='grid grid-cols-2 border-b border-b-stone-500'>
        <div className='p-10 main-font text-6xl border-r-stone-500 border-r'>
          FAQ
        </div>
        <div className='p-10 flex flex-col gap-5 main-font'>
          <FAQItem title="What can I do with Dashance?">
            Easily track your expenses, understand where your money goes, and set simple financial goals. Everything is designed to give you clarity without complexity.
          </FAQItem>

          <FAQItem title="Do you track or monetize my data?">
            No. We don’t track your behavior or sell your data. Dashance exists to help you manage your finances not to profit from your information.
          </FAQItem>

          <FAQItem title="How is this different from other finance apps?">
            Most apps focus on collecting data. Dashance focuses on giving you clear insights while keeping things simple and private.
          </FAQItem>

          <FAQItem title="Is my financial data private?">
            Yes. Your data stays yours. We use secure systems to protect your information and never share it with third parties.
          </FAQItem>

          <FAQItem title="Do I need to connect my bank account?">
            No. You can use Dashance without connecting your bank. Any integrations are optional and handled securely.
          </FAQItem>

          <FAQItem title="Can I use this across devices?">
            Yes. You can use Dashance on your phone, laptop, or tablet. Your data is linked to your account and stays in sync across all your devices.
          </FAQItem>
        </div>
      </div>

      {/* Get Started Section */}
      <div className='main-font'>
        <div className='bg-stone-900 relative w-full h-full pt-40 pb-140 flex flex-col items-center text-center overflow-hidden'>
          <div className='text-6xl text-stone-100'>
            Start managing your money with <span className='italic-font'>clarity</span>
          </div>  
          <div className='pt-5 text-3xl text-stone-400 w-[60%]'>
            Simple, private, and built for control. Everything you need to track, understand, and improve your finances.
          </div>
          <div className='pt-5 flex gap-5'>
            <button className='px-10 py-2 text-xl border border-stone-300 font-bold bg-white inline-block rounded-4xl text-stone-500 font-main'>
              Login
            </button>
            <button className='text-stone-100 text-xl'>
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