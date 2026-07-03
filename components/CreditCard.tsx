// components/CreditCard.tsx
import React from 'react';
import { Zap } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

interface CreditCardProps {
  balance: number;
  onClaimBonus: () => void;
  bonusAvailable: boolean;
  isLoading?: boolean;
}

export const CreditCard: React.FC<CreditCardProps> = ({
  balance,
  onClaimBonus,
  bonusAvailable,
  isLoading,
}) => {
  return (
    <Card glass hover>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Your Credits</p>
            <p className="text-3xl font-bold text-blue-400">${balance.toFixed(2)}</p>
          </div>
          <Zap className="w-8 h-8 text-yellow-400" />
        </div>

        {bonusAvailable && (
          <Button
            onClick={onClaimBonus}
            isLoading={isLoading}
            variant="secondary"
            className="w-full"
          >
            Claim Daily Bonus
          </Button>
        )}

        <p className="text-xs text-gray-500">
          Get free credits every 24 hours for free calls
        </p>
      </div>
    </Card>
  );
};
