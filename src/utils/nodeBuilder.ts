import MessageType from "../constants/enums/MessageType";
import IMessage from "../interfaces/IMessage";
import IMessageNode from "../interfaces/IMessageNode";
import IMessageText from "../interfaces/IMessageText";

interface MessageProps {
  type: MessageType;
  content: any;
}

export interface NodeProps {
  message: MessageProps[];
  title: string;
  position: number;
  parentNode?: IMessageNode;
  isRootNode: boolean;
}

export const createNode = (props: NodeProps) => {
  const { message, title, position, parentNode, isRootNode } = props;

  const messageCreated: IMessage[] = message.map((msg) => {
    return createMessage(msg.type, msg.content);
  });

  const node: IMessageNode = {
    title,
    message: messageCreated,
    position,
    parentNode,
    isRootNode,
  };
  return node;
};

export const createMessage = (type: MessageType, content: any) => {
  if (type === MessageType.TEXT) {
    const createdMessage: IMessageText = {
      type,
      text: content,
    };
    return createdMessage;
  }
  const emptyMessage: IMessageText = {
    type: MessageType.TEXT,
    text: "Erro :(",
  };
  return emptyMessage;
};

export const addOptions = (
  parent: IMessageNode,
  ...children: IMessageNode[]
) => {
  let currentOptions = parent.options;
  if (!currentOptions) currentOptions = [...children];
  else currentOptions = [...currentOptions, ...children];
  const resultNode: IMessageNode = { ...parent, options: currentOptions };
  children.forEach((child) => (child.parentNode = resultNode));
  return resultNode;
};
