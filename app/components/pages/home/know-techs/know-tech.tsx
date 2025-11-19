import { CMSIcon } from "@/app/components/cms-icon";
import { KnowTech as IKnowTech } from "@/app/types/projects";
import { getRelativeTimeString } from "@/app/utils/get-relative-time";

type KnowTechProps = {
  tech: IKnowTech;
};

export const KnowTech = ({ tech }: KnowTechProps) => {
  const relativeTime = getRelativeTimeString(new Date(tech.startDate), 'en-US').replace('ago', '');

  return (
    <div className="p-6 rounded-lg bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg flex flex-col gap-4 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <p className="font-serif font-medium text-lg text-primary group-hover:text-secondary transition-colors">
          {tech.name}
        </p>
        <div className="text-3xl text-gray-400 group-hover:text-secondary transition-colors">
          <CMSIcon icon={tech.iconSvg} />
        </div>
      </div>

      <span className="text-sm text-text-secondary font-mono">{relativeTime} of experience</span>
    </div>
  );
};



// import { CMSIcon } from "@/app/components/cms-icon";
// import { KnowTech as IKnowTech } from "@/app/types/projects";
// import { getRelativeTimeString } from "@/app/utils/get-relative-time";

// type KnowTechProps = {
//   tech: IKnowTech;
// };

// export const KnowTech = ({ tech }: KnowTechProps) => {
//   const relativeTime = getRelativeTimeString(new Date(tech.startDate), 'en-US').replace('ago', '');

//   return (
//     <div className="p-6 rounded-lg bg-zinc-800 text-[#c2c2c2] hover:text-[#d1bcff] hover:bg-[#4a4a4a] flex flex-col gap-2 transition-all">
//       <div className="flex items-center justify-between">
//         <p className="font-medium bg-gradient-to-r from-[#ffffff] via-[#d1bcff] to-[#64558e] text-transparent bg-clip-text">
//           {tech.name}
//         </p>
//         <CMSIcon icon={tech.iconSvg} />
//       </div>

//       <span>{relativeTime} of experience</span>
//     </div>
//   );
// };