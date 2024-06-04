import { selectEditor } from '../../core/reducers/editor.reducer';
import { useAppSelector } from './useAppSelector';

export const useEditor = () => useAppSelector(selectEditor);
