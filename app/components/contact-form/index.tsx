'use client'

import { HiArrowNarrowRight } from "react-icons/hi";
import { Button } from "../button";
import { SectionTitle } from "../section-title";
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";

const contactFormSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    message: z.string().min(1).max(500)
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactForm = () => {
    const { handleSubmit, register, reset, formState: { isSubmitting } } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema)
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            await axios.post('/api/contact', data);
            toast.success('Message sent successfully!');
            reset();
        } catch {
            toast.error('An error occurred while sending the message!');
        }
    };

    return (
        <section id="contact" className="py-16 px-6 md:py-32 flex items-center justify-center">
            <div className="w-full max-w-[420px] mx-auto">
                <SectionTitle
                    subtitle="Contact"
                    title="Want to get in touch?"
                    className="items-center text-center"
                />

                <form className="mt-12 w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder="Name"
                        className="w-full h-14 bg-white rounded-lg placeholder:text-gray-400 text-gray-100 p-4 focus:outline-none focus:ring-2 focus:ring-[#23abff]"
                        {...register('name')}
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        className="w-full h-14 bg-white rounded-lg placeholder:text-gray-400 text-gray-100 p-4 focus:outline-none focus:ring-2 focus:ring-[#23abff]"
                        {...register('email')}
                    />
                    <textarea
                        placeholder="Message"
                        className="resize-none w-full h-[138px] bg-white rounded-lg placeholder:text-gray-400 text-gray-100 p-4 focus:outline-none focus:ring-2 focus:ring-[#23abff]"
                        maxLength={500}
                        {...register('message')}
                    />

                    <Button className="w-max mx-auto mt-6 disabled:opacity-50">
                        Send Message
                        <HiArrowNarrowRight size={18} />
                    </Button>
                </form>
            </div>
        </section>
    );
};