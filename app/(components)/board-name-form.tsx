'use client';
import * as React from 'react';
import { submitBoardName } from '@/app/(server-actions)/submit-board-name';
// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' aria-disabled={pending}>
      {pending ? 'loading' : 'not loading'}
    </button>
  );
}

export function BoardNameForm() {
  const ref = React.useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitBoardName, initialState);
  return (
    <form
      ref={ref}
      action={async formData => {
        ref.current?.reset();
        await formAction(formData);
      }}
    >
      <label htmlFor='boardName'>Enter board name</label>
      <input type='text' id='boardName' name='boardName' required />
      <SubmitButton />
      <p aria-live='polite' className='sr-only' role='status'>
        {state?.message}
      </p>
      <pre>{state?.message}</pre>
    </form>
  );
}
