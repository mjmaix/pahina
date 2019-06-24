declare module 'aws-amplify-react' {
  export function withAuthenticator(
    Comp: any,
    includeGreetings?: boolean,
    authenticatorComponents?: any,
    federated?: any,
    theme?: any,
    signUpConfig?: any,
  ): React.ComponentType;
}
