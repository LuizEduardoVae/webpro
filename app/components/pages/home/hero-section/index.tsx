'use client';

import { Button } from "@/app/components/button";
import Image from "next/image";
import { HiArrowNarrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { HomePageInfo } from "@/app/types/page-info";
import { TechBadge } from "@/app/components/tech-badge";
import { RichText } from "@/app/components/rich-text";
import { CMSIcon } from "@/app/components/cms-icon";
import { techBadgeAnimation } from "@/app/lib/animation";

type HomeSectionProps = {
  homeInfo: HomePageInfo;
};

export const HeroSection = ({ homeInfo }: HomeSectionProps) => {
  const handleContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full lg:min-h-screen bg-page-bg bg-no-repeat bg-center bg-cover relative flex flex-col justify-center pt-36 pb-12 lg:pt-32 lg:pb-16">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gray-100/50 to-transparent blur-[80px] mix-blend-soft-light opacity-60" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gray-200/40 to-transparent blur-[100px] rounded-full pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container flex flex-col items-start justify-between h-full relative z-10">
        {/* Header / Name Section */}
        <div className="relative z-10 w-full">
          <div className="relative flex flex-col items-center sm:items-start w-full">
            <div className="relative">
              <motion.h1
                className="font-sans font-extrabold text-[18vw] sm:text-9xl md:text-[10rem] lg:text-[14rem] xl:text-[16rem] leading-[0.8] text-primary tracking-tighter relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Luiz
              </motion.h1>

              {/* Avatar - Positioned on the 'Z' */}
              <motion.div
                className="absolute -top-6 -right-6 sm:-top-4 sm:-right-16 lg:top-0 lg:-right-20 z-20 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl bg-gray-200"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Image
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  src={homeInfo.profilePicture.url}
                  alt="Luiz Eduardo Vedoato"
                />
              </motion.div>
            </div>

            <motion.h1
              className="font-serif italic text-[18vw] sm:text-9xl md:text-[10rem] lg:text-[14rem] xl:text-[16rem] leading-[0.8] text-primary -mt-[2vw] sm:-mt-4 md:-mt-8 lg:-mt-12 relative z-10 ml-0 sm:ml-[5vw]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Vedoato.
            </motion.h1>
          </div>
        </div>

        {/* Content Grid - Footer Alignment */}
        <div className="flex flex-col lg:flex-row justify-between items-start mt-20 lg:mt-10 relative z-20 w-full gap-12 lg:gap-0">

          {/* Left: Socials */}
          <div className="flex gap-4">
            {homeInfo.socials.map((contact, i) => (
              <a
                href={contact.url}
                key={`contact-${i}`}
                target="_blank"
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-300 text-gray-600"
              >
                <CMSIcon key={contact.iconSvg} icon={contact.iconSvg} />
              </a>
            ))}
          </div>

          {/* Right: Intro & CTA */}
          <div className="flex flex-col gap-6 sm:gap-8 items-start lg:items-end text-left lg:text-right max-w-xl w-full lg:w-auto">
            <div className="text-text-secondary text-base sm:text-lg sm:text-xl leading-relaxed">
              <RichText content={homeInfo.introduction.raw} />
            </div>

            <Button className="w-full sm:w-max bg-black text-white hover:bg-gray-800 rounded-lg px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all mt-6 lg:mt-24" onClick={handleContact}>
              Contact me
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};
// 'use client';

// import { techBadgeAnimation } from "@/app/lib/animation";
// import { TechBadge } from "@/app/components/tech-badge";
// import { Button } from "@/app/components/button";
// import Image from "next/image";
// import { HiArrowNarrowRight } from 'react-icons/hi';
// import { motion } from 'framer-motion';
// import { HomePageInfo } from "@/app/types/page-info";
// import { RichText } from "@/app/components/rich-text";
// import { CMSIcon } from "@/app/components/cms-icon";

// type HomeSectionProps = {
//   homeInfo: HomePageInfo;
// };

// export const HeroSection = ({ homeInfo }: HomeSectionProps) => {
//   const handleContact = () => {
//     const contactSection = document.querySelector('#contact');
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="w-full lg:h-[755px] flex flex-col justify-end pb-10 sm:pb-32 py-40 lg:pb-[110px]">
//       <div className="container flex items-start justify-between flex-col-reverse lg:flex-row">
//         <motion.div
//           className="w-full lg:max-w-[530px]"
//           initial={{ opacity: 0, x: -100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -100 }}
//           transition={{ duration: 0.5 }}
//         >
//           <p className="font-mono text-[#d1bcff]">Hi, I'm</p>
//           <h2 className="text-4xl font-medium mt-2 text-[#ffffff]">
//             Luiz Eduardo Vedoato <span>👋🏼</span>
//           </h2>

//           <div className="text-[#fff1f1] my-6 text-sm sm:text-base">
//             <RichText content={homeInfo.introduction.raw} />
//           </div>

//           <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[340px]">
//             {homeInfo.technologies.map((tech, i) => (
//               <TechBadge
//                 name={tech.name}
//                 key={tech.name}
//                 {...techBadgeAnimation}
//                 transition={{ duration: 0.2, delay: i * 0.1 }}
//               />
//             ))}
//           </div>

//           <div className="mt-6 lg:mt-10 flex sm:items-center sm:gap-5 flex-col sm:flex-row">
//             <Button className="w-max" onClick={handleContact}>
//               GET IN TOUCH
//               <HiArrowNarrowRight size={18} />
//             </Button>

//             <div className="text-2xl text-[#ffffff] flex items-center h-20">
//               {homeInfo.socials.map((contact, i) => (
//                 <a
//                   href={contact.url}
//                   key={`contact-${i}`}
//                   target="_blank"
//                   className="hover:text-[#64558e] transition-colors px-0.5"
//                 >
//                   <CMSIcon key={contact.iconSvg} icon={contact.iconSvg} />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         <Image
//           width={420}
//           height={404}
//           src={homeInfo.profilePicture.url}
//           alt="Foto"
//           className="w-[300px] h-[300px] lg:w-[420px] lg:h-[404px] mb-6 lg:mb-0 shadow-2xl rounded-lg object-cover"
//         />
//       </div>
//     </section>
//   );
// };