import { Suspense } from 'react';

import { LoginForm } from '@/components/auth/login/login-form';

export default function LoginPage() {
	return (
		<Suspense>
			<LoginForm />
		</Suspense>
	);
}
