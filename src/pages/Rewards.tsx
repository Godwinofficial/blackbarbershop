import { Gift, Star, Scissors, Percent, Crown, ChevronRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { useRewards } from '@/hooks/useRewards';
import { rewards } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

const iconMap = {
  scissors: Scissors,
  gift: Gift,
  percent: Percent,
  crown: Crown,
  star: Star,
};

export default function Rewards() {
  const { points, totalVisits, redeemReward, getNextTierPoints, getCurrentTier } = useRewards();
  const tier = getCurrentTier();
  const nextTierPoints = getNextTierPoints();
  const progress = (points / nextTierPoints) * 100;

  const handleRedeem = (rewardId: string, pointsRequired: number, rewardName: string) => {
    if (points < pointsRequired) {
      toast.error(`Not enough points. You need ${pointsRequired - points} more points.`);
      return;
    }
    const success = redeemReward(rewardId, pointsRequired);
    if (success) {
      toast.success(`Redeemed: ${rewardName}!`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className={cn('px-4 pt-8 pb-16 bg-gradient-to-br', tier.color)}>
        <h1 className="text-xl font-semibold text-white mb-6">Rewards</h1>

        {/* Points Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Your Points</p>
              <p className="text-4xl font-bold text-white">{points}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm text-white/80 mb-1">
              <span>{tier.name} Member</span>
              <span>{nextTierPoints - points} pts to next tier</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{totalVisits}</p>
              <p className="text-xs text-white/70">Total Visits</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{tier.name}</p>
              <p className="text-xs text-white/70">Current Tier</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{rewards.filter(r => points >= r.pointsRequired).length}</p>
              <p className="text-xs text-white/70">Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards List */}
      <div className="px-4 -mt-6">
        <div className="glass-card rounded-xl p-4 mb-4">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Available Rewards
          </h2>

          <div className="space-y-3">
            {rewards.map((reward) => {
              const Icon = iconMap[reward.icon];
              const canRedeem = points >= reward.pointsRequired;

              return (
                <div
                  key={reward.id}
                  className={cn(
                    'p-4 rounded-xl border transition-all',
                    canRedeem
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border bg-card opacity-70'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center',
                        canRedeem ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{reward.name}</h3>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                        </div>
                        <div className="text-right">
                          <p className={cn('font-bold', canRedeem ? 'text-primary' : 'text-muted-foreground')}>
                            {reward.pointsRequired}
                          </p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                      {canRedeem ? (
                        <Button
                          size="sm"
                          className="mt-3 gradient-primary"
                          onClick={() => handleRedeem(reward.id, reward.pointsRequired, reward.name)}
                        >
                          Redeem Now
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-2">
                          {reward.pointsRequired - points} more points needed
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Earn */}
        <div className="glass-card rounded-xl p-4">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            How to Earn Points
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Book & Visit</p>
                <p className="text-muted-foreground">Earn 1 point per ZMW 10 spent</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Gift className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium">Refer a Friend</p>
                <p className="text-muted-foreground">Get 50 bonus points per referral</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="font-medium">Birthday Bonus</p>
                <p className="text-muted-foreground">Double points on your birthday month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
