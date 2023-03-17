import React from 'react';
import { Text, View } from 'react-native';
import Cats from '../components/cats';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  return (
    <View>
      <Cats></Cats>
    </View>
  );
};

export default Home;