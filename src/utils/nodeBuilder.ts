import IMessageNode from "../interfaces/IMessageNode";

export const createNode = (
  message: string,
  title = "",
  position = 0,
  parentNode?: IMessageNode | null,
  isRootNode = false,
) => {
  const node: IMessageNode = {
    title,
    message,
    position,
    parentNode,
    isRootNote: isRootNode,
  };
  return node;
};

export const addOptions = (parent: IMessageNode, ...children: IMessageNode[]) => {
  let currentOptions = parent.options;
  children.forEach((child) => (child.parentNode = parent));
  if (!currentOptions) currentOptions = [...children];
  else currentOptions = [...currentOptions, ...children];
  const resultNode: IMessageNode = { ...parent, options: currentOptions };
  return resultNode;
};
