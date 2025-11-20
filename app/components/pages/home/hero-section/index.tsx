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
    <section className="w-full min-h-screen flex flex-col justify-center bg-page-bg relative overflow-hidden pt-32 pb-16">
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('/images/noise.png')] mix-blend-overlay" />

      {/* Gradient Spot */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-purple-900/20 to-transparent blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="container relative z-10 max-w-screen-xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-12"
        >
          {/* Header / Name Section */}
          <div className="relative z-10">
            <div className="relative inline-block">
              <motion.h1
                className="font-sans font-extrabold text-[17vw] leading-[0.8] text-primary tracking-tighter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Luiz
              </motion.h1>

              <motion.h1
                className="font-serif italic text-[13vw] leading-[0.8] text-primary -mt-[2vw]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Vedoato.
              </motion.h1>

              {/* Profile & Callout */}
              <motion.div
                className="absolute top-[5%] right-[10%] sm:right-[15%] z-20 flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {/* Callout */}
                <div className="hidden sm:flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-sm border border-white/40">
                  <div className="flex items-end gap-[2px] h-4">
                    <span className="w-1 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-primary rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-3 bg-primary rounded-full animate-pulse delay-150" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Vamos resolver problemas e criar novos.</span>
                </div>

                {/* Avatar */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl relative">
                  <Image
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                    src={homeInfo.profilePicture.url}
                    alt="Luiz Eduardo Vedoato"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mt-12">

            {/* Left Column: Socials */}
            <div className="lg:col-span-5 flex gap-4">
              {homeInfo.socials.map((contact, i) => (
                <a
                  href={contact.url}
                  key={`contact-${i}`}
                  target="_blank"
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-300 text-gray-600"
                >
                  <CMSIcon key={contact.iconSvg} icon={contact.iconSvg} />
                </a>
              ))}
            </div>

            {/* Right Column: Intro & CTA */}
            <div className="lg:col-span-7 flex flex-col gap-8 items-start text-left">
              <div className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-xl">
                <RichText content={homeInfo.introduction.raw} />
              </div>

              <Button className="w-max bg-black text-white hover:bg-gray-800 rounded-2xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all" onClick={handleContact}>
                Entre em contato
              </Button>
            </div>

          </div>
        </motion.div>
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