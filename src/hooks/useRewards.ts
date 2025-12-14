import { useLocalStorage } from './useLocalStorage';

interface RedeemedReward {
  rewardId: string;
  redeemedAt: string;
  used: boolean;
}

export function useRewards() {
  const [points, setPoints] = useLocalStorage<number>('black-app-points', 0);
  const [totalVisits, setTotalVisits] = useLocalStorage<number>('black-app-visits', 0);
  const [redeemedRewards, setRedeemedRewards] = useLocalStorage<RedeemedReward[]>('black-app-redeemed', []);

  const addPoints = (amount: number) => {
    setPoints(points + amount);
  };

  const incrementVisits = () => {
    setTotalVisits(totalVisits + 1);
  };

  const redeemReward = (rewardId: string, pointsCost: number): boolean => {
    if (points >= pointsCost) {
      setPoints(points - pointsCost);
      setRedeemedRewards([
        ...redeemedRewards,
        { rewardId, redeemedAt: new Date().toISOString(), used: false },
      ]);
      return true;
    }
    return false;
  };

  const getPointsForBooking = (totalPrice: number): number => {
    // 1 point per 10 ZMW spent
    return Math.floor(totalPrice / 10);
  };

  const getNextTierPoints = (): number => {
    if (points < 100) return 100;
    if (points < 250) return 250;
    if (points < 500) return 500;
    return 1000;
  };

  const getCurrentTier = (): { name: string; color: string } => {
    if (points >= 500) return { name: 'Platinum', color: 'from-purple-500 to-pink-500' };
    if (points >= 250) return { name: 'Gold', color: 'from-yellow-500 to-orange-500' };
    if (points >= 100) return { name: 'Silver', color: 'from-gray-400 to-gray-500' };
    return { name: 'Bronze', color: 'from-orange-600 to-orange-800' };
  };

  return {
    points,
    totalVisits,
    redeemedRewards,
    addPoints,
    incrementVisits,
    redeemReward,
    getPointsForBooking,
    getNextTierPoints,
    getCurrentTier,
  };
}
