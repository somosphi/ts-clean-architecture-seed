export const converter = (content: any): Buffer => {
  switch (typeof content) {
    case 'object':
      return Buffer.from(JSON.stringify(content));
    case 'string':
      return Buffer.from(String(content));
    default:
      return Buffer.from('');
  }
};

export const convert_to_json = (content: Buffer): any => {
  return JSON.parse(content.toString());
};
