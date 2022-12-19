export const parseXML = (xmlStr: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlStr, "application/xml");

  const errorNode = doc.querySelector("parsererror");

  if (errorNode) {
    throw new Error("Error while parsing XML");
  } else {
    return doc;
  }
};
