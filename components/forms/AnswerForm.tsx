'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
});
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { AnswerSchema } from '@/lib/validations';

import { useRef, useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { ReloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { createAnswer } from '@/lib/actions/answer.action';
import { toast } from 'sonner';
import { start } from 'repl';

const AnswerForm = ({ questionId }: { questionId: string }) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: { content: '' },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        questionId,
        content: values.content,
      });
      if (result.success) {
        form.reset();

        toast.success('Answer posted successfully!');
      } else {
        toast.error('Failed to post answer. Please try again.');
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark-400_light800">
          Write your answer here
        </h4>
        <Button
          className="btn ligh-border-2 gap-1.5 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          disabled={isAISubmitting}
        >
          {isAISubmitting ? (
            <>
              <ReloadIcon
                className="mr-2 animate-spin"
                width={20}
                height={20}
              />
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="Generate AI Answer"
                width={12}
                height={12}
                className="object-contain"
              >
                Generate AI Answer
              </Image>
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        ></form>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormControl className="mt-3.5">
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            className="primary-gradient w-fit"
            disabled={isAnswering}
          >
            {isAnswering ? (
              <>
                <ReloadIcon
                  className="mr-2 animate-spin"
                  width={20}
                  height={20}
                />
                Posting...
              </>
            ) : (
              'Post Answer'
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default AnswerForm;
