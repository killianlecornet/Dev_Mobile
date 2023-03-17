import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Button,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites !== null) {
          const parsedFavorites = JSON.parse(favorites);
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFavorites();
  }, []);

  const renderItem = ({ item }) => {
    const handleRemove = async () => {
      const updatedFavorites = favorites.filter(fav => fav.name !== item.name);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
      <View>
        <ImageContainer>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: item.image_link }}
          />
        </ImageContainer>
        <StyledTextContainer>
          <StyledTextCats>{item.name}</StyledTextCats>
          <StyledTextCats>{item.origin}</StyledTextCats>
        </StyledTextContainer>
        <Button title="Remove" onPress={handleRemove} />
      </View>
    );
  };

  return (
    <ScrollView>
    <View>
      <Touchable onPress={() => navigation.goBack()}>
        <StyledText>Go Back</StyledText>
      </Touchable>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No favorites yet</Text>
      )}
    </View>
    </ScrollView>
  );
};

const Touchable = styled.TouchableOpacity``;

const StyledText = styled.Text`
  color: black;
  font-size:15px;
`;
const StyledTextCats = styled.Text `
  font-size:20px;
  text-align:center;
`;
const StyledTextContainer = styled.View `
  margin-top:5%;
  margin-bottom:5%;
`;
const ImageContainer = styled.View `
  margin-left:25%;
  margin-top:5%;
`;

export default Favorites;
