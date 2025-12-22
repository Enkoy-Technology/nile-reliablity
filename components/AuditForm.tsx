'use client';

import texts from '@/data/texts.json';
import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import React, { useState } from 'react';

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
      // Using FormSubmit - completely FREE, no API key needed!
      // It sends emails directly to the specified addresses
      const emailData = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        message: formData.message,
        _subject: texts.auditForm.email.subjectTemplate
          .replace('{name}', formData.name)
          .replace('{company}', formData.company),
        _captcha: false,
        _template: 'table', // Nice table format
        _replyto: formData.email, // Reply to the user's email
      };

      // Send to both email addresses simultaneously
      const emailPromises = [
        // fetch('https://formsubmit.co/ajax/getbet04@gmail.com', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //   },
        //   body: JSON.stringify(emailData),
        // }),
        fetch('https://formsubmit.co/ajax/biniyamcbm1@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(emailData),
        }),
      ];

      const responses = await Promise.all(emailPromises);

      // Check if emails were sent successfully
      const allSuccess = responses.every(response => response.ok);

      if (!allSuccess) {
        // If at least one succeeded, still show success
        const anySuccess = responses.some(response => response.ok);
        if (!anySuccess) {
          throw new Error('Failed to send email');
        }
      }

      setFormStatus('success');
      setFormData({ name: '', company: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
    }
  };

  return (
    <section id="audit" className="py-24 bg-slate-900 text-white relative overflow-hidden">
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
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-4 px-4">
            {texts.auditForm.title.main} <span className="font-semibold italic">{texts.auditForm.title.highlighted}</span>
          </h2>
          <div className="w-16 h-0.5 bg-white mx-auto mb-4 sm:mb-6"></div>
          <p className="text-slate-300 text-base sm:text-lg font-light max-w-2xl mx-auto px-4">
            {texts.auditForm.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Persuasive Copy */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-right order-2 lg:order-1">
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
          </div>

          {/* Right: The Form */}
          <div className="bg-white text-slate-900 p-6 sm:p-8 lg:p-10 shadow-2xl rounded-lg animate-fade-in-left hover:shadow-3xl transition-shadow duration-300 order-1 lg:order-2">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditForm;

