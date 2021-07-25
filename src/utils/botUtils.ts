import IMessageNode from "../interfaces/IMessageNode";

export const formatOptions = (options: IMessageNode[] | undefined | null, formatBackOption: boolean) => {
  if (!options || options.length === 0) return "";

  const sortedOptions = options.sort((a, b) => a.position - b.position);
  let formattedMessage = sortedOptions.reduce((acc, curr, index) => {
    return `${acc}${curr.position + 1}) ${curr.title}${index < sortedOptions.length - 1 ? "\n" : ""}`;
  }, "");
  if(formatBackOption)
    formattedMessage = `${formattedMessage}\n0) Voltar`
  return formattedMessage;
};

export const formatNodeMessage = (node: IMessageNode, formatBackOption = true) => {
  const optionsMessage = formatOptions(node.options, formatBackOption);
  return `${node.message}\n${optionsMessage}`;
};

export const getOptionFromMessage = (message: string, node: IMessageNode) => {
  const parsedIndex = parseInt(message) - 1;
  if (parsedIndex == null) return null;
  if (parsedIndex === -1) return node.parentNode;
  return node.options?.find((option) => option.position === parsedIndex);
};

export const isEndNode = (node: IMessageNode) => {
  return !Boolean(node.options?.length);
};
