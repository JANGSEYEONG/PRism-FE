'use client';

import { cn } from '@/lib/utils';
import ShadowCard from '@/components/common/card/ShadowCard';
import TagInput from '@/components/common/input/TagInput';
import CirclePlanetIcon from './CirclePlanetIcon';
import { ChevronRight } from 'lucide-react';
import {
  USER_CARD_VARIANT,
  type UserSummaryCardVariant,
  type UserSummaryData,
} from '@/models/user/userModels';
import { maskEmail, maskName } from '@/lib/masking';

interface UserSummaryCard {
  userData: UserSummaryData;
  variant?: UserSummaryCardVariant;
}

export default function UserSummaryCard({
  userData,
  variant = USER_CARD_VARIANT.MEMBER_PUBLIC,
}: UserSummaryCard) {
  const isPublicUser = variant === USER_CARD_VARIANT.MEMBER_PUBLIC;
  const handleOpenUserProfile = () => {
    if (!isPublicUser) return;
    alert(`${userData.userId}번 유저의 프로필 보러가기`);
  };

  return (
    <ShadowCard
      className={cn(
        'flex h-[157px] w-[512px] flex-col justify-between p-6',
        !isPublicUser && 'cursor-default',
      )}
      onClick={handleOpenUserProfile}>
      <div className="flex items-start space-x-4">
        <CirclePlanetIcon className="bg-gray-100" />
        <div className="flex flex-col justify-center">
          <p className="body8">
            {variant === USER_CARD_VARIANT.MEMBER_PRIVATE ? maskName(userData.name) : userData.name}
          </p>
          <p className="text-gray-500 display5">
            {isPublicUser ? userData.email : maskEmail(userData.email)}
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <ul className="flex items-center gap-2">
          {userData.roles.map((role, index) => (
            <li key={index}>
              <TagInput value={role} isDisabled colorTheme="indigo" />
            </li>
          ))}
        </ul>
        {isPublicUser && (
          <div className="cursor-pointer text-gray-600 underline decoration-current underline-offset-4 display5 flex-center">
            프로필 보러가기
            <ChevronRight className="h-4 w-4" />
          </div>
        )}
      </div>
    </ShadowCard>
  );
}
