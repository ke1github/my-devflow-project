'use client';

import { incrementViews } from '@/lib/actions/question.action';
import { useEffect } from 'react';
import { toast } from 'sonner';

const View = ({ questionId }: { questionId: string }) => {
  const handleIncrement = async () => {
    const result = await incrementViews({ questionId });

    if (result.success) {
      toast('Views incremented');
    } else {
      toast(result.error?.message, {
        style: { color: 'red' },
      });
      toast(result.error?.message, {
        style: { color: 'red' },
      });
    }
  };

  useEffect(() => {
    handleIncrement();
  }, []);

  return null;
};

export default View;
