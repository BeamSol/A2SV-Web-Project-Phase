import React, { useEffect, useState } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import '../css/ContactForm.css';
import { DevTool } from '@hookform/devtools';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
        name: '',
        email: '',
        message: '',
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  const onError = (errors: FieldErrors<FormData>) => {
    console.error('Form errors:', errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 10000);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="contact-wrapper">
      <form className="contact-form" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <h2>Contact Us</h2>

        <div className="form-field">
          <label htmlFor="name">Name <span>*</span></label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email <span>*</span></label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email is not valid',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="message">Message <span>*</span></label>
          <textarea
            id="message"
            rows={5}
            placeholder="Write your message..."
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <p className="error">{errors.message.message}</p>}
        </div>

        <button type="submit">Send Message</button>
        {showSuccess && <p className="success">Message sent successfully!</p>}
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default ContactForm;
