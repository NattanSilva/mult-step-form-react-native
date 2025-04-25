import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Finish } from '../screens/Finish'
import { FormStepOne } from '../screens/FormStepOne'
import { FormStepThree } from '../screens/FormStepThree'
import { FormStepTwo } from '../screens/FormStepTwo'

const { Navigator, Screen } = createNativeStackNavigator()

export function AccountRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Screen name='formStepOne' component={FormStepOne} />
      <Screen name='formStepTwo' component={FormStepTwo} />
      <Screen name='formStepThree' component={FormStepThree} />
      <Screen name='finish' component={Finish} />
    </Navigator>
  )
}
