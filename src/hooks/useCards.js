/**
 * useCards Hook
 * React Query hooks for user cards management
 */

import { useQuery } from '@tanstack/react-query';
import { getCards, getCardById } from '../api/cards.api';

const CARDS_KEY = 'cards';

/**
 * Hook to fetch all cards
 */
export const useCards = () => {
    return useQuery({
        queryKey: [CARDS_KEY],
        queryFn: getCards,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to fetch single card
 * @param {string} id - Card ID
 */
export const useCard = (id) => {
    return useQuery({
        queryKey: [CARDS_KEY, id],
        queryFn: () => getCardById(id),
        enabled: !!id,
    });
};

export default {
    useCards,
    useCard,
};
