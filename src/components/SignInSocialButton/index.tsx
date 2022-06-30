import {
  Button,
  ImageContainer,
  Title
} from './styles';

import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

interface SignInSocialButtonProps extends RectButtonProps {
  title: string,
  svg: React.FC<SvgProps>
}

const SignInSocialButton = ({
  title,
  svg: Svg,
  ...rest
}: SignInSocialButtonProps) => {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Title>{title}</Title>
    </Button>
  );
}

export default SignInSocialButton;