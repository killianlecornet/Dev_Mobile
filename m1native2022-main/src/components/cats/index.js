import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';


const Cats = () => {
  const [catData, setCatData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [catName, setCatName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);


  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Fav');
  };


  const handleSearch = () => {
    setIsLoading(true);
    fetch(`https://api.api-ninjas.com/v1/cats?name=${catName}`, {
      headers: {
        'X-Api-Key': '+EE3rzRROKjcjjQoTerfmQ==xhS1E9NrXp7ed6PR'
      }
    })
      .then(response => response.json())
      .then(data => {
        setCatData(data[0]);
        setIsLoading(false);
        setIsFavorite(false);
      })
      .catch(error => console.log(error));
  };

  const saveToFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites !== null) {
        const parsedFavorites = JSON.parse(favorites);
        parsedFavorites.push(catData);
        await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));
      } else {
        await AsyncStorage.setItem('favorites', JSON.stringify([catData]));
      }
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        console.log(favorites);
        if (favorites !== null) {
          const parsedFavorites = JSON.parse(favorites);
          const isCatFavorite = parsedFavorites.some(cat => cat.name === catData?.name);
          setIsFavorite(isCatFavorite);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkIfFavorite();
  }, [catData]);

  return (
    <View>
      <TextInput
        onChangeText={setCatName}
        placeholder="Enter a cat breed"
        value={catName}
      />
      <Button title="Search" onPress={handleSearch} disabled={!catName} />
      <Button title="Favori" onPress={handlePress}/>
      {isLoading ? (
        <ActivityIndicator />
      ) : catData ? (
          <View>
            <ImageContainer>
              <Image
                style={{ width: 300, height: 300 }}
                source={{ uri: catData.image_link }}
              />
            </ImageContainer>
            <StyledTextContainer>
              <StyledText>{catData.name}</StyledText>
              <StyledText>{catData.origin}</StyledText>
            </StyledTextContainer>
            {isFavorite ? (
              <StyledTextFavorites>Already in favorites</StyledTextFavorites>
            ) : (
              <Button title="Add to favorites" onPress={saveToFavorites} />
            )}
          </View>
      ) : (
        <Text>No cat found</Text>
      )}
    </View>
  );
};

const StyledTextContainer = styled.View `
  margin-top:10%;
  margin-bottom:10%;
`;

const StyledText = styled.Text `
  font-size:20px;
  text-align:center;
`;

const ImageContainer = styled.View `
  margin-left:12.5%;
  margin-top:20%;
`;

const StyledTextFavorites = styled.Text `
  color:green;
  text-align:center;
`;

export default Cats;
