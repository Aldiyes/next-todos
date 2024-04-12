'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosStarOutline, IoMdStar } from 'react-icons/io';
import * as z from 'zod';

import { importantTask } from '@/actions/task/post-task';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';

type Props = {
	important: boolean;
	taskId: string;
};

const formSchema = z.object({
	important: z.boolean(),
});

export const ImportantTaskButton = ({ important, taskId }: Props) => {
	const [isChecked, setIsChecked] = useState(important);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			important: important,
		},
	});

	const { isSubmitting } = form.formState;

	const toggleImportant = () => {
		setIsChecked(!isChecked);
		form.setValue('important', !isChecked);
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const data = { taskId: taskId, ...values };
		startTransition(() => {
			importantTask(data).then(() => toggleImportant());
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="important"
					render={({ field }) => (
						<FormItem>
							<Button
								type="submit"
								variant="ghost"
								onClick={toggleImportant}
								disabled={isSubmitting}
							>
								{field.value ? (
									<IoMdStar className="h-6 w-6 text-yellow-400" />
								) : (
									<IoIosStarOutline className="h-6 w-6 text-rose-400/50" />
								)}
							</Button>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};
