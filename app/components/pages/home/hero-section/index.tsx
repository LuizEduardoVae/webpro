'use client';

import { Button } from "@/app/components/button";
import Image from "next/image";
import { HiArrowNarrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { HomePageInfo } from "@/app/types/page-info";

type HomeSectionProps = {
  homeInfo: HomePageInfo;
};

export const HeroSection = ({ homeInfo }: HomeSectionProps) => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-page-bg relative overflow-hidden pt-24 lg:pt-0">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-orange-gradient opacity-80 blur-3xl pointer-events-none" />

      <div className="container flex items-center justify-between flex-col lg:flex-row gap-10 lg:gap-0 relative z-10">
        <motion.div
          className="w-full lg:max-w-[600px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-1.5 rounded-full mb-8">
            <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">01</span>
            <span className="text-primary font-medium text-sm">Purpose</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-text-primary leading-[1.1] mb-6 tracking-tight">
            Atlas: Where Code Meets Motion
          </h1>

          <p className="text-text-secondary text-lg lg:text-xl mb-10 max-w-[480px]">
            The humanoid companion that learns and adapts alongside you.
          </p>

          <Button className="w-max" onClick={() => { }}>
            Request Access
            <HiArrowNarrowRight size={20} />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full lg:w-[600px] h-[400px] lg:h-[600px]"
        >
          {/* Placeholder for the robot image - using a colored div if image not available, or the profile picture if appropriate, but the user wants the robot image. I'll use a placeholder div with style matching the image for now or the profile picture as fallback but styled differently. */}
          <div className="w-full h-full bg-black rounded-[3rem] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />
            {/* If the user provided an image, I would use it here. For now, I'll use the profile picture but styled to look like a card, or just a placeholder. 
                    Actually, I should try to use the image from the design if I could, but I can't generate it. 
                    I will use the profile picture as a placeholder but styled nicely.
                */}
            <Image
              src={homeInfo.profilePicture.url}
              alt="Atlas Robot"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
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