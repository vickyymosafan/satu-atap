import { useState, useEffect, useCallback, useRef } from 'react';

// Real-time availability status
export interface AvailabilityStatus {
  propertyId: string;
  availableRooms: number;
  totalRooms: number;
  lastUpdated: string;
  status: 'available' | 'limited' | 'full' | 'offline';
  priceChanges?: {
    oldPrice: number;
    newPrice: number;
    changeType: 'increase' | 'decrease';
    effectiveDate: string;
  };
}

// WebSocket message types
interface WebSocketMessage {
  type: 'availability_update' | 'price_change' | 'property_status' | 'heartbeat';
  data: {
    propertyId: string;
    availableRooms?: number;
    totalRooms?: number;
    status?: 'available' | 'limited' | 'full' | 'offline';
    priceChanges?: {
      oldPrice: number;
      newPrice: number;
      changeType: 'increase' | 'decrease';
      effectiveDate: string;
    };
    [key: string]: unknown;
  };
  timestamp: string;
}

// Hook configuration
interface UseRealTimeAvailabilityConfig {
  enabled?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

// Hook return type
interface UseRealTimeAvailabilityReturn {
  availabilityData: Record<string, AvailabilityStatus>;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastUpdate: string | null;
  subscribe: (propertyIds: string[]) => void;
  unsubscribe: (propertyIds: string[]) => void;
  refreshAvailability: (propertyId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useRealTimeAvailability = (
  config: UseRealTimeAvailabilityConfig = {}
): UseRealTimeAvailabilityReturn => {
  const {
    enabled = true,
    reconnectInterval = 5000,
    maxReconnectAttempts = 5,
    heartbeatInterval = 30000
  } = config;

  // State management
  const [availabilityData, setAvailabilityData] = useState<Record<string, AvailabilityStatus>>({});
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs for WebSocket and intervals
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const subscribedPropertiesRef = useRef<Set<string>>(new Set());

  // WebSocket URL (will be configured based on environment)
  const getWebSocketUrl = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    return `${protocol}//${host}/ws/availability`;
  }, []);

  // Initialize WebSocket connection
  const initializeWebSocket = useCallback(() => {
    if (!enabled || wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      setConnectionStatus('connecting');
      setError(null);

      const ws = new WebSocket(getWebSocketUrl());
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected for real-time availability');
        setConnectionStatus('connected');
        reconnectAttemptsRef.current = 0;

        // Subscribe to previously subscribed properties
        if (subscribedPropertiesRef.current.size > 0) {
          const propertyIds = Array.from(subscribedPropertiesRef.current);
          ws.send(JSON.stringify({
            type: 'subscribe',
            propertyIds,
            timestamp: new Date().toISOString()
          }));
        }

        // Start heartbeat
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
        }
        heartbeatIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'heartbeat',
              timestamp: new Date().toISOString()
            }));
          }
        }, heartbeatInterval);
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          handleWebSocketMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        setConnectionStatus('disconnected');
        
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = null;
        }

        // Attempt to reconnect if not intentionally closed
        if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
          setTimeout(() => {
            reconnectAttemptsRef.current++;
            initializeWebSocket();
          }, reconnectInterval);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
        setError('Connection error occurred');
      };

    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      setConnectionStatus('error');
      setError('Failed to establish connection');
    }
  }, [enabled, getWebSocketUrl, heartbeatInterval, maxReconnectAttempts, reconnectInterval]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle incoming WebSocket messages
  const handleWebSocketMessage = useCallback((message: WebSocketMessage) => {
    setLastUpdate(message.timestamp);

    switch (message.type) {
      case 'availability_update':
        setAvailabilityData(prev => ({
          ...prev,
          [message.data.propertyId]: {
            ...prev[message.data.propertyId],
            propertyId: message.data.propertyId,
            availableRooms: message.data.availableRooms || prev[message.data.propertyId]?.availableRooms || 0,
            totalRooms: message.data.totalRooms || prev[message.data.propertyId]?.totalRooms || 0,
            status: message.data.status || prev[message.data.propertyId]?.status || 'available',
            lastUpdated: message.timestamp
          }
        }));
        break;

      case 'price_change':
        setAvailabilityData(prev => ({
          ...prev,
          [message.data.propertyId]: {
            ...prev[message.data.propertyId],
            priceChanges: message.data.priceChanges,
            lastUpdated: message.timestamp
          }
        }));
        break;

      case 'property_status':
        if (message.data.status) {
          setAvailabilityData(prev => ({
            ...prev,
            [message.data.propertyId]: {
              ...prev[message.data.propertyId],
              status: message.data.status as 'available' | 'limited' | 'full' | 'offline',
              lastUpdated: message.timestamp
            }
          }));
        }
        break;

      case 'heartbeat':
        // Heartbeat received, connection is alive
        break;

      default:
        console.warn('Unknown WebSocket message type:', message.type);
    }
  }, []);

  // Subscribe to property updates
  const subscribe = useCallback((propertyIds: string[]) => {
    propertyIds.forEach(id => subscribedPropertiesRef.current.add(id));

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'subscribe',
        propertyIds,
        timestamp: new Date().toISOString()
      }));
    }

    // Fetch initial data for new subscriptions
    fetchInitialAvailability(propertyIds);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Unsubscribe from property updates
  const unsubscribe = useCallback((propertyIds: string[]) => {
    propertyIds.forEach(id => subscribedPropertiesRef.current.delete(id));

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'unsubscribe',
        propertyIds,
        timestamp: new Date().toISOString()
      }));
    }

    // Remove from local state
    setAvailabilityData(prev => {
      const updated = { ...prev };
      propertyIds.forEach(id => delete updated[id]);
      return updated;
    });
  }, []);

  // Fetch initial availability data
  const fetchInitialAvailability = useCallback(async (propertyIds: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/properties/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ propertyIds })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        const availabilityMap: Record<string, AvailabilityStatus> = {};
        data.data.forEach((item: { propertyId: string; availableRooms: number; totalRooms: number; lastUpdated: string; status: 'available' | 'limited' | 'full' | 'offline' }) => {
          availabilityMap[item.propertyId] = {
            propertyId: item.propertyId,
            availableRooms: item.availableRooms,
            totalRooms: item.totalRooms,
            lastUpdated: item.lastUpdated,
            status: item.status
          };
        });

        setAvailabilityData(prev => ({ ...prev, ...availabilityMap }));
      }
    } catch (error) {
      console.error('Error fetching initial availability:', error);
      setError('Failed to fetch availability data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh availability for a specific property
  const refreshAvailability = useCallback(async (propertyId: string) => {
    try {
      const response = await fetch(`/api/properties/${propertyId}/availability`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setAvailabilityData(prev => ({
          ...prev,
          [propertyId]: {
            propertyId: data.data.propertyId,
            availableRooms: data.data.availableRooms,
            totalRooms: data.data.totalRooms,
            lastUpdated: data.data.lastUpdated,
            status: data.data.status
          }
        }));
      }
    } catch (error) {
      console.error('Error refreshing availability:', error);
      throw error;
    }
  }, []);

  // Initialize WebSocket on mount
  useEffect(() => {
    if (enabled) {
      initializeWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounting');
      }
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, [enabled, initializeWebSocket, handleWebSocketMessage]);

  return {
    availabilityData,
    connectionStatus,
    lastUpdate,
    subscribe,
    unsubscribe,
    refreshAvailability,
    isLoading,
    error
  };
};
