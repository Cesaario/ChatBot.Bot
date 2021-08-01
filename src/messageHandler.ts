import { Message } from "venom-bot";
import { getUserCurrentNode, updateUserNode } from "./activeUsers";
import {
  sendNodeMessages,
  getOptionFromMessage,
  isEndNode,
} from "./utils/botUtils";
import { client } from "./index";

export const messageHandler = (message: Message) => {
  const user = message.from;
  const { node: currentNode, firstMessage } = getUserCurrentNode(user);
  if (firstMessage) {
    sendNodeMessages(currentNode, client, user, false);
    return;
  }
  const optionSelected = getOptionFromMessage(message.body, currentNode);
  if (!optionSelected) {
    client.sendText(user, "Essa opção não existe :(");
    return;
  }
  if (!isEndNode(optionSelected)) updateUserNode(user, optionSelected);
  sendNodeMessages(optionSelected, client, user, !optionSelected.isRootNode);
};
