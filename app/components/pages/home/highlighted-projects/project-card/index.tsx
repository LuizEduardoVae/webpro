'use client'

import { Link } from "@/app/components/link";
import { TechBadge } from "@/app/components/tech-badge";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion } from 'framer-motion';
import { fadeUpAnimation } from "@/app/lib/animation";
import { Project } from "@/app/types/projects";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      className="flex gap-6 lg:gap-12 flex-col lg:flex-row group"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full h-[200px] sm:h-[300px] lg:w-[500px] lg:h-[350px] flex-shrink-0 overflow-hidden rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.5 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Image
          src={project.thumbnail.url}
          width={500}
          height={350}
          alt={`Thumbnail do projeto ${project.title}`}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      <div className="flex flex-col justify-center">
        <motion.h3
          className="flex items-center gap-3 font-serif font-medium text-3xl text-text-primary mb-4"
          {...fadeUpAnimation}
          transition={{ duration: 0.7 }}
        >
          {project.title}
        </motion.h3>

        <motion.p className="text-text-secondary text-lg mb-8 leading-relaxed">
          {project.shortDescription}
        </motion.p>

        <div className="flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px]">
          {project.technologies.map((tech) => (
            <TechBadge key={`${project.title}-tech-${tech.name}`} name={tech.name} />
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="text-primary font-medium hover:text-secondary transition-colors flex items-center gap-2 text-lg"
        >
          Go to Project
          <HiArrowNarrowRight size={24} />
        </Link>
      </div>
    </motion.div>
  );
};



// 'use client'

// import { Link } from "@/app/components/link";
// import { TechBadge } from "@/app/components/tech-badge";
// import Image from "next/image";
// import { HiArrowNarrowRight } from "react-icons/hi";
// import { motion } from 'framer-motion';
// import { fadeUpAnimation } from "@/app/lib/animation";
// import { Project } from "@/app/types/projects";

// type ProjectCardProps = {
//   project: Project;
// };

// export const ProjectCard = ({ project }: ProjectCardProps) => {
//   return (
//     <motion.div
//       className="flex gap-6 lg:gap-12 flex-col lg:flex-row"
//       initial={{ opacity: 0, y: 100 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 100 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         className="w-full h-[200px] sm:h-[300px] lg:w-[420px] lg:h-[420px] flex-shrink-0 overflow-hidden rounded-lg" // Ajuste com flex-shrink-0
//         initial={{ opacity: 0, y: 100, scale: 0.5 }}
//         whileInView={{ opacity: 1, y: 0, scale: 1 }}
//         exit={{ opacity: 0, y: 100, scale: 0.5 }}
//         transition={{ duration: 0.3, delay: 0.3 }}
//       >
//         <Image
//           src={project.thumbnail.url}
//           width={420} // Tamanho ajustado para 420px
//           height={420} // Tamanho ajustado para 420px
//           alt={`Thumbnail do projeto ${project.title}`}
//           className="object-cover w-full h-full"
//         />
//       </motion.div>

//       <div>
//         <motion.h3
//           className="flex items-center gap-3 font-medium text-lg bg-gradient-to-r from-[#ffffff] via-[#d1bcff] to-[#64558e] text-transparent bg-clip-text"
//           {...fadeUpAnimation}
//           transition={{ duration: 0.7 }}
//         >
//           {project.title}
//         </motion.h3>
//         <motion.p className="text-gray-100 my-6">
//           {project.shortDescription}
//         </motion.p>
//         <div className="flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px]">
//           {project.technologies.map((tech) => (
//             <TechBadge key={`${project.title}-tech-${tech.name}`} name={tech.name} />
//           ))}
//         </div>

//         <Link href={`/projects/${project.slug}`} className="text-[#d1bcff] hover:text-[#ffffff] transition-colors">
//           Go to Project
//           <HiArrowNarrowRight />
//         </Link>
//       </div>
//     </motion.div>
//   );
// };


// // testea
// //testexzXdsadasd
// //testdasdk kknj dasdascacaxdd