'use client'

import { HiArrowNarrowRight } from "react-icons/hi";
import { Button } from "../button";
import { SectionTitle } from "../section-title";
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
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
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
    <section id="contact" className="py-16 px-6 md:py-32 flex items-center justify-center bg-zinc-900 text-zinc-100">
      <div className="w-full max-w-[480px] mx-auto bg-white text-zinc-900 rounded-xl shadow-lg p-8">
        <SectionTitle
          subtitle="Contact"
          title="Want to get in touch?"
          className="items-center text-center"
        />

        <form className="mt-8 w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Name"
            className="w-full h-14 bg-white rounded-lg placeholder:text-gray-500 text-zinc-900 p-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
            {...register('name')}
          />
          <input
            placeholder="Email"
            type="email"
            className="w-full h-14 bg-white rounded-lg placeholder:text-gray-500 text-zinc-900 p-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
            {...register('email')}
          />
          <textarea
            placeholder="Message"
            className="resize-none w-full h-[138px] bg-white rounded-lg placeholder:text-gray-500 text-zinc-900 p-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
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