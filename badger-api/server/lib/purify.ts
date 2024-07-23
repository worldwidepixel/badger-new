import DOMPurify from "isomorphic-dompurify";

export async function purifyOutput(input: string): Promise<String> {
  const cleanOutput = DOMPurify.sanitize(input);
  return cleanOutput;
}
