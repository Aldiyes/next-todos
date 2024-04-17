'use client';

import { addDays, format } from 'date-fns';
import { CalendarIcon, Router } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FaTasks } from 'react-icons/fa';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { addTask, editTask } from '@/actions/task/post-task';
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
import { Label } from '@/components/ui/label';
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
import { SwitchBoolean } from '@/components/ui/swithc-boolean';
import { Textarea } from '@/components/ui/textarea';
import { getDateUntil12am } from '@/lib/time-zone';
import { Task } from '@prisma/client';
import { useRouter } from 'next/navigation';

type Props = {
	initialData: Task;
};

const formSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	important: z.boolean(),
	completed: z.boolean(),
	dueDate: z.coerce.date().nullable(),
});

export const ModalForm = ({ initialData }: Props) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: initialData.title,
			description: initialData.description || undefined,
			completed: initialData.completed,
			important: initialData.important,
			dueDate: initialData.dueDate || null,
		},
	});

	const { isValid, isDirty } = form.formState;

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		startTransition(() => {
			const data = { taskId: initialData.id, ...values };
			editTask(data).then((data) => console.log('[UPDATE DATA] - ', data));
		});
	};
	return (
		<Form {...form}>
			<form className="flex flex-col gap-y-1">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4">
							<Label>Title</Label>
							<FormControl>
								<Input
									className="col-span-3 border-none ring-0 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
									defaultValue={field.value}
									onChange={field.onChange}
									onBlur={() => {
										if (isValid && isDirty) {
											onSubmit(form.getValues());
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4">
							<Label className="pt-5">Description</Label>
							<FormControl>
								<Textarea
									className="col-span-3 resize-none border-none ring-0 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
									defaultValue={field.value}
									onChange={field.onChange}
									onBlur={() => {
										if (isValid && isDirty) {
											onSubmit(form.getValues());
										}
									}}
									placeholder="you dont have any description yet"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="completed"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4">
							<Label className="pt-5">Completed</Label>
							<FormControl>
								<SwitchBoolean
									checked={field.value}
									onCheckedChange={() => {
										form.setValue('completed', !field.value);
										onSubmit(form.getValues());
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="important"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4">
							<Label className="pt-5">Important</Label>
							<FormControl>
								<SwitchBoolean
									checked={field.value}
									onCheckedChange={() => {
										form.setValue('important', !field.value);
										onSubmit(form.getValues());
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="dueDate"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center">
							<Label>Duedate</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										onBlur={() => {
											if (isValid && isDirty) {
												onSubmit(form.getValues());
											}
										}}
										variant={'outline'}
										className={cn(
											'col-span-3 justify-start text-left font-normal',
											!field.value && 'text-muted-foreground',
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
											onValueChange={(value: any) => {
												field.onChange(
													addDays(
														getDateUntil12am(new Date()),
														parseInt(value),
													),
												);
											}}
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
										<Button
											onClick={() => form.setValue('dueDate', null)}
											variant="destructive"
										>
											Reset
										</Button>
									)}
									<div className="rounded-md border">
										<Calendar
											mode="single"
											selected={field.value ? field.value : undefined}
											onSelect={field.onChange}
											disabled={(date) =>
												date < addDays(new Date(), -1) ||
												date < new Date('1900-01-01')
											}
											onDayBlur={() => onSubmit(form.getValues())}
											initialFocus
										/>
									</div>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};
