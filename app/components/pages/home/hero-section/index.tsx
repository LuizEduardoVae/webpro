'use client'

import { techBadgeAnimation } from "@/app/lib/animation";

import { TechBadge } from "@/app/components/tech-badge";
import { Button } from "@/app/components/button";
import Image from "next/image";
import {HiArrowNarrowRight} from 'react-icons/hi'

import { motion } from 'framer-motion'
import { HomePageInfo } from "@/app/types/page-info";
import { RichText } from "@/app/components/rich-text";
import { CMSIcon } from "@/app/components/cms-icon";


type HomeSectionProps ={
    homeInfo: HomePageInfo
}

export const HeroSection = ({homeInfo }: HomeSectionProps) => {
    const handleContact = () => {
        const contactSection = document.querySelector('#contact');
        if(contactSection){
            contactSection.scrollIntoView({behavior: "smooth" })
        }
    }
    return(
        <section className="w-full lg:h-[755px] bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col justify-end pb-10 sm:pb-32 py-40 lg:pb-[110px] ">
            <div className="container flex items-start justify-between flex-col-reverse lg:flex-row ">
                <motion.div className="w-full lg:max-w-[530px]" initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}>

                    <p className="font-mono text-blue-400">Hi, I'm</p>
                    <h2 className="text-4xl font-medium mt-2">Luiz Eduardo Vedoato <span>👋🏼</span></h2>

                    <div className="text-gray-700 my-6 text-sm sm:text-base"><RichText content={homeInfo.introduction.raw}/></div>
                     
                    <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[340px]">
                        {homeInfo.technologies.map((tech, i) => (
                        <TechBadge
                            name={tech.name}
                            key={tech.name}
                            {...techBadgeAnimation}
                            transition={{ duration: 0.2, delay: i * 0.1 }}
                        />
                        ))}
                    </div>

                    <div className="mt-6 lg:mt-10 flex sm:items-center sm:gap-5 flex-col sm:flex-row">
                        <Button className=" w-max " onClick={handleContact}>ENTRE EM CONTATO
                        <HiArrowNarrowRight
                        size={18}
                        />
                        </Button>

                        <div className=" text-2xl text-gray-950 flex items-center h-20"> 
                            {homeInfo.socials.map((contact, i) => (
                                <a href={contact.url}
                                key={`contact-${i}`}
                                target="_blank"
                                className="hover:text-blue-300 transition-colors px-0.5"
                                >
                                    <CMSIcon key={contact.iconSvg} icon={contact.iconSvg}/>
                                </a>
                            ))}

                        </div>

                    </div>
                </motion.div>

                <Image
                    width={420}
                    height={404}
                    src={homeInfo.profilePicture.url}
                    alt="Foto"
                    className="w-[300px] h-[300px] lg:w-[420px] lg:h-[404px] mb-6 lg:mb-0 shadow-2xl rounded-lg object-cover "
                />
            </div>
        </section>
    )
}