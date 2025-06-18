import React, { useState, useEffect } from 'react';
import {
  Phone, MessageCircle, Mail, Send, ChevronDown, ChevronUp, Search,
  Instagram, Facebook, Twitter, Linkedin, Youtube,
  Clock, CheckCircle, AlertCircle, Loader2, Copy,
  Eye, Filter, Heart, TrendingUp, Star, Zap
} from 'lucide-react';
import {
  ContactSupportData, ContactFormSubmission,
  SocialMediaLink, FaqItem
} from '@/types';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Phone, MessageCircle, Mail, Send, ChevronDown, ChevronUp, Search,
  Instagram, Facebook, Twitter, Linkedin, Youtube,
  Clock, CheckCircle, AlertCircle, Loader2, Copy,
  Eye, Filter, Heart, TrendingUp, Star, Zap
};

const ContactSupport: React.FC = () => {
  const [data, setData] = useState<ContactSupportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Contact form state - simplified
  const [contactForm, setContactForm] = useState<ContactFormSubmission>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  // FAQ state - simplified
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [faqLoading, setFaqLoading] = useState(false);

  // UI state - simplified
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Fetch Contact & Support data
  useEffect(() => {
    const fetchContactSupportData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/contact-support');
        const result = await response.json();

        if (result.success) {
          setData(result.data);
          setFaqs(result.data.featured_faqs);
        } else {
          setError(result.message || 'Gagal memuat data.');
        }
      } catch (error) {
        console.error('Error fetching Contact & Support data:', error);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchContactSupportData();
  }, []);

  // Fetch FAQs based on filters
  useEffect(() => {
    const fetchFaqs = async () => {
      if (!data) return;
      
      try {
        setFaqLoading(true);
        const params = new URLSearchParams();
        
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
        
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }

        const response = await fetch(`/api/contact-support/faqs?${params}`);
        const result = await response.json();

        if (result.success) {
          setFaqs(result.data);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setFaqLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchFaqs, 300);
    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchQuery, data]);

  // Simplified form validation
  const validateForm = (): boolean => {
    const { name, email, subject, message } = contactForm;
    return !!(name.trim() && email.trim() && subject.trim() && message.trim() &&
           email.includes('@') && email.includes('.'));
  };

  // Get icon component by name
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  // Copy to clipboard function
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Get platform-specific colors and hover effects
  const getPlatformStyles = (platform: string) => {
    const styles = {
      instagram: {
        hover: 'hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:shadow-purple-500/25',
        icon: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white group-hover:scale-110 group-hover:rotate-6',
        border: 'group-hover:border-purple-400'
      },
      facebook: {
        hover: 'hover:bg-blue-600 hover:shadow-blue-500/25',
        icon: 'bg-blue-600 text-white group-hover:scale-110 group-hover:-rotate-3',
        border: 'group-hover:border-blue-400'
      },
      twitter: {
        hover: 'hover:bg-blue-400 hover:shadow-blue-400/25',
        icon: 'bg-blue-400 text-white group-hover:scale-110 group-hover:rotate-3',
        border: 'group-hover:border-blue-300'
      },
      linkedin: {
        hover: 'hover:bg-blue-700 hover:shadow-blue-700/25',
        icon: 'bg-blue-700 text-white group-hover:scale-110 group-hover:-rotate-2',
        border: 'group-hover:border-blue-500'
      },
      youtube: {
        hover: 'hover:bg-red-600 hover:shadow-red-500/25',
        icon: 'bg-red-600 text-white group-hover:scale-110 group-hover:rotate-2',
        border: 'group-hover:border-red-400'
      },
      tiktok: {
        hover: 'hover:bg-black hover:shadow-gray-800/25',
        icon: 'bg-black text-white group-hover:scale-110 group-hover:rotate-6',
        border: 'group-hover:border-gray-600'
      },
      whatsapp: {
        hover: 'hover:bg-green-500 hover:shadow-green-500/25',
        icon: 'bg-green-500 text-white group-hover:scale-110 group-hover:-rotate-3',
        border: 'group-hover:border-green-400'
      },
      telegram: {
        hover: 'hover:bg-blue-500 hover:shadow-blue-500/25',
        icon: 'bg-blue-500 text-white group-hover:scale-110 group-hover:rotate-3',
        border: 'group-hover:border-blue-400'
      },
    };
    return styles[platform.toLowerCase() as keyof typeof styles] || {
      hover: 'hover:bg-blue-600 hover:shadow-blue-500/25',
      icon: 'bg-blue-600 text-white group-hover:scale-110',
      border: 'group-hover:border-blue-400'
    };
  };

  // Handle contact form submission
  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setFormLoading(true);
      setFormErrors({});
      setFormSuccess(false);

      const response = await fetch('/api/contact-support/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json();

      if (result.success) {
        setFormSuccess(true);
        setContactForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        if (result.errors) {
          setFormErrors(result.errors);
        } else {
          setError(result.message || 'Gagal mengirim pesan.');
        }
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle FAQ expand/collapse
  const toggleFaq = async (faqId: string) => {
    if (expandedFaq === faqId) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(faqId);
      
      // Increment view count
      try {
        await fetch(`/api/contact-support/faqs/${faqId}/view`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Error incrementing FAQ view:', error);
      }
    }
  };

  // Handle form input changes with enhanced UX
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: []
      }));
    }
  };

  // Get field validation status
  const getFieldStatus = (fieldName: string) => {
    const value = contactForm[fieldName as keyof ContactFormSubmission] || '';
    const hasError = formErrors[fieldName]?.length > 0;
    const hasValue = value.trim().length > 0;

    if (hasError) return 'error';
    if (hasValue) return 'success';
    return 'default';
  };

  // Get field CSS classes
  const getFieldClasses = (fieldName: string) => {
    const status = getFieldStatus(fieldName);
    return `w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors ${
      status === 'error'
        ? 'border-red-500 focus:ring-red-500/20'
        : status === 'success'
        ? 'border-green-500 focus:ring-green-500/20'
        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
    }`;
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <div className="space-y-8">
              {/* Header skeleton */}
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mx-auto animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
              </div>

              {/* Content skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact form skeleton */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                  <div className="space-y-6">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Support info skeleton */}
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                    <div className="space-y-4">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-3">
                          <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse"></div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                            <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
                  <div className="flex gap-4">
                    <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="w-48 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="relative py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <p className="text-muted-foreground">{error || 'Data tidak tersedia'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Hubungi Kami
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Kami siap membantu Anda. Hubungi kami melalui formulir kontak atau ikuti media sosial kami
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 mr-2" />
              <span className="font-medium">Response time: &lt; 2 hours</span>
            </div>
            <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full">
              <Mail className="h-4 w-4 mr-2" />
              <span className="font-medium">Email Support Available</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {/* Contact Form */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center mb-2">
                <Mail className="h-6 w-6 text-blue-600 mr-3" />
                Kirim Pesan
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Isi formulir di bawah ini dan kami akan segera menghubungi Anda
              </p>
            </div>

            {formSuccess && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Pesan Berhasil Dikirim!</h4>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Tim kami akan segera menghubungi Anda dalam waktu kurang dari 2 jam.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleContactFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className={getFieldClasses('name')}
                    placeholder="Masukkan nama lengkap Anda"
                    required
                  />
                  {formErrors.name && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.name[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className={getFieldClasses('email')}
                    placeholder="Masukkan alamat email Anda"
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.email[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    className={getFieldClasses('phone')}
                    placeholder="Masukkan nomor telepon Anda"
                  />
                  {formErrors.phone && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.phone[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subjek *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className={getFieldClasses('subject')}
                    placeholder="Masukkan subjek pesan"
                    required
                  />
                  {formErrors.subject && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.subject[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`${getFieldClasses('message')} resize-none`}
                  placeholder="Tulis pesan Anda di sini..."
                  required
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {formErrors.message[0]}
                  </p>
                )}
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {contactForm.message.length}/2000 karakter
                </div>
              </div>

              <button
                type="submit"
                disabled={formLoading || !validateForm()}
                className={`w-full px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-base ${
                  formLoading || !validateForm()
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {formLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Mengirim Pesan...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Kirim Pesan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center mb-3">
                  <div className="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg mr-4 animate-pulse">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  Ikuti Kami
                  <span className="ml-3 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full font-medium animate-bounce">
                    Stay Connected
                  </span>
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Tetap terhubung dengan kami di media sosial
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {data.social_media.map((social) => {
                  const platformStyles = getPlatformStyles(social.platform_name);
                  return (
                    <a
                      key={social.id}
                      href={social.platform_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group hover:shadow-2xl hover:text-white hover:border-transparent transform hover:-translate-y-2 hover:scale-105 ${platformStyles.hover} ${platformStyles.border}`}
                    >
                      <div className={`p-3 rounded-xl mb-3 transition-all duration-300 shadow-lg ${platformStyles.icon}`}>
                        {getIcon(social.icon)}
                      </div>
                      <span className="text-sm font-bold text-center text-gray-900 dark:text-white group-hover:text-white transition-all duration-300 group-hover:scale-105">
                        {social.display_name || social.platform_name}
                      </span>
                      {social.username && (
                        <span className="text-xs text-center text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-all duration-300 font-medium">
                          @{social.username.replace('@', '')}
                        </span>
                      )}

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </a>
                  );
                })}
              </div>

              {/* Social Media Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                  <div className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 hover:scale-105 cursor-pointer">
                    <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">50K+</div>
                    <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">Total Followers</div>
                  </div>
                  <div className="group p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-1 hover:scale-105 cursor-pointer">
                    <div className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">1.2K</div>
                    <div className="text-xs text-green-700 dark:text-green-300 font-medium">Daily Engagement</div>
                  </div>
                  <div className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 hover:scale-105 cursor-pointer">
                    <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-4 w-4 mr-1 text-green-500 group-hover:animate-bounce" />
                      +15%
                    </div>
                    <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">Growth Rate</div>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 gap-4">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center mb-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mr-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                Pertanyaan yang Sering Diajukan
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Temukan jawaban cepat untuk pertanyaan yang sering diajukan oleh pengguna kami
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-600">
                <Eye className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{faqs.length} pertanyaan</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Live Help</span>
              </div>
            </div>
          </div>

          {/* FAQ Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Cari pertanyaan atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 lg:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="lg:w-64 xl:w-72 relative group">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 lg:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 appearance-none cursor-pointer transition-all duration-200"
                >
                  <option value="all">Semua Kategori</option>
                  {data.faq_categories && Object.entries(data.faq_categories).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 lg:mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
              }`}
            >
              <span className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${selectedCategory === 'all' ? 'bg-white' : 'bg-blue-500'}`}></div>
                Semua
              </span>
            </button>
            {data.faq_categories && Object.entries(data.faq_categories).map(([key, label]) => {
              const categoryColors = {
                general: 'from-blue-500 to-blue-600',
                booking: 'from-green-500 to-green-600',
                payment: 'from-yellow-500 to-yellow-600',
                property: 'from-purple-500 to-purple-600',
                account: 'from-pink-500 to-pink-600',
                technical: 'from-gray-500 to-gray-600'
              };
              const colorClass = categoryColors[key as keyof typeof categoryColors] || 'from-blue-500 to-blue-600';

              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === key
                      ? `bg-gradient-to-r ${colorClass} text-white shadow-lg`
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${selectedCategory === key ? 'bg-white' : `bg-gradient-to-r ${colorClass}`}`}></div>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqLoading ? (
              <div className="text-center py-16">
                <div className="relative">
                  <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-6" />
                  <div className="absolute inset-0 h-12 w-12 mx-auto rounded-full border-4 border-blue-100 dark:border-blue-900"></div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Memuat FAQ...</h4>
                <p className="text-gray-600 dark:text-gray-400">Sedang mengambil pertanyaan yang sering diajukan</p>
              </div>
            ) : faqs.length > 0 ? (
              faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 bg-white dark:bg-gray-800/50 backdrop-blur-sm transform hover:-translate-y-1"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800/30 hover:from-blue-50 hover:to-blue-25 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 group-hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-2">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-relaxed">
                            {faq.question}
                          </h4>
                          {faq.is_featured && (
                            <span className="inline-flex items-center text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full font-semibold shadow-md">
                              <Zap className="h-3 w-3 mr-1" />
                              Populer
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className={`px-3 py-1 rounded-full font-medium shadow-sm ${
                            faq.category === 'general' ? 'bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300' :
                            faq.category === 'booking' ? 'bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300' :
                            faq.category === 'payment' ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-800 dark:text-yellow-300' :
                            faq.category === 'property' ? 'bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-800 dark:text-purple-300' :
                            faq.category === 'account' ? 'bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 text-pink-800 dark:text-pink-300' :
                            'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-300'
                          }`}>
                            {data.faq_categories?.[faq.category] || faq.category}
                          </span>
                          <span className="flex items-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            <Eye className="h-3 w-3 mr-1" />
                            {faq.view_count}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className={`p-2 rounded-full transition-all duration-300 ${
                          expandedFaq === faq.id
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rotate-180'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600'
                        }`}>
                          <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedFaq === faq.id && (
                    <div className="px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-blue-200 dark:border-blue-800 animate-in slide-in-from-top duration-300">
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 gap-3 sm:gap-4">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => copyToClipboard(faq.question, `faq-${faq.id}`)}
                            className={`flex items-center text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                              copiedText === `faq-${faq.id}`
                                ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                            }`}
                          >
                            {copiedText === `faq-${faq.id}` ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Link
                              </>
                            )}
                          </button>
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Apakah ini membantu?
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg transition-all duration-200 hover:scale-105">
                            <span className="text-base sm:text-lg">👍</span>
                            <span className="text-xs sm:text-sm font-medium">Ya</span>
                          </button>
                          <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg transition-all duration-200 hover:scale-105">
                            <span className="text-base sm:text-lg">👎</span>
                            <span className="text-xs sm:text-sm font-medium">Tidak</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Search className="h-12 w-12 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">🔍</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Tidak ada FAQ yang sesuai dengan pencarian Anda'
                    : 'Belum ada FAQ yang tersedia'}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 max-w-md mx-auto">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Coba gunakan kata kunci yang berbeda atau pilih kategori lain untuk menemukan jawaban yang Anda cari.'
                    : 'FAQ sedang dalam proses pengembangan. Silakan hubungi kami langsung untuk bantuan.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {(searchQuery || selectedCategory !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Reset Pencarian
                    </button>
                  )}
                  <button
                    onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    Hubungi Kami
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
};

export default ContactSupport;
