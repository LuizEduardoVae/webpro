import { RichText as CMSRichText } from '@graphcms/rich-text-react-renderer'
import { ComponentProps } from 'react'

type RichTextProps = ComponentProps<typeof CMSRichText>

export const RichText = ({ ...props }: RichTextProps) => {
    return (
        <CMSRichText
            {...props}
            renderers={{
                h1: ({ children }) => <h1 className="text-3xl font-bold text-zinc-900 font-sans mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold text-zinc-900 font-sans mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold text-zinc-900 font-sans mt-6 mb-3">{children}</h3>,
                h4: ({ children }) => <h4 className="text-lg font-semibold text-zinc-900 font-sans mt-6 mb-3">{children}</h4>,
                h5: ({ children }) => <h5 className="text-base font-semibold text-zinc-900 font-sans mt-4 mb-2">{children}</h5>,
                h6: ({ children }) => <h6 className="text-sm font-semibold text-zinc-900 font-sans mt-4 mb-2">{children}</h6>,
                p: ({ children }) => <p className="text-zinc-600 font-sans mb-4 leading-relaxed">{children}</p>,
                bold: ({ children }) => (
                    <b className='text-zinc-900 font-semibold'>{children}</b>
                ),
                ul: ({ children }) => (
                    <ul className='list-disc list-inside pl-2 flex flex-col gap-1 mb-4 text-zinc-600'>
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className='list-decimal list-inside pl-2 flex flex-col gap-1 mb-4 text-zinc-600'>
                        {children}
                    </ol>
                ),
                li: ({ children }) => (
                    <li className="font-sans">{children}</li>
                ),
                a: ({ children, ...props }) => (
                    <a
                        {...props}
                        className='text-zinc-900 underline decoration-zinc-900/30 hover:decoration-zinc-900 transition-all font-medium'
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