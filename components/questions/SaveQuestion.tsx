'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { toggleSaveQuestion } from '@/lib/actions/collection.action';

const SaveQuestion = ({ questionId }: { questionId: string }) => {
  const session = useSession();

  const userId = session?.data?.user?.id;
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;
    if (!userId) {
      toast.error('You need to be logged in to save a question');
      return;
    }
    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({
        questionId,
      });
      if (success) {
        toast.success(
          `Question ${data?.saved ? 'saved' : 'unsaved'} successfully`,
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Error saving question',
      );
    } finally {
      setIsLoading(false);
    }
  };
  const hasSaved = false;
  return (
    <Image
      src={hasSaved ? '/icons/star-filled.svg ' : '/icons/star-red.svg'}
      width={18}
      height={18}
      alt="save"
      className={`cursor-pointer ${isLoading && 'opacity-50'}`}
      aria-label="Save question"
      onClick={handleSave}
    ></Image>
  );
};

export default SaveQuestion;
