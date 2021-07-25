import IMessageNode from "../interfaces/IMessageNode";

export const formatOptions = (options?: IMessageNode[] | null) => {
  if (!options || options.length === 0) return "";

  const sortedOptions = options.sort((a, b) => a.position - b.position);
  const formattedMessage = sortedOptions.reduce((acc, curr) => {
    return `${acc}${curr.position + 1}) ${curr.title}\n`;
  }, "");
  return formattedMessage;
};

export const formatNodeMessage = (node: IMessageNode) => {
  const optionsMessage = formatOptions(node.options);
  return `${node.message}\n${optionsMessage}`;
};

export const getOptionFromMessage = (
  message: string,
  options: IMessageNode[] | null | undefined
) => {
  const parsedIndex = parseInt(message) - 1;
  if (parsedIndex == null) return null;
  return options?.find((option) => option.position === parsedIndex);
};

export const isEndNode = (node: IMessageNode) => {
  return !Boolean(node.options?.length);
}
