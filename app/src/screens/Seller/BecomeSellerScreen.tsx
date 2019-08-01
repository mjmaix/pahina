import React, { useState } from 'react';
import _ from 'lodash';
import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  ImageBackground,
  StatusBar,
  Linking,
  LayoutRectangle,
} from 'react-native';
import styled from 'styled-components/native';

import {
  StyledScreenContainer,
  containerStyles,
  FooterButton,
  StyledButton,
  StyledScrollView,
} from '../../components';
import PromoImage from '../../../assets/images/andrew-neel-cckf4TsHAuw-unsplash.jpg';
import { StyleGuide } from '../../themes';
import { ConfigConsumer } from '../../stores';
import { alertFail, hexToRgbA } from '../../utils';

const Background = styled(ImageBackground).attrs({
  resizeMode: 'cover',
  source: Image.resolveAssetSource(PromoImage),
})`
  flex: 1;
`;

const ContentContainer = styled(StyledScreenContainer)`
  ${props => ({
    ...containerStyles.transparent,
  })}
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    hexToRgbA(props.theme.colors.greyBackground, 0.3)};
`;

const Scroll = styled(StyledScrollView).attrs(props => ({
  contentContainerStyle: {
    ...containerStyles.transparent,
  },
}))``;

const HeaderText = styled.Text`
  font-size: 32;
  font-weight: 900;
  color: white;
  text-align: center;
`;

const SubText = styled.Text`
  font-size: 20;
  font-weight: 600;
  color: white;
  text-align: center;
`;

const LinkButton = styled(StyledButton).attrs(props => ({
  titleProps: {
    numberOfLines: 2,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3366BB',
    textDecorationLine: 'underline',
  },
  type: 'clear',
}))``;

const SectionContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const BulletContainer = styled.View`
  padding-top: ${StyleGuide.gap.xl};
  padding-bottom: ${StyleGuide.gap.xl};
  padding-left: ${StyleGuide.gap.xl};
  padding-right: ${StyleGuide.gap.xl};
  margin-top: ${StyleGuide.gap.xl};
  margin-bottom: ${StyleGuide.gap.xl};
  margin-left: ${StyleGuide.gap.xl};
  margin-right: ${StyleGuide.gap.xl};
  /* background-color: ${props =>
    hexToRgbA(props.theme.colors.greyBackground, 0.3)}; */
  /* border-radius: 15; */
`;

const PromoText = styled.Text`
  font-size: 18;
  font-weight: 500;
  text-align: justify;
  line-height: 28;
`;

export const BecomeSellerScreen = () => {
  return (
    <ConfigConsumer>
      {config => {
        const { data } = config;
        const link = data && data.webBecomeSellerLearnMore;

        return (
          <Background>
            <ContentContainer>
              <Scroll
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <StatusBar barStyle="light-content" />
                <HeaderText>Become a seller</HeaderText>
                <SubText>Write and publish case digests.</SubText>

                <SectionContainer>
                  <LinkButton
                    label="Pahina Seller App homepage"
                    onPress={() => {
                      if (link) {
                        Linking.openURL(link);
                      }
                    }}
                  />
                </SectionContainer>

                <SectionContainer>
                  <BulletContainer>
                    <PromoText>{`Are you a law student? law professional? Pahina is the perfect marketplace to find and sell case digests. No additional registration is needed.`}</PromoText>
                    <PromoText />
                    <PromoText>{`Choose through thousands of Decisions / Signed Resolutions (Supreme Court, Court Appeals, Laws, Executive Issuances, References, and Treaties) catalog`}</PromoText>
                    <PromoText />
                    <PromoText>{`Publish case digests under your name, be it newly written or your old saved notes.`}</PromoText>
                    <PromoText />
                    <PromoText>{`Use the Seller App website's online editor to draft/edit beautiful and concise case digests. Then manually publish to start earning.`}</PromoText>
                  </BulletContainer>
                </SectionContainer>
              </Scroll>
            </ContentContainer>

            <FooterButton
              buttonProps={{
                title: 'Learn more ',

                onPress: async () => {
                  if (link) {
                    await WebBrowser.openBrowserAsync(link);
                  } else {
                    alertFail(() => null, {
                      message: 'Learn more failed to open.',
                    });
                  }
                },
              }}
              opacity={0.5}
            />
          </Background>
        );
      }}
    </ConfigConsumer>
  );
};
