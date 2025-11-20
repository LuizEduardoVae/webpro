import { RichText as CMSRichText } from '@graphcms/rich-text-react-renderer'
import { ComponentProps } from 'react'

type RichTextProps = ComponentProps<typeof CMSRichText>

export const RichText = ({ ...props }: RichTextProps) => {
    return (
        <CMSRichText
            {...props}
            renderers={{
                bold: ({ children }) => (
                    <b className='text-black font-medium'>{children}</b>
                ),
                ul: ({ children }) => (
                    <ul className='list-disc list-inside pl-2 flex flex-col gap-1'>
                        {children}
                    </ul>
                ),
                a: ({ children, ...props }) => (
                    <a
                        {...props}
                        className='text-black underline decoration-black hover:text-gray-700 transition-colors'
                    >
                        {children}
                    </a>
                )
            }}
        />
    )
}




// import {RichText as CMSRichText } from '@graphcms/rich-text-react-renderer'
// import { ComponentProps } from 'react'

// type RichTextProps = ComponentProps<typeof CMSRichText>

// export const RichText = ({...props}: RichTextProps) => {
//     return(
//         <CMSRichText
//             {...props}
//             renderers={{
//                 bold: ({ children }) => (
//                     <b className='text-white font-medium'>{children}</b>
//                 ),
//                 ul:({ children }) => (
//                     <ul className='list-disc list-inside pl-2 flex flex-col gap-1'>
//                         { children }
//                     </ul>
//                 ),
//                 a: ({ children, ...props}) => (
//                     <a
//                         {...props}
//                         className='hover:text-[#d1bcff]  transition-colors underline'
//                     >
//                         {children}
//                     </a>
//                 )
//             }}
//         />

//     )
// }