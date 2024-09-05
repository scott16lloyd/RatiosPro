import { useState, useEffect } from 'react';
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

  // Sync the `isHeartFilled` state with the prop
  useEffect(() => {
    setIsHeartFilled(isHeartFilledProp);
  }, [isHeartFilledProp]);

  const handleHeartClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Store the previous state in case we need to revert on failure
    const previousState = isHeartFilled;

    // Optimistically update the UI
    setIsHeartFilled(!isHeartFilled);

    try {
      // Update the cache
      localStorage.setItem(
        `liked_${symbol}`,
        !isHeartFilled ? 'true' : 'false'
      );
      if (!isHeartFilled) {
        await addLikedStock(symbol, name, price, changesPercentage);
      } else {
        await removeLikedStock(symbol);
      }
      // Invalidate any queries related to the liked stocks
      queryClient.invalidateQueries({ queryKey: ['likedStocks'] });
    } catch (error) {
      // Revert the state if the operation fails
      setIsHeartFilled(previousState);
      localStorage.setItem(`liked_${symbol}`, previousState ? 'true' : 'false');
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
