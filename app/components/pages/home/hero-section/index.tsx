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
    <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-neutral-50 to-neutral-200 relative overflow-hidden pt-32 pb-16">
      {/* Depth Effect */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-gray-200 to-transparent opacity-40 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

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
                className="font-sans font-extrabold text-[12vw] leading-none text-primary tracking-tighter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Luiz
              </motion.h1>

              <motion.h1
                className="font-serif italic text-[11vw] leading-none text-primary -mt-[2vw] sm:-mt-[3vw]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Vedoato.
              </motion.h1>

              <motion.div
                className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden ring-4 ring-white shadow-xl z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
              >
                <Image
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  src={homeInfo.profilePicture.url}
                  alt="Luiz Eduardo Vedoato"
                />
              </motion.div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">

            {/* Left Column: Socials & Techs */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="flex items-center gap-4">
                {homeInfo.socials.map((contact, i) => (
                  <a
                    href={contact.url}
                    key={`contact-${i}`}
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-primary"
                  >
                    <CMSIcon key={contact.iconSvg} icon={contact.iconSvg} />
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {homeInfo.technologies.map((tech, i) => (
                  <TechBadge
                    name={tech.name}
                    key={tech.name}
                    {...techBadgeAnimation}
                    transition={{ duration: 0.2, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Intro & CTA */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl">
                <RichText content={homeInfo.introduction.raw} />
              </div>

              <Button className="w-max bg-primary text-white hover:bg-black rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all" onClick={handleContact}>
                Entre em contato
                <HiArrowNarrowRight size={20} />
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