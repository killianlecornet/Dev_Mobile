import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {Image,ScrollView } from 'react-native';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

const Login = (props) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    axios({
      method: 'POST',
      url: 'https://login.hikkary.com/users/login',
      data: {
        username: inputs.email,
        password: inputs.password,
      },
    })
      .then(res => {
        console.log(res.headers['x-access-token']);
        AsyncStorage.setItem('token', res.headers['x-access-token'])
          .then(() => {
            navigation.navigate('Home');
          })
          .catch(err => {
            console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
          });
      })
      .catch(err => {
        console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
      });
  };

  const handleNavigation = page => {
    props.navigation.navigate(page);
  };

  return (
    <ScrollView>
      <Container>
        <StyledTextTitle>Cats</StyledTextTitle>
        <ImageContainer>
          <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: "https://cdn.pixabay.com/photo/2016/06/28/13/50/cat-1484725_1280.png" }}
            />
        </ImageContainer>

        <InputContainer>
          <TextInputStyled
            placeholder="Email"
            value={inputs.email}
            onChangeText={text => setInputs({ ...inputs, email: text })}
          />
        </InputContainer>
        <InputContainer>
          <TextInputStyled
            placeholder="Password"
            value={inputs.password}
            onChangeText={text => setInputs({ ...inputs, password: text })}
          />
        </InputContainer>
        <Touchable onPress={handleLogin}>
          <StyledText>LOGIN</StyledText>
        </Touchable>
      </Container>
    </ScrollView>
  );
};

const StyledTextTitle = styled.Text`
  font-size: 40px;
  margin-top:30px;
  text-align:center;

`;

const ImageContainer = styled.View`
  margin-top:50px;
  margin-left:90px;
  margin-bottom:50px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
`;

const InputContainer = styled.View`
  margin: 4px;
`;
const StyledTextButton = styled.TextInput`
color: black;
text-align:center;
`;

const TextInputStyled = styled.TextInput`
  background-color: white;
  padding: 12px;
  color: black;
`;

const Touchable = styled.TouchableOpacity``;

const StyledText = styled.Text`
  color: black;
  text-align:center;
  font-size:15px;
  margin-top:10px;
`;

const Container = styled.View`
  flex: 1;
`;

export default Login;