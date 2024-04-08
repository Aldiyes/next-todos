'use client';

import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

// import { addTask } from '@/actions/task/post-task';
import { cn } from '@/lib/utils';
import { TaskSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { addTask } from '@/actions/task/post-task';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useCurrentUser } from '@/hooks/use-current-user';

export const NewTask = () => {
	const user = useCurrentUser();
	// console.log('[NEW-TASK USE-CURRENT-USER] - ', user);
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof TaskSchema>>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: '',
			planned: undefined,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = (values: z.infer<typeof TaskSchema>) => {
		const data = { userId: user?.id, ...values };
		startTransition(() => {
			addTask(data);
		});
		// console.log('[NEW-TASK VALUES] - ', data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-300/20 shadow-md"
			>
				<div className="px-4 py-2 border-b-2 dark:border-b">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="border-none ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 ring-0 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-300/20"
										{...field}
										disabled={isPending}
										placeholder="Add task"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex justify-between px-4 py-2 bg-neutral-200 dark:bg-neutral-900">
					<FormField
						control={form.control}
						name="planned"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'w-[280px] justify-start text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.value ? (
												<span>in {format(field.value, 'PPP')}</span>
											) : (
												<span>Deadline</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="flex w-auto flex-col space-y-2 p-2">
										{!field.value ? (
											<Select
												onValueChange={(value: any) =>
													field.onChange(addDays(new Date(), parseInt(value)))
												}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select" />
												</SelectTrigger>
												<SelectContent position="popper">
													<SelectItem value="0">Today</SelectItem>
													<SelectItem value="1">Tomorrow</SelectItem>
													<SelectItem value="3">In 3 days</SelectItem>
													<SelectItem value="7">In a week</SelectItem>
												</SelectContent>
											</Select>
										) : (
											<Button onClick={() => form.reset()}>Reset</Button>
										)}
										<div className="rounded-md border">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
											/>
										</div>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						variant="ghost"
						disabled={!isValid || isSubmitting}
						className="border"
					>
						Add
					</Button>
				</div>
			</form>
		</Form>
	);
};
