import { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import {
  addLikedStock,
  checkLikedStock,
  removeLikedStock,
} from '@/utils/supabase/dbFunctions';
import { useQueryClient } from '@tanstack/react-query';

interface LikeButtonProps {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
}

export function LikeButton({
  symbol,
  name,
  price,
  changesPercentage,
}: LikeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkIfLiked = async () => {
      setIsLoading(true);
      const isLiked = await checkLikedStock(symbol);
      setIsHeartFilled(isLiked ? true : false);
      setIsLoading(false);
    };

    checkIfLiked();
  }, [symbol]);

  const handleHeartClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Update the state and local storage immediately
    setIsHeartFilled(!isHeartFilled);

    try {
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

  return (
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
