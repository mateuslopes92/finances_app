import { Alert, Animated } from 'react-native';
import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  SignInTitle,
  Title,
  TitleWrapper
} from './styles';
import React, { useEffect } from 'react';

import AppleIcon from '../../assets/apple.svg';
import GoogleIcon from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import SignInSocialButton from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/Auth';

const SignIn: React.FC = () => {
  const opacity = new Animated.Value(0);
  const translate = new Animated.Value(-400);

  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Error on authentication with Google account')
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
          <SignInSocialButton title="Sign in with Apple" svg={AppleIcon} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}

export default SignIn;