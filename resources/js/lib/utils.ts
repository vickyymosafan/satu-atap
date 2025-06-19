import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import {
  Search, ShieldCheck, DollarSign, Headphones, CreditCard, Star,
  Lock, BadgeCheck, Award, Activity, Building2, Users, MapPin, TrendingUp,
  Shield, MessageCircle, Phone, Mail, Send, ChevronDown, ChevronUp,
  Instagram, Facebook, Twitter, Linkedin, Youtube, Clock, CheckCircle,
  AlertCircle, Loader2, Copy, Eye, Filter, Heart, Zap
} from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Shared icon mapping for dynamic icon rendering
export const iconMap = {
  Search, ShieldCheck, DollarSign, Headphones, CreditCard, Star,
  Lock, BadgeCheck, Award, Activity, Building2, Users, MapPin, TrendingUp,
  Shield, MessageCircle, Phone, Mail, Send, ChevronDown, ChevronUp,
  Instagram, Facebook, Twitter, Linkedin, Youtube, Clock, CheckCircle,
  AlertCircle, Loader2, Copy, Eye, Filter, Heart, Zap
};

// Get icon component by name
export const getIcon = (iconName: string, className: string = "h-5 w-5"): React.ReactElement | null => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap];
  return IconComponent ? React.createElement(IconComponent, { className }) : null;
};
