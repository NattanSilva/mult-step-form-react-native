import { useNavigation } from '@react-navigation/native'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Progress } from '../../components/Progress'
import { styles } from './styles'

export function FormStepThree() {
  const { navigate } = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useFormContext<AccountProps>()

  function handleNextStep(data: AccountProps) {
    console.log(data)
    navigate('finish')
  }

  function validationPasswordConfirmation(passwordConfirmation: string) {
    const { password } = getValues()
    return password === passwordConfirmation || 'As senhas devem ser iguais'
  }

  const passwordCofirmationRef = useRef<TextInput>(null)

  return (
    <View style={styles.container}>
      <Progress progress={100} />
      <Text style={styles.title}>Escolha sua senha</Text>
      <Input
        icon='key'
        error={errors.password?.message}
        formProps={{
          name: 'password',
          control,
          rules: {
            required: 'Senha é obrigatorio',
            minLength: {
              value: 6,
              message: 'Senha precisa ter pelo menos 6 digitos',
            },
          },
        }}
        inputProps={{
          placeholder: 'Senha',
          onSubmitEditing: () => passwordCofirmationRef.current?.focus(),
          returnKeyType: 'next',
          secureTextEntry: true,
        }}
      />
      <Input
        error={errors.passwordConfirmation?.message}
        ref={passwordCofirmationRef}
        icon='key'
        formProps={{
          name: 'passwordConfirmation',
          control,
          rules: {
            required: 'Confirme a senha',
            validate: validationPasswordConfirmation,
          },
        }}
        inputProps={{
          placeholder: 'Confirme a senha',
          onSubmitEditing: handleSubmit(handleNextStep),
          secureTextEntry: true,
        }}
      />

      <Button title='Continuar' onPress={handleSubmit(handleNextStep)} />
    </View>
  )
}
