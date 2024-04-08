import { Suspense } from 'react';

import { NewVerificationForm } from '@/components/auth/new-verification/new-verification-form';

const NewVefiricationPage = () => {
	return (
		<Suspense>
			<NewVerificationForm />
		</Suspense>
	);
};
export default NewVefiricationPage;
