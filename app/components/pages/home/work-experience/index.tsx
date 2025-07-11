import { SectionTitle } from "@/app/components/section-title";
import { ExperienceItem } from "./experience-item";
import { WorkExperience as IWorkExperience } from "@/app/types/work-experience";

type WorkExperienceProps = {
  experiences: IWorkExperience[];
};

export const WorkExperience = ({ experiences }: WorkExperienceProps) => {
  const sortedExperiences = experiences.sort((a, b) => {
    if (!a.endDate && b.endDate) return -1;
    if (!b.endDate && a.endDate) return 1;
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });

  return (
    <section className="container py-16 flex gap-10 md:gap-4 lg:gap-16 flex-col md:flex-row">
      <div className="max-w-[420px]">
        <SectionTitle subtitle="Experiences" title="Work Experience" />
        <p className="text-black mt-6">
          I am always open to new challenges and exciting projects.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {sortedExperiences?.map((experience) => (
          <ExperienceItem key={experience.companyName} experience={experience} />
        ))}
      </div>
    </section>
  );
};


// import { SectionTitle } from "@/app/components/section-title";
// import { ExperienceItem } from "./experience-item";
// import { WorkExperience as IWorkExperience } from "@/app/types/work-experience";

// type WorkExperienceProps = {
//   experiences: IWorkExperience[];
// };

// export const WorkExperience = ({ experiences }: WorkExperienceProps) => {
//   // Ordenando as experiências: as que estão em andamento primeiro, depois as concluídas (mais recentes primeiro)
//   const sortedExperiences = experiences.sort((a, b) => {
//     // Se a experiência A está em andamento (não tem endDate) e B tem, A vem primeiro
//     if (!a.endDate && b.endDate) return -1;
//     // Se B está em andamento e A tem endDate, B vem primeiro
//     if (!b.endDate && a.endDate) return 1;
//     // Se ambas têm endDate, a mais recente vem primeiro
//     return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
//   });

//   return (
//     <section className="container py-16 flex gap-10 md:gap-4 lg:gap-16 flex-col md:flex-row">
//       <div className="max-w-[420px]">
//         <SectionTitle subtitle="Experiences" title="Work Experience" />
//         <p className="text-[#ffffff] mt-6">
//           I am always open to new challenges and exciting projects.
//         </p>
//       </div>

//       <div className="flex flex-col gap-4">
//         {sortedExperiences?.map((experience) => (
//           <ExperienceItem key={experience.companyName} experience={experience} />
//         ))}
//       </div>
//     </section>
//   );
// };