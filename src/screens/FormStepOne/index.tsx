import { useNavigation } from '@react-navigation/native'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Progress } from '../../components/Progress'
import { styles } from './styles'

export function FormStepOne() {
  const { navigate } = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<AccountProps>()

  function handleNextStep() {
    navigate('formStepTwo')
  }

  const emailRef = useRef<TextInput>(null)

  return (
    <View style={styles.container}>
      <Progress progress={30} />
      <Text style={styles.title}>Criar sua conta</Text>
      <Input
        icon='user'
        error={errors.name?.message}
        formProps={{
          name: 'name',
          control,
          rules: { required: 'Nome é obrigatorio' },
        }}
        inputProps={{
          placeholder: 'Nome',
          onSubmitEditing: () => emailRef.current?.focus(),
          returnKeyType: 'next',
        }}
      />
      <Input
        error={errors.email?.message}
        ref={emailRef}
        icon='mail'
        formProps={{
          name: 'email',
          control,
          rules: {
            required: 'E-mail é obrigatorio',
            pattern: {
              value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i,
              message: 'E-mail invalido',
            },
          },
        }}
        inputProps={{
          placeholder: 'E-mail',
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />

      <Button title='Continuar' onPress={handleSubmit(handleNextStep)} />
    </View>
  )
}
