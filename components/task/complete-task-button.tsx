'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MdOutlineCheckCircleOutline, MdOutlineCircle } from 'react-icons/md';
import * as z from 'zod';

import { completedTask } from '@/actions/task/post-task';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { useCurrentUser } from '@/hooks/use-current-user';
import { startTransition, useState } from 'react';

type Props = {
	completed: boolean;
	taskId: string;
	userId: string;
};

const formSchema = z.object({
	completed: z.boolean(),
});

export const CompleteTaskButton = ({ completed, taskId, userId }: Props) => {
	const [isChecked, setIsChecked] = useState(completed);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			completed: completed,
		},
	});

	const { isSubmitting } = form.formState;

	const toggleCompleted = () => {
		setIsChecked(!isChecked);
		form.setValue('completed', !isChecked);
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const data = { userId: userId, taskId: taskId, ...values };
		startTransition(() => {
			completedTask(data).then(() => toggleCompleted());
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="completed"
					render={({ field }) => (
						<FormItem>
							<Button
								type="submit"
								variant="ghost"
								onClick={toggleCompleted}
								disabled={isSubmitting}
							>
								{field.value ? (
									<MdOutlineCheckCircleOutline className="h-6 w-6 text-emerald-600" />
								) : (
									<MdOutlineCircle className="h-6 w-6 text-yellow-500" />
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
