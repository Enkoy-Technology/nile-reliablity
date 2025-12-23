'use client';

import texts from '@/data/texts.json';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const AuditForm: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = texts.auditForm.errors.nameRequired;
    }
    if (!formData.company.trim()) {
      newErrors.company = texts.auditForm.errors.companyRequired;
    }
    if (!formData.email.trim()) {
      newErrors.email = texts.auditForm.errors.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = texts.auditForm.errors.emailInvalid;
    }
    if (!formData.message.trim()) {
      newErrors.message = texts.auditForm.errors.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = texts.auditForm.errors.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus('submitting');

    try {
      // EmailJS configuration - get these from your EmailJS dashboard
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS is not configured. Please check environment variables.');
      }

      // Prepare template parameters
      const timestamp = new Date().toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        message: formData.message,
        time: timestamp,
        to_email: 'getbet04@gmail.com',
        subject: `New Plant Audit Request from ${formData.name} - ${formData.company}`,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', response);
      setFormStatus('success');
      setFormData({ name: '', company: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,

      },
    },
  };

  return (
    <motion.section
      id="audit"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-700 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-4 px-4"
          >
            {texts.auditForm.title.main} <span className="font-semibold italic">{texts.auditForm.title.highlighted}</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8,  delay: 0.2 }}
            className="h-0.5 bg-white mx-auto mb-4 sm:mb-6 overflow-hidden"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg font-light max-w-2xl mx-auto px-4"
          >
            {texts.auditForm.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16"
        >
          {/* Left: Persuasive Copy */}
          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-light leading-tight">
                {texts.auditForm.leftSection.heading.line1} <br className="hidden sm:block"/>
                {texts.auditForm.leftSection.heading.line2}
              </h3>
              <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
                {texts.auditForm.leftSection.description}
            </p>
            </div>

            <div className="space-y-4 pt-6 sm:pt-8 border-t border-slate-800">
              <div className="flex items-center gap-3 sm:gap-4 group">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors flex-shrink-0">
                  <Mail className="text-slate-400 group-hover:text-white transition-colors" size={20} />
              </div>
                <a
                  href={`mailto:${texts.auditForm.leftSection.email}`}
                  className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base break-all"
                >
                  {texts.auditForm.leftSection.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: The Form */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-white text-slate-900 p-6 sm:p-8 lg:p-10 shadow-2xl rounded-lg hover:shadow-3xl transition-shadow duration-300 order-1 lg:order-2"
          >
            {formStatus === 'success' ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{texts.auditForm.success.title}</h3>
                <p className="text-slate-500 mb-6">{texts.auditForm.success.message}</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="text-xs font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  {texts.auditForm.success.button}
                </button>
              </div>
            ) : formStatus === 'error' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">⚠️</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-red-600">{texts.auditForm.error.title}</h3>
                <p className="text-slate-500 mb-6">{texts.auditForm.error.message}</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="text-xs font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  {texts.auditForm.error.button}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="animate-fade-in-up">
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2"
                  >
                    {texts.auditForm.form.labels.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    className={`w-full bg-slate-50 border-2 p-4 text-slate-900 focus:outline-none transition-all rounded-sm ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                    }`}
                    placeholder={texts.auditForm.form.placeholders.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 animate-slide-down">{errors.name}</p>
                  )}
                </div>

                <div className="animate-fade-in-up-delay">
                  <label
                    htmlFor="company"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2"
                  >
                    {texts.auditForm.form.labels.company}
                  </label>
                  <input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    type="text"
                    className={`w-full bg-slate-50 border-2 p-4 text-slate-900 focus:outline-none transition-all rounded-sm ${
                      errors.company
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                    }`}
                    placeholder={texts.auditForm.form.placeholders.company}
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-500 animate-slide-down">{errors.company}</p>
                  )}
                </div>

                <div className="animate-fade-in-up-delay-2">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2"
                  >
                    {texts.auditForm.form.labels.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    className={`w-full bg-slate-50 border-2 p-4 text-slate-900 focus:outline-none transition-all rounded-sm ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                    }`}
                    placeholder={texts.auditForm.form.placeholders.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 animate-slide-down">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2"
                  >
                    {texts.auditForm.form.labels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full bg-slate-50 border-2 p-4 text-slate-900 focus:outline-none transition-all resize-none rounded-sm ${
                      errors.message
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                    }`}
                    placeholder={texts.auditForm.form.placeholders.message}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 animate-slide-down">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-slate-900 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {texts.auditForm.form.button.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {texts.auditForm.form.button.submit}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AuditForm;

