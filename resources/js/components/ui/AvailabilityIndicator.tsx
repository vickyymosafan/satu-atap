import React, { useEffect, useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useRealTimeAvailability, AvailabilityStatus } from '@/hooks/useRealTimeAvailability';

interface AvailabilityIndicatorProps {
  propertyId: string;
  className?: string;
  showDetails?: boolean;
  showPriceChanges?: boolean;
  onAvailabilityChange?: (status: AvailabilityStatus) => void;
}

const AvailabilityIndicator: React.FC<AvailabilityIndicatorProps> = ({
  propertyId,
  className = '',
  showDetails = true,
  showPriceChanges = false,
  onAvailabilityChange
}) => {
  const {
    availabilityData,
    connectionStatus,
    subscribe,
    unsubscribe,
    refreshAvailability,
    isLoading
  } = useRealTimeAvailability();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  const availability = availabilityData[propertyId];

  // Subscribe to this property on mount
  useEffect(() => {
    subscribe([propertyId]);
    return () => unsubscribe([propertyId]);
  }, [propertyId, subscribe, unsubscribe]);

  // Notify parent of availability changes
  useEffect(() => {
    if (availability && onAvailabilityChange) {
      onAvailabilityChange(availability);
    }
  }, [availability, onAvailabilityChange]);

  // Show price change alert
  useEffect(() => {
    if (availability?.priceChanges) {
      setShowPriceAlert(true);
      const timer = setTimeout(() => setShowPriceAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [availability?.priceChanges]);

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshAvailability(propertyId);
    } catch (error) {
      console.error('Failed to refresh availability:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Get status color and icon
  const getStatusDisplay = () => {
    if (!availability) {
      return {
        color: 'text-gray-500 bg-gray-100',
        icon: <Clock className="w-4 h-4" />,
        text: 'Loading...',
        pulse: true
      };
    }

    switch (availability.status) {
      case 'available':
        return {
          color: 'text-green-700 bg-green-100 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />,
          text: `${availability.availableRooms} kamar tersedia`,
          pulse: false
        };
      case 'limited':
        return {
          color: 'text-yellow-700 bg-yellow-100 border-yellow-200',
          icon: <AlertCircle className="w-4 h-4" />,
          text: `${availability.availableRooms} kamar tersisa`,
          pulse: true
        };
      case 'full':
        return {
          color: 'text-red-700 bg-red-100 border-red-200',
          icon: <XCircle className="w-4 h-4" />,
          text: 'Penuh',
          pulse: false
        };
      case 'offline':
        return {
          color: 'text-gray-700 bg-gray-100 border-gray-200',
          icon: <WifiOff className="w-4 h-4" />,
          text: 'Offline',
          pulse: false
        };
      default:
        return {
          color: 'text-gray-500 bg-gray-100',
          icon: <Clock className="w-4 h-4" />,
          text: 'Unknown',
          pulse: false
        };
    }
  };

  // Get connection status indicator
  const getConnectionStatus = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: <Wifi className="w-3 h-3 text-green-500" />,
          text: 'Live',
          color: 'text-green-500'
        };
      case 'connecting':
        return {
          icon: <RefreshCw className="w-3 h-3 text-yellow-500 animate-spin" />,
          text: 'Connecting',
          color: 'text-yellow-500'
        };
      case 'disconnected':
        return {
          icon: <WifiOff className="w-3 h-3 text-gray-500" />,
          text: 'Offline',
          color: 'text-gray-500'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-3 h-3 text-red-500" />,
          text: 'Error',
          color: 'text-red-500'
        };
    }
  };

  const statusDisplay = getStatusDisplay();
  const connectionDisplay = getConnectionStatus();

  // Format last updated time
  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} jam lalu`;
    return date.toLocaleDateString('id-ID');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main availability indicator */}
      <div className={`
        inline-flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium
        ${statusDisplay.color}
        ${statusDisplay.pulse ? 'animate-pulse' : ''}
        ${isLoading ? 'opacity-50' : ''}
      `}>
        {statusDisplay.icon}
        <span>{statusDisplay.text}</span>
        
        {/* Connection status */}
        {showDetails && (
          <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-current/20">
            {connectionDisplay.icon}
            <span className={`text-xs ${connectionDisplay.color}`}>
              {connectionDisplay.text}
            </span>
          </div>
        )}

        {/* Refresh button */}
        {showDetails && (
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="ml-2 p-1 hover:bg-black/10 rounded transition-colors"
            title="Refresh availability"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>

      {/* Detailed information */}
      {showDetails && availability && (
        <div className="mt-2 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <span>
              {availability.availableRooms} dari {availability.totalRooms} kamar
            </span>
            <span>
              Update: {formatLastUpdated(availability.lastUpdated)}
            </span>
          </div>
          
          {/* Occupancy bar */}
          <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                availability.status === 'available' ? 'bg-green-500' :
                availability.status === 'limited' ? 'bg-yellow-500' :
                availability.status === 'full' ? 'bg-red-500' : 'bg-gray-400'
              }`}
              style={{
                width: `${((availability.totalRooms - availability.availableRooms) / availability.totalRooms) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Price change alert */}
      {showPriceChanges && showPriceAlert && availability?.priceChanges && (
        <div className="absolute top-full left-0 right-0 mt-2 z-10">
          <div className={`
            px-3 py-2 rounded-lg border text-sm
            ${availability.priceChanges.changeType === 'increase' 
              ? 'bg-red-50 border-red-200 text-red-800' 
              : 'bg-green-50 border-green-200 text-green-800'
            }
          `}>
            <div className="flex items-center space-x-2">
              {availability.priceChanges.changeType === 'increase' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                Harga {availability.priceChanges.changeType === 'increase' ? 'naik' : 'turun'}!
              </span>
            </div>
            <div className="mt-1 text-xs">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(availability.priceChanges.oldPrice)} → {' '}
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(availability.priceChanges.newPrice)}
            </div>
            <div className="text-xs opacity-75">
              Berlaku: {new Date(availability.priceChanges.effectiveDate).toLocaleDateString('id-ID')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityIndicator;
