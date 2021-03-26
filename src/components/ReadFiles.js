export const readAllFiles = async (allFiles, setFileContent) => {
  const results = await Promise.all(
    allFiles.map(async (file) => {
      return await readFileContents(file, setFileContent);
    })
  );

  return results;
};
const readFileContents = (file, setFileContent) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      const files = event.target.result;

      var convert = require("xml-js");
      const regex = /<\!\[CDATA\[|\]\]>/g;
      const xml = files.replace(regex, "");
      let result = convert.xml2json(xml, { compact: true, spaces: 4 });

      setFileContent((values) => values.concat(JSON.parse(result)));
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.onabort = reject;
    reader.readAsText(file);
  });
};
