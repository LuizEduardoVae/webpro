'use client';
import { TechBadge } from '@/app/components/tech-badge';
import { differenceInMonths, differenceInYears, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CollegeExperience } from '@/app/types/college-experience';
import { RichText } from '@/app/components/rich-text';
import { fadeUpAnimation } from "@/app/lib/animation";

type ExperienceCollegeItemProps = {
    college: CollegeExperience;
};

export const CourseExperienceItem = ({ college }: ExperienceCollegeItemProps) => {
    const {
        endDate,
        collegeName,
        collegeLogo,
        collegeUrl,
        description,
        role,
    } = college;

    const startDate = new Date(college.startDate);

    const formattedStartDate = format(startDate, 'MMM yyyy', { locale: ptBR });
    const formattedEndDate = endDate
        ? format(new Date(endDate), 'MMM yyyy', { locale: ptBR })
        : 'O momento';

    const end = endDate ? new Date(endDate) : new Date();

    const months = differenceInMonths(end, startDate);
    const years = differenceInYears(end, startDate);
    const monthsRemaining = months % 12;

    const formattedDuration =
        years > 0
            ? `${years} year${years > 1 ? 's' : ''}${monthsRemaining > 0
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
            <div className="flex flex-col items-center gap-4">
                <div className="rounded-full border border-gray-700 p-0.5">
                    <Image
                        src={collegeLogo.url}
                        alt={`Logo da empresa ${collegeName}`}
                        className="rounded-full"
                        width={40}
                        height={40}
                    />
                </div>

                <div className="h-full w-[1px] bg-gray-700"></div>
            </div>

            <div>
                <div className="flex flex-col gap-2 text-sm sm:text-base">
                    <a
                        href={collegeUrl}
                        target="_blank"
                        className="text-text-primary hover:text-primary transition-colors"
                        rel="noreferrer"
                    >
                        @{collegeName}
                    </a>
                    <h4 className="text-text-primary">{role}</h4>
                    <span className="text-text-secondary">
                        {formattedStartDate} • {formattedEndDate} • ({formattedDuration})
                    </span>
                    <div className="text-text-secondary">
                        <RichText content={description.raw} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};



// 'use client';
// import { TechBadge } from '@/app/components/tech-badge';
// import { differenceInMonths, differenceInYears, format } from 'date-fns';
// import { ptBR } from 'date-fns/locale';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { CollegeExperience } from '@/app/types/college-experience';
// import { RichText } from '@/app/components/rich-text';
// import { fadeUpAnimation } from "@/app/lib/animation";

// type ExperienceCollegeItemProps = {
//     college: CollegeExperience;
// };

// export const CourseExperienceItem = ({ college }: ExperienceCollegeItemProps) => {
//     const {
//         endDate,
//         collegeName,
//         collegeLogo,
//         collegeUrl,
//         description,
//         role,
//     } = college;

//     const startDate = new Date(college.startDate);

//     const formattedStartDate = format(startDate, 'MMM yyyy', { locale: ptBR });
//     const formattedEndDate = endDate
//         ? format(new Date(endDate), 'MMM yyyy', { locale: ptBR })
//         : 'O momento';

//     const end = endDate ? new Date(endDate) : new Date();

//     const months = differenceInMonths(end, startDate);
//     const years = differenceInYears(end, startDate);
//     const monthsRemaining = months % 12;

//     const formattedDuration =
//         years > 0
//             ? `${years} year${years > 1 ? 's' : ''}${
//                   monthsRemaining > 0
//                       ? ` e ${monthsRemaining} month${monthsRemaining > 1 ? 's' : ''}`
//                       : ''
//               }`
//             : `${months} month${months > 1 ? 's' : ''}`;

//     return (
//         <motion.div
//             className="grid grid-cols-[40px,1fr] gap-4 md:gap-10"
//             {...fadeUpAnimation}
//             transition={{ duration: 0.5 }}
//         >
//             <div className="flex flex-col items-center gap-4">
//                 <div className="rounded-full border border-gray-700 p-0.5">
//                     <Image
//                         src={collegeLogo.url}
//                         alt={`Logo da empresa ${collegeName}`}
//                         className="rounded-full"
//                         width={40}
//                         height={40}
//                     />
//                 </div>

//                 <div className="h-full w-[1px] bg-gray-600"></div>
//             </div>

//             <div>
//                 <div className="flex flex-col gap-2 text-sm sm:text-base">
//                     <a
//                         href={collegeUrl}
//                         target="_blank"
//                         className="text-[#b0b0b0] hover:text-[#d1bcff] transition-colors"
//                         rel="noreferrer"
//                     >
//                         @{collegeName}
//                     </a>
//                     <h4 className="text-gray-100">{role}</h4>
//                     <span className="text-gray-400">
//                         {formattedStartDate} • {formattedEndDate} • ({formattedDuration})
//                     </span>
//                     <div className="text-gray-400">
//                         <RichText content={description.raw} />
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };