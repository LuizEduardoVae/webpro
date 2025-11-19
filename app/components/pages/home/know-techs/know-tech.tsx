import { CMSIcon } from "@/app/components/cms-icon";
import { KnowTech as IKnowTech } from "@/app/types/projects";
import { getRelativeTimeString } from "@/app/utils/get-relative-time";

type KnowTechProps = {
  tech: IKnowTech;
};

export const KnowTech = ({ tech }: KnowTechProps) => {
  const relativeTime = getRelativeTimeString(new Date(tech.startDate), 'en-US').replace('ago', '');

  return (
    <div className="p-6 rounded-lg bg-page-gray text-text-secondary hover:text-primary hover:bg-gray-800 flex flex-col gap-2 transition-all border border-gray-800">
      <div className="flex items-center justify-between">
        <p className="font-medium text-text-primary">
          {tech.name}
        </p>
        <CMSIcon icon={tech.iconSvg} />
      </div>

      <span>{relativeTime} of experience</span>
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