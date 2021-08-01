import { Whatsapp } from "venom-bot";
import MessageType from "../constants/enums/MessageType";
import IMessage from "../interfaces/IMessage";
import IMessageNode from "../interfaces/IMessageNode";
import IMessageText from "../interfaces/IMessageText";

export const formatOptions = (
  options: IMessageNode[] | undefined | null,
  formatBackOption: boolean
) => {
  if (!options || options.length === 0) return "";

  const sortedOptions = options.sort((a, b) => a.position - b.position);
  let formattedMessage = sortedOptions.reduce((acc, curr, index) => {
    return `${acc}${curr.position + 1}) ${curr.title}${
      index < sortedOptions.length - 1 ? "\n" : ""
    }`;
  }, "");
  if (formatBackOption) formattedMessage = `${formattedMessage}\n0) Voltar`;
  return formattedMessage;
};

export const sendNodeMessages = (
  node: IMessageNode,
  client: Whatsapp,
  user: string,
  formatBackOption = true
) => {
  const { options, message: messages } = node;

  messages.forEach(async (message, index) => {
    if (message.type === MessageType.TEXT)
      await sendTextMessage(client, message as IMessageText, user);
    if (index === messages.length - 1 && node.options && node.options.length > 0) {
      const optionsMessage = formatOptions(options, formatBackOption);
      client.sendText(user, optionsMessage);
    }
  });
};

const sendTextMessage = (
  client: Whatsapp,
  message: IMessageText,
  user: string
) => {
  return client.sendText(user, message.text);
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
