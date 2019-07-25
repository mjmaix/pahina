import styled from 'styled-components/native';

export const StyledLink = styled.Text.attrs(props => {
  return {};
})`
  color: #0000ee;
  text-decoration: underline;
`;

export const StyledPrice = styled.Text`
  ${props => ({
    fontSize: 18,
    fontWeight: 500,
    color: props.theme.colors.primarydark,
  })}
`;
export const StyledPriceInfo = styled.Text`
  ${props => ({
    fontSize: 14,
    fontWeight: 300,
    textAlign: 'center',
    color: props.theme.colors.grey2,
  })}
`;
