import { Div, H } from '../../../customized'
import { ActivityIndicator, Text, View } from 'react-native'

const ScreenEmpty = () => {
  return (
    <Div s='f c'>
      <ActivityIndicator size="large" color='black' />
      <Text></Text>
      <Text></Text>
      <H>Loading ...</H>
    </Div>
  )
}

export default ScreenEmpty