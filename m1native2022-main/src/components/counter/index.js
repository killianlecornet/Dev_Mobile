import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={{backgroundColor: 'white', fontSize: 40}}>
      <Text style={{fontSize: 40}}>{count}</Text>
      <Button title="+" onPress={() => setCount(count + 1)} />
      <Button title="-" onPress={() => setCount(count - 1)} />
    </View>
  );
};

export default Counter;
