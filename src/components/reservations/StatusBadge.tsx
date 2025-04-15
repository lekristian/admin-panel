import React from 'react';
import { Badge } from '../ui';
import type { Reservation } from './types';

interface StatusBadgeProps {
  status: Reservation['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const variants: Record<Reservation['status'], 'warning' | 'success' | 'info' | 'error'> = {
    pending: 'warning',
    confirmed: 'success',
    completed: 'info',
    cancelled: 'error'
  };

  return (
    <Badge variant={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default StatusBadge;