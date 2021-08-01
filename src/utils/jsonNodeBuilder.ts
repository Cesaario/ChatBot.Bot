import MessageType from "../constants/enums/MessageType";
import IMessageNode from "../interfaces/IMessageNode";
import IMessageText from "../interfaces/IMessageText";

interface NodeObject {
  messages: { type: MessageType; content: any; text: string }[];
  position: number;
  title?: string | null;
  parentNode?: NodeObject | null;
  options?: NodeObject[] | null;
  isRootNode: boolean;
}

export const buildNode = (jsonNode: NodeObject) => {
  const { options, messages, title, position, isRootNode } = jsonNode;
  const createdMessages = messages.map((message) => createMessage(message.type, message.content, message.text));
  if (!options?.length) {
    const createdNode: IMessageNode = {
      message: createdMessages,
      title,
      position,
      isRootNode: Boolean(isRootNode),
    };
    return createdNode;
  }
  const createdOptions = options.map((option) => buildNode(option));
  const createdNode: IMessageNode = {
    message: createdMessages,
    title,
    position,
    isRootNode: Boolean(isRootNode),
    options: createdOptions,
  };
  createdOptions.forEach(
    (createdOption) => (createdOption.parentNode = createdNode)
  );
  console.log(createdNode);
  return createdNode;
};

export const createMessage = (
  type: MessageType,
  content: any,
  text: string
) => {
  if (type === MessageType.TEXT) {
    const createdMessage: IMessageText = {
      type,
      text,
    };
    return createdMessage;
  }
  const emptyMessage: IMessageText = {
    type: MessageType.TEXT,
    text: "Erro :(",
  };
  return emptyMessage;
};
