'use client'

import { motion } from 'framer-motion';
import { ComponentProps } from 'react';

type TechBadgeProps = ComponentProps<typeof motion.span> & {
  name: string;
};

export const TechBadge = ({ name, ...props }: TechBadgeProps) => {
  return (
    <motion.span
      className="bg-zinc-800 text-sm py-1 px-3 rounded-lg"
      {...props}
    >
      <span
        className="bg-gradient-to-r from-[#ffffff] via-[#d1bcff] to-[#64558e] text-transparent bg-clip-text"
      >
        {name}
      </span>
    </motion.span>
  );
};