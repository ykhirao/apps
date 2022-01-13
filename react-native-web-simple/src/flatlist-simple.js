import React from 'react'
import { SafeAreaView, View, FlatList, Text } from 'react-native'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item'
  }
]

function Item({ title }) {
  // FlatList はstyle半円されない
  return <Text>{title}ここがリストになる</Text>
}

export default function App() {
  return (
    <SafeAreaView>
      <FlatList
        style={[{ fontSize: '50px' }]} // style効かないよ！！
      />
      <View style={[{ fontSize: '50px' }]}>ここはエラーがでる</View>
      {/* Unexpected text node: ここはエラーがでる. A text node cannot be a child of a <View>. */}
      <View>
        <Text>ここはエラーがでない</Text>
      </View>
    </SafeAreaView>
  )
}
