'use client'

import { motion } from 'framer-motion';
import { ComponentProps } from 'react';

type TechBadgeProps = ComponentProps<typeof motion.span> & {
  name: string;
};

export const TechBadge = ({ name, ...props }: TechBadgeProps) => {
  return (
    <motion.span
      className="bg-[#f5f5f5] text-primary border border-gray-200 text-sm py-2 px-4 rounded-full font-medium hover:bg-gray-200 transition-colors"
      {...props}
    >
      {name}
    </motion.span>
  );
};



// 'use client'

// import { motion } from 'framer-motion';
// import { ComponentProps } from 'react';

// type TechBadgeProps = ComponentProps<typeof motion.span> & {
//   name: string;
// };

// export const TechBadge = ({ name, ...props }: TechBadgeProps) => {
//   return (
//     <motion.span
//       className="bg-zinc-800 text-sm py-1 px-3 rounded-lg"
//       {...props}
//     >
//       <span
//         className="bg-gradient-to-r from-[#ffffff] via-[#d1bcff] to-[#64558e] text-transparent bg-clip-text"
//       >
//         {name}
//       </span>
//     </motion.span>
//   );
// };