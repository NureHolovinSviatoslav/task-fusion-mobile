import { useSignUp } from '@/apis/users';
import { UserType } from '@/types/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { ChevronDown } from 'lucide-react-native';
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
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '../ui/select';
import { Textarea, TextareaInput } from '../ui/textarea';

const signUpSchema = z
  .object({
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    position: z.enum([UserType.CLIENT, UserType.DEVELOPER, UserType.PM], {
      message: 'Position is required',
    }),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Make sure your passwords match',
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signUpSchema>;

export const SignUp: FC = () => {
  const { push } = useRouter();
  const { mutate: signUp } = useSignUp();
  const { handleSubmit, control, setError } = useForm<SignupFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    criteriaMode: 'firstError',
  });

  const submitHandler = handleSubmit((values) =>
    signUp(values, {
      onError: () =>
        setError('email', { message: 'This email is already in use.' }),
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
        name="name"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <FormControl isInvalid={!!error?.message} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                placeholder="Name"
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
        name="position"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl isInvalid={!!error?.message} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Role</FormControlLabelText>
            </FormControlLabel>
            <Select
              className="w-full"
              onValueChange={onChange}
              selectedValue={value}
            >
              <SelectTrigger
                variant="outline"
                className="w-full justify-between"
              >
                <SelectInput placeholder="Select role" />
                <SelectIcon className="mr-3" as={ChevronDown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent className="pb-5">
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label={UserType.CLIENT} value={UserType.CLIENT} />
                  <SelectItem label={UserType.PM} value={UserType.PM} />
                  <SelectItem
                    label={UserType.DEVELOPER}
                    value={UserType.DEVELOPER}
                  />
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlError>
              <FormControlErrorText>{error?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <FormControl isInvalid={!!error?.message} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Description</FormControlLabelText>
            </FormControlLabel>
            <Textarea className="my-1">
              <TextareaInput
                placeholder="Description"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </Textarea>
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <FormControl isInvalid={!!error?.message} className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                placeholder="Confirm password"
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

      <Button onPress={submitHandler} className="w-full" action="primary">
        <ButtonText>Sign Up</ButtonText>
      </Button>

      <Button variant="link" onPress={() => push('/auth/sign-in')}>
        <ButtonText className="font-medium text-sm text-typography-900">
          Already have an account?
        </ButtonText>
      </Button>
    </>
  );
};
