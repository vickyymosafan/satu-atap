import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  tabIndex?: number;
  error?: string | string[];
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  className?: string;
  validation?: 'default' | 'success' | 'error';
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  autoFocus = false,
  autoComplete,
  tabIndex,
  error,
  rows = 5,
  maxLength,
  showCharCount = false,
  className = "",
  validation
}) => {
  // Determine validation status
  const getValidationStatus = () => {
    if (validation) return validation;
    if (error && (Array.isArray(error) ? error.length > 0 : error)) return 'error';
    if (value.trim().length > 0) return 'success';
    return 'default';
  };

  const status = getValidationStatus();
  const errorMessage = Array.isArray(error) ? error[0] : error;

  // Get field CSS classes based on validation status
  const getFieldClasses = () => {
    const baseClasses = "w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-white dark:bg-gray-900 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors";
    
    switch (status) {
      case 'error':
        return `${baseClasses} border-red-500 focus:ring-red-500/20`;
      case 'success':
        return `${baseClasses} border-green-500 focus:ring-green-500/20`;
      default:
        return `${baseClasses} border-gray-300 dark:border-gray-600 focus:ring-blue-500/20 focus:border-blue-500`;
    }
  };

  const renderInput = () => {
    const commonProps = {
      id,
      name,
      value,
      onChange,
      placeholder,
      required,
      disabled,
      autoFocus,
      autoComplete,
      tabIndex,
      className: `${getFieldClasses()} ${type === 'textarea' ? 'resize-none' : ''}`,
      ...(maxLength && { maxLength })
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          rows={rows}
        />
      );
    }

    return (
      <Input
        {...commonProps}
        type={type}
      />
    );
  };

  return (
    <div className={`grid gap-2 ${className}`}>
      <Label htmlFor={id} className="flex items-center gap-2 text-sm sm:text-base font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
        {status === 'success' && (
          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
        )}
      </Label>
      
      {renderInput()}
      
      {errorMessage && (
        <p className="text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-center gap-1">
          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
          {errorMessage}
        </p>
      )}

      {showCharCount && maxLength && (
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-right">
          {value.length}/{maxLength} karakter
        </div>
      )}
    </div>
  );
};

export default FormField;
