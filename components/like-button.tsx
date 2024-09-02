import { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { addLikedStock, removeLikedStock } from '@/utils/supabase/dbFunctions';
import { useQueryClient } from '@tanstack/react-query';

interface LikeButtonProps {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  isLoading: boolean;
  isHeartFilledProp: boolean;
}

export function LikeButton({
  symbol,
  name,
  price,
  changesPercentage,
  isLoading,
  isHeartFilledProp,
}: LikeButtonProps) {
  const [isHeartFilled, setIsHeartFilled] = useState(isHeartFilledProp);
  const queryClient = useQueryClient();

  const handleHeartClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // Update component state
      setIsHeartFilled(!isHeartFilled);
      // Update local storage
      localStorage.setItem(`liked-${symbol}`, JSON.stringify(!isHeartFilled));
      if (!isHeartFilled) {
        await addLikedStock(symbol, name, price, changesPercentage);
      } else {
        await removeLikedStock(symbol);
      }
      queryClient.invalidateQueries({ queryKey: ['likedStocks'] });
    } catch (error) {
      // If the operation fails, revert the changes and show an error message
      setIsHeartFilled(!isHeartFilled);
      console.error(error);
    }
  };

  return isLoading ? (
    <></>
  ) : (
    <>
      {isHeartFilled ? (
        <FaHeart
          className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 hover:cursor-pointer"
          onClick={handleHeartClick}
        />
      ) : (
        <FaRegHeart
          className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 hover:cursor-pointer"
          onClick={handleHeartClick}
        />
      )}
    </>
  );
}
