import { Suspense } from 'react';

import { NewPasswordForm } from '@/components/auth/form/new-password-form';

function NewPasswordPage() {
	return (
		<Suspense>
			<NewPasswordForm />
		</Suspense>
	);
}
export default NewPasswordPage;
