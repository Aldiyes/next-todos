import { LoginButton } from '@/components/auth/login/login-button';
import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<main className="flex h-full flex-col items-center justify-center bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-950">
			<div className="space-y-6 text-center">
				<h1 className="text-6xl font-semibold drop-shadow-md">⚡NextTodo</h1>
				<p className="text-lg">NextTodo helps you focus, from work to play.</p>
				<div>
					<LoginButton>
						<Button size="lg" className="font-bold">
							Get Started
						</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	);
}
