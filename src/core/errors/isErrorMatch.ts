interface ErrorStructure {
  code: string;
}
export const isAwsErrorMatch = (
  forCheckError: any,
  AwsErrorStructure: ErrorStructure,
) => {
  return AwsErrorStructure.code === forCheckError.code;
};
