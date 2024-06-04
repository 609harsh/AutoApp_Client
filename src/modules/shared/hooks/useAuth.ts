import { selectAuth } from '../../authentication/reducers';
import { useAppSelector } from './useAppSelector';

export const useAuth = () => useAppSelector(selectAuth);
