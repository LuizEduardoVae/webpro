// import { Link } from "@/app/components/link";
// import { SectionTitle } from "@/app/components/section-title";
// import { HiArrowNarrowLeft } from "react-icons/hi";

// export const PageIntroduction = () => {
//   return (
//     <section className="w-full h-[450px] lg:h-[630px] flex flex-col items-center justify-center px-2">
//       <SectionTitle
//         subtitle="Projects"
//         title="My Projects"
//         className="text-center items-center [&>h3]:text-4xl"
//       />

//       <div className="flex flex-col items-center">
//         <p className="text-white text-center max-w-[640px] my-6 text-sm sm:text-base">
//           Welcome to my project portfolio, where I showcase a collection of my
//           work in machine learning, artificial intelligence, data science, and
//           related fields.
//         </p>
//         <Link href="/" className="text-[#d1bcff] hover:text-[#ffffff] transition-colors">
//           <HiArrowNarrowLeft size={20} />
//           Back to Home
//         </Link>
//       </div>
//     </section>
//   );
// };



import { Link } from "@/app/components/link";
import { SectionTitle } from "@/app/components/section-title";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { motion } from "framer-motion";

export const PageIntroduction = () => {
  return (
    <section className="w-full py-20 lg:py-32 flex flex-col items-center justify-center px-2">
      <SectionTitle
        subtitle="Projects"
        title="My Projects"
        className="text-center items-center [&>h3]:text-4xl"
      />

      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-700 text-center max-w-[640px] my-6 text-sm sm:text-base">
          Welcome to my project portfolio, where I showcase a collection of my
          work in machine learning, artificial intelligence, data science, and
          related fields.
        </p>
        <Link
          href="/"
          className="text-gray-500 hover:text-black transition-colors flex items-center gap-2"
        >
          <HiArrowNarrowLeft size={20} />
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
};