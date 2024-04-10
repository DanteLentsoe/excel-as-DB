'use client';

import { EmailSVG } from '@/icons';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { Button } from '../../atoms/Button';
import {
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import emailjs from '@emailjs/browser';
export type ContactInputBoxProps = {
  type: string;
  placeholder: string;
  name: string;
  register?: UseFormRegister<FieldValues> | any;
  required?: boolean;
  errors?: FieldErrors<FieldValues> | any;
};

export type ContactTextAreaProps = {
  row: string;
  placeholder: string;
  name: string;
  defaultValue: string;
  register?: UseFormRegister<FieldValues> | any;
  required?: boolean;
  errors?: FieldErrors<FieldValues> | any;
};
import { SiGoogleforms } from 'react-icons/si';
export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: Record<string, unknown> | undefined) => {
    emailjs
      .send(
        String(process.env?.EMAIL_JS_SERVICE_ID),
        String(process.env?.EMAIL_JS_TEMPLATE_ID),
        data,
        String(process.env?.EMAIL_JS_USER_ID)
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setIsLoading(false);
          setResponseMessage('Message sent successfully!');
        },
        (err) => {
          console.log('FAILED...', err);
          setIsLoading(false);
          setResponseMessage('Failed to send message. Please try again later.');
        }
      );
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden py-20 dark:bg-dark lg:py-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap lg:justify-between">
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-dark-6">
                  I value your feedback and are here to assist you. Whether you
                  have suggestions to improve Sheetwise, need help with using
                  the application, are interested in collaborating with us, or
                  want to report a bug, we&apos;re eager to hear from you. You
                  can easily reach out to me through my Google Form for
                  structured feedback and bug reports, or feel free to email me
                  directly at
                  <Link
                    href={'mailto:dllentsoe@gmail'}
                    className="text-emerald-600"
                  >
                    {' dllentsoe@gmail '}
                  </Link>
                  for any inquiries or work proposals. Let&apos;s work together
                  to make Sheetwise even better!
                </p>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                    <SiGoogleforms size={30} />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Report Bug/Feedback
                    </h4>
                    <Link
                      href={'https://forms.gle/hRi8EKtjGX8AZW127'}
                      className="text-base text-body-color dark:text-dark-6"
                    >
                      Google Form
                    </Link>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                    <EmailSVG />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Email Address
                    </h4>
                    <Link
                      href={'mailto:dllentsoe@gmail.com'}
                      className="text-base text-body-color dark:text-dark-6"
                    >
                      dllentsoe@gmail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              {responseMessage && (
                <div
                  className={`mt-4 text-center ${
                    responseMessage.startsWith('Failed')
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {responseMessage}
                </div>
              )}
              <div className="relative rounded-lg  p-8 shadow-lg border border-gray-800 bg-black shadow-input sm:p-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ContactInputBox
                    register={register}
                    type="text"
                    name="from_name"
                    placeholder="Your Name"
                    errors={errors}
                    required
                  />
                  <ContactInputBox
                    register={register}
                    type="text"
                    name="user_email"
                    placeholder="Your Email"
                    errors={errors}
                    required
                  />
                  <ContactInputBox
                    register={register}
                    type="text"
                    name="phone"
                    placeholder="Your Phone"
                    errors={errors}
                    required
                  />
                  <ContactTextArea
                    register={register}
                    row="6"
                    placeholder="Your Message"
                    name="message"
                    defaultValue=""
                    errors={errors}
                    required
                  />
                  <div>
                    <Button
                      variant={'shimmer'}
                      disabled={isLoading}
                      type="submit"
                      className="w-full rounded border p-3 transition"
                    >
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ContactTextArea: FC<ContactTextAreaProps> = ({
  row,
  placeholder,
  name,
  defaultValue,
  required,
  register,
  errors,
}) => {
  return (
    <>
      <div className="mb-6">
        <textarea
          {...register(name, { required })}
          rows={Number(row)}
          placeholder={placeholder}
          name={name}
          className="w-full resize-none rounded border bg-gray-800 text-white border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
          defaultValue={defaultValue}
        />
        {errors[name] && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
    </>
  );
};

const ContactInputBox: FC<ContactInputBoxProps> = ({
  type,
  placeholder,
  name,
  register,
  required,
  errors,
}) => {
  return (
    <>
      <div className="mb-6">
        <input
          type={type}
          {...register(name, { required })}
          placeholder={placeholder}
          name={name}
          className="w-full bg-gray-800 text-white rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
        />
        {errors[name] && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
    </>
  );
};
