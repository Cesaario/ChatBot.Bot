import { Message } from "venom-bot";
import { getUserCurrentNode, updateUserNode } from "./activeUsers";
import {
  formatNodeMessage,
  getOptionFromMessage,
  isEndNode,
} from "./utils/botUtils";
import { client } from "./index";

export const messageHandler = (message: Message) => {
  const user = message.from;
  const { node: currentNode, firstMessage } = getUserCurrentNode(user);
  if (firstMessage) {
    const formattedMessage = formatNodeMessage(currentNode);
    client.sendText(user, formattedMessage);
    return;
  }
  const optionSelected = getOptionFromMessage(
    message.body,
    currentNode.options
  );
  if (!optionSelected) {
    client.sendText(user, "Essa opção não existe :(");
    return;
  }
  if (!isEndNode(optionSelected)) updateUserNode(user, optionSelected);
  const formattedMessage = formatNodeMessage(optionSelected);
  client.sendText(user, formattedMessage);
};