import { RichTextContent } from "@graphcms/rich-text-types"


export type CollegeExperience = {
    collegeLogo: {
        url: string
    }
    role: string
    collegeName: string
    collegeUrl: string
    startDate: string
    endDate: string
    description: {
        raw: RichTextContent
    }

}