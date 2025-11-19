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
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-purple-gradient opacity-20 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-purple-gradient opacity-10 blur-[100px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header / Name Section */}
          <div className="relative mb-16">
            <h1 className="font-serif text-7xl sm:text-8xl lg:text-9xl font-medium text-primary tracking-tight leading-[0.9]">
              Luiz <br />
              <span className="italic">Eduardo</span> Vedoato.
            </h1>

            {/* Floating Profile Picture */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-4 right-4 lg:top-8 lg:right-20 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
            >
              <Image
                width={128}
                height={128}
                src={homeInfo.profilePicture.url}
                alt="Foto de Perfil"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Socials & Techs */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="flex gap-4 text-2xl text-primary">
                {homeInfo.socials.map((contact, i) => (
                  <a
                    href={contact.url}
                    key={`contact-${i}`}
                    target="_blank"
                    className="hover:text-secondary transition-colors p-2 bg-gray-50 rounded-full"
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

              <Button className="w-max bg-primary text-white hover:bg-gray-900 rounded-full px-8 py-4 text-lg" onClick={handleContact}>
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