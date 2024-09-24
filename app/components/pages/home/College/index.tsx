import { SectionTitle } from "@/app/components/section-title"
import { CourseExperienceItem } from "./college-item"

import { CollegeExperience as ICollegeExperience } from "@/app/types/college-experience"

type CollegeExperienceProps = {
    collegeexperiences: ICollegeExperience[]
}

export const CollegeExperience = ({collegeexperiences}: CollegeExperienceProps) => {
    return (
        <section className="container py-16  gap-10 md:gap-4  md:flex-row">
            <SectionTitle subtitle="Education" title="Academic Experiences"/>
            <div className="mt-[60px] flex flex-col gap-4 ">
                {collegeexperiences?.map(experience => (
                        <CourseExperienceItem 
                        key={experience.collegeName}
                        college={experience}
                        />
                    ))}

            </div>
        </section>
    )
}



