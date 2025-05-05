import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Text, View } from 'react-native'

export function Finish() {
  const { getValues } = useFormContext<AccountProps>()
  const accountFormData = getValues()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nome: {accountFormData.name}</Text>
      <Text>Email: {accountFormData.email}</Text>
      <Text>Telefone: {accountFormData.phone}</Text>
      <Text>Data de nascimento: {accountFormData.birth}</Text>
      <Text>
        Senha: {accountFormData.password} /{' '}
        {accountFormData.passwordConfirmation}
      </Text>
    </View>
  )
}
