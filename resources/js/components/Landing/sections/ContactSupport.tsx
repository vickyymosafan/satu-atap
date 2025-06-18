import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageCircle, Mail, Send, ChevronDown, ChevronUp, Search,
  Instagram, Facebook, Twitter, Linkedin, Youtube, Music,
  Clock, Shield, Headphones, CreditCard, User, MapPin, Settings
} from 'lucide-react';
import { 
  ContactSupportData, ContactFormSubmission, SupportHotline, 
  SocialMediaLink, FaqItem 
} from '@/types';

interface ContactSupportProps {
  currentTheme: 'light' | 'dark';
}

// Icon mapping for dynamic icon rendering
const iconMap = {
  Phone, MessageCircle, Mail, Send, ChevronDown, ChevronUp, Search,
  Instagram, Facebook, Twitter, Linkedin, Youtube, Music,
  Clock, Shield, Headphones, CreditCard, User, MapPin, Settings
};

const ContactSupport: React.FC<ContactSupportProps> = ({ currentTheme }) => {
  const [data, setData] = useState<ContactSupportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Contact form state
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

  // FAQ state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [faqLoading, setFaqLoading] = useState(false);

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

  // Get icon component by name
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
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

  // Handle form input changes
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

  if (loading) {
    return (
      <section className="relative py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl p-6 border border-border">
                    <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                ))}
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
    <section className="relative py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Kontak & Dukungan
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-normal">
            Kami siap membantu Anda 24/7. Hubungi kami melalui berbagai channel yang tersedia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/50 shadow-lg">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              Kirim Pesan
            </h3>
            
            {formSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.
                </p>
              </div>
            )}

            <form onSubmit={handleContactFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name[0]}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email[0]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.phone[0]}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subjek *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  {formErrors.subject && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.subject[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.message[0]}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {formLoading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>

          {/* Support Hotlines */}
          <div className="space-y-6">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/50 shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                Hotline Dukungan
              </h3>
              <div className="space-y-4">
                {data.hotlines.map((hotline) => (
                  <div key={hotline.id} className="p-4 bg-muted/20 rounded-lg border border-border/30">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{hotline.title}</h4>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {hotline.hotline_type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{hotline.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-primary" />
                        <a href={`tel:${hotline.phone_number}`} className="text-foreground hover:text-primary">
                          {hotline.phone_number}
                        </a>
                      </div>

                      {hotline.whatsapp_number && (
                        <div className="flex items-center text-sm">
                          <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                          <a
                            href={`https://wa.me/${hotline.whatsapp_number.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-green-600"
                          >
                            {hotline.whatsapp_number}
                          </a>
                        </div>
                      )}

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {hotline.available_hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/50 shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                Ikuti Kami
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {data.social_media.map((social) => (
                  <a
                    key={social.id}
                    href={social.platform_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-muted/20 rounded-lg border border-border/30 hover:bg-muted/40 transition-colors group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg mb-2 group-hover:bg-primary/20 transition-colors">
                      {getIcon(social.icon)}
                    </div>
                    <span className="text-sm font-medium text-foreground text-center">
                      {social.display_name || social.platform_name}
                    </span>
                    {social.username && (
                      <span className="text-xs text-muted-foreground text-center">
                        @{social.username.replace('@', '')}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border/50 shadow-lg">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h3>

          {/* FAQ Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari pertanyaan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">Semua Kategori</option>
                {data.faq_categories && Object.entries(data.faq_categories).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-2">Memuat FAQ...</p>
              </div>
            ) : faqs.length > 0 ? (
              faqs.map((faq) => (
                <div key={faq.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left bg-muted/20 hover:bg-muted/40 transition-colors focus:outline-none focus:bg-muted/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground pr-4">{faq.question}</h4>
                        {faq.is_featured && (
                          <span className="inline-block mt-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Populer
                          </span>
                        )}
                      </div>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {expandedFaq === faq.id && (
                    <div className="px-6 py-4 bg-background border-t border-border">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">
                          Kategori: {data.faq_categories?.[faq.category] || faq.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Dilihat {faq.view_count} kali
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Tidak ada FAQ yang sesuai dengan pencarian Anda.'
                    : 'Belum ada FAQ yang tersedia.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Consistent Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
    </section>
  );
};

export default ContactSupport;
