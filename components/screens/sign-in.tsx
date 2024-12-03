import { useSignIn } from '@/apis/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, ButtonText } from '../ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '../ui/form-control';
import { Input, InputField } from '../ui/input';

const signInSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export const SignIn: FC = () => {
  const { push } = useRouter();

  const { mutate: signIn } = useSignIn();
  const { handleSubmit, control, setError, formState } =
    useForm<SignInFormValues>({
      resolver: zodResolver(signInSchema),
      mode: 'onBlur',
    });

  const submitHandler = handleSubmit((values) =>
    signIn(values, {
      onError: () =>
        setError('root', {
          message: 'Wrong email or password.',
        }),
    }),
  );

  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <FormControl isInvalid={!!error?.message} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                placeholder="Email"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>{error?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <FormControl isInvalid={!!error?.message} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                placeholder="Password"
                type="password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>{error?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <FormControl
        isInvalid={!!formState.errors.root?.message}
        className="w-full gap-2"
      >
        <FormControlError>
          <FormControlErrorText>
            {formState.errors.root?.message}
          </FormControlErrorText>
        </FormControlError>
        <Button onPress={submitHandler} className="w-full" action="primary">
          <ButtonText>Sign In</ButtonText>
        </Button>
      </FormControl>

      <Button variant="link" onPress={() => push('/auth/sign-up')}>
        <ButtonText className="font-medium text-sm text-typography-900">
          Create account
        </ButtonText>
      </Button>
    </>
  );
};
