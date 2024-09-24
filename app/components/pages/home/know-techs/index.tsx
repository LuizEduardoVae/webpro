'use client'

import { SectionTitle } from "@/app/components/section-title"
import { KnowTech } from "./know-tech"
import { motion } from 'framer-motion'
import { KnowTech as IKnowTech } from "@/app/types/projects";

type knownTechsProps = {
    techs: IKnowTech[]
}

export const KnowTechs = ({ techs }: knownTechsProps) => {
    return (
        <section className="container py-16">
            <SectionTitle subtitle="Skills" title="Technical Knowledge"/>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3 mt-[60px]">
                {techs?.map((tech) => (
                         <KnowTech key={tech.name} tech={tech}/>
                ))}
            </div>
        </section>
    )
}