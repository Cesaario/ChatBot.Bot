import User from "./interfaces/User";
import { Bot } from "./bot";
import IMessageNode from "./interfaces/IMessageNode";

const users: User[] = [];

export const getUserCurrentNode = (number: string) => {
  const currentUser = users.find((user) => user.number === number);
  if (!currentUser) {
    const newUser: User = {
      number,
      currentNode: Bot.rootNode,
    };
    users.push(newUser);
    return { node: Bot.rootNode, firstMessage: true };
  }
  return { node: currentUser.currentNode, firstMessage: false };
};

export const updateUserNode = (number: string, node: IMessageNode) => {
  const user = users.find((us) => us.number === number);
  if (user) user.currentNode = node;
  else throw new Error("User does not exist :(");
};
