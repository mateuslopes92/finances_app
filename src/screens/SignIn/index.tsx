import { ActivityIndicator, Alert, Animated, Platform } from 'react-native';
import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  SignInTitle,
  Title,
  TitleWrapper
} from './styles';
import React, { useEffect, useState } from 'react';

import AppleIcon from '../../assets/apple.svg';
import GoogleIcon from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import SignInSocialButton from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/Auth';
import { useTheme } from 'styled-components';

const SignIn: React.FC = () => {
  const opacity = new Animated.Value(0);
  const translate = new Animated.Value(-400);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();

  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Error on authentication with Google account')
    } 
  }

  const handleSignInWithApple = async () => {
    try {
      setLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Error on authentication with Apple account')
    }
  }

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();

    Animated.timing(translate, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true
    }).start();
  });

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title style={{ opacity }}>
            Manage your {'\n'}
            finances in an {'\n'}
            easy way
          </Title>

          <SignInTitle style={{ opacity }}>
            Make your login with {'\n'}
            one of accounts below
          </SignInTitle>
        </TitleWrapper>

      </Header>
      <Footer>
        <FooterWrapper style={{
          transform: [
            {
              translateX: translate
            }
          ]
        }}>
          <SignInSocialButton title="Sign in with Google" svg={GoogleIcon} onPress={handleSignInWithGoogle} />
          {
            Platform.OS === 'ios' && <SignInSocialButton title="Sign in with Apple" svg={AppleIcon} onPress={handleSignInWithApple} />
          }
        </FooterWrapper>

        {
          loading 
            ? (
              <ActivityIndicator
                size="large"
                color={theme.colors.shape} 
                style={{ marginTop: 18 }}
              />
            )
            : null
        }

      </Footer>
    </Container>
  );
}

export default SignIn;