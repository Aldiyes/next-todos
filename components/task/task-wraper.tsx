import { Accordion } from '@/components/ui/accordion';

export function TaskWraper({ children }: { children: React.ReactNode }) {
	return (
		<Accordion type="single" collapsible className="w-full">
			{children}
		</Accordion>
	);
}
