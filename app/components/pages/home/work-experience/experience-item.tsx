'use client'

import { fadeUpAnimation, techBadgeAnimation } from "@/app/lib/animation"; 
import { TechBadge } from '@/app/components/tech-badge';
import { differenceInMonths, differenceInYears, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WorkExperience } from '@/app/types/work-experience';
import { RichText } from '@/app/components/rich-text';

type ExperienceItemProps = {
  experience: WorkExperience;
};

export const ExperienceItem = ({ experience }: ExperienceItemProps) => {
  const {
    endDate,
    companyName,
    companyLogo,
    companyUrl,
    description,
    role,
    technologies,
  } = experience;

  const startDate = new Date(experience.startDate);

  const formattedStartDate = format(startDate, 'MMM yyyy', { locale: ptBR });
  const formattedEndDate = endDate
    ? format(new Date(endDate), 'MMM yyyy', { locale: ptBR })
    : 'At Moment';

  const end = endDate ? new Date(endDate) : new Date();

  const months = differenceInMonths(end, startDate);
  const years = differenceInYears(end, startDate);
  const monthsRemaining = months % 12;

  const formattedDuration =
    years > 0
      ? `${years} year${years > 1 ? 's' : ''}${
          monthsRemaining > 0
            ? ` e ${monthsRemaining} month${monthsRemaining > 1 ? 's' : ''}`
            : ''
        }`
      : `${months} month${months > 1 ? 's' : ''}`;

  return (
    <motion.div
      className="grid grid-cols-[40px,1fr] gap-4 md:gap-10"
      {...fadeUpAnimation}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center flex-col gap-4">
        <div className="rounded-full border border-[#23abff] p-0.5">
          <Image
            src={companyLogo.url}
            width={70}
            height={70}
            className="rounded-full"
            alt={`Logo da empresa ${companyName}`}
          />
        </div>

        <div className="h-full w-[1px] bg-[#23abff]" />
      </div>

      <div>
        <div className="flex flex-col gap-2 text-sm sm:text-base">
          <a
            href={companyUrl}
            target="_blank"
            className="text-[#23abff] hover:underline transition-colors"
            rel="noreferrer"
          >
            @{companyName}
          </a>
          <h4 className="text-black">{role}</h4>
          <span className="text-gray-700">
            {formattedStartDate} • {formattedEndDate} • ({formattedDuration})
          </span>
          <div className="text-gray-800">
            {description?.raw && <RichText content={description.raw} />}
          </div>
        </div>

        <p className="text-[#23abff] text-sm mb-3 mt-6 font-semibold">
          Skills
        </p>
        <div className="flex gap-x-2 gap-y-3 flex-wrap lg:max-w-[350px] mb-8">
          {technologies.map((tech, i) => (
            <TechBadge
              name={tech.name}
              key={`experience-${companyName}-tech-${tech.name}`}
              {...techBadgeAnimation}
              transition={{ duration: 0.2, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};


// 'use client'
// import { fadeUpAnimation, techBadgeAnimation } from "@/app/lib/animation"; 
// import { TechBadge } from '@/app/components/tech-badge';
// import { differenceInMonths, differenceInYears, format } from 'date-fns';
// import { ptBR } from 'date-fns/locale';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { WorkExperience } from '@/app/types/work-experience';
// import { RichText } from '@/app/components/rich-text';

// type ExperienceItemProps = {
//   experience: WorkExperience;
// };

// export const ExperienceItem = ({ experience }: ExperienceItemProps) => {
//   const {
//     endDate,
//     companyName,
//     companyLogo,
//     companyUrl,
//     description,
//     role,
//     technologies,
//   } = experience;

//   const startDate = new Date(experience.startDate);

//   const formattedStartDate = format(startDate, 'MMM yyyy', { locale: ptBR });
//   const formattedEndDate = endDate
//     ? format(new Date(endDate), 'MMM yyyy', { locale: ptBR })
//     : 'At Moment';

//   const end = endDate ? new Date(endDate) : new Date();

//   const months = differenceInMonths(end, startDate);
//   const years = differenceInYears(end, startDate);
//   const monthsRemaining = months % 12;

//   const formattedDuration =
//     years > 0
//       ? `${years} year${years > 1 ? 's' : ''}${
//           monthsRemaining > 0
//             ? ` e ${monthsRemaining} month${monthsRemaining > 1 ? 's' : ''}`
//             : ''
//         }`
//       : `${months} month${months > 1 ? 's' : ''}`;

//   return (
//     <motion.div
//       className="grid grid-cols-[40px,1fr] gap-4 md:gap-10"
//       {...fadeUpAnimation}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex items-center flex-col gap-4">
//         <div className="rounded-full border border-[#ffffff] p-0.5">
//           <Image
//             src={companyLogo.url}
//             width={70}
//             height={70}
//             className="rounded-full"
//             alt={`Logo da empresa ${companyName}`}
//           />
//         </div>

//         <div className="h-full w-[1px] bg-[#3a3a3a]" />
//       </div>

//       <div>
//         <div className="flex flex-col gap-2 text-sm sm:text-base">
//           <a
//             href={companyUrl}
//             target="_blank"
//             className="bg-gradient-to-r from-[#ffffff] via-[#bba0f5] to-[#64558e] text-transparent bg-clip-text transition-colors hover:text-[#ffffff]"
//             rel="noreferrer"
//           >
//             @{companyName}
//           </a>
//           <h4 className="text-[#ffffff]">{role}</h4>
//           <span className="text-[#e8def7]">
//             {formattedStartDate} • {formattedEndDate} • ({formattedDuration})
//           </span>
//           <div className="text-white">
//             {description?.raw && <RichText content={description.raw} />}
//           </div>
//         </div>

//         <p className="text-[#b0b0b0] text-sm mb-3 mt-6 font-semibold">
//           Skills
//         </p>
//         <div className="flex gap-x-2 gap-y-3 flex-wrap lg:max-w-[350px] mb-8">
//           {technologies.map((tech, i) => (
//             <TechBadge
//               name={tech.name}
//               key={`experience-${companyName}-tech-${tech.name}`}
//               {...techBadgeAnimation}
//               transition={{ duration: 0.2, delay: i * 0.1 }}
//             />
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };