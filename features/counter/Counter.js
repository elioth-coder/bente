import React from 'react'
import { 
    Button,
    Text,
    HStack,
} from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <HStack h="12" space="5">
        <Button size="lg"
            onPress={() => dispatch(increment())}>
            Increment
        </Button>
        <Button size="lg" 
            onPress={() => dispatch(decrement())}>
            Decrement
        </Button>
        <Text fontSize="2xl">{count}</Text>
    </HStack>
  )
}