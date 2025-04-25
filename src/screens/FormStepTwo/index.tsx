import { useNavigation } from '@react-navigation/native'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Progress } from '../../components/Progress'
import { styles } from './styles'

export function FormStepTwo() {
  const { navigate } = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<AccountProps>()

  function handleNextStep() {
    navigate('formStepThree')
  }

  const phoneRef = useRef<TextInput>(null)

  return (
    <View style={styles.container}>
      <Progress progress={60} />
      <Text style={styles.title}>Suas informações</Text>
      <Input
        icon='calendar'
        error={errors.birth?.message}
        formProps={{
          name: 'birth',
          control,
          rules: {
            required: 'Data de nascimento é obrigatorio',
            pattern: {
              value:
                /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
              message: 'Data de nascimento inválida',
            },
          },
        }}
        inputProps={{
          placeholder: 'Data de nascimento',
          onSubmitEditing: () => phoneRef.current?.focus(),
          returnKeyType: 'next',
        }}
      />
      <Input
        error={errors.phone?.message}
        ref={phoneRef}
        icon='phone'
        formProps={{
          name: 'phone',
          control,
          rules: {
            required: 'Telefone é obrigatorio',
            pattern: {
              value:
                /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{7}))$/,
              message: 'Telefone inválido',
            },
          },
        }}
        inputProps={{
          placeholder: 'Telefone',
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />

      <Button title='Continuar' onPress={handleSubmit(handleNextStep)} />
    </View>
  )
}
