import IMessage from "./IMessage";

export default interface IMessageNode {
  message: IMessage[];
  position: number;
  title?: string | null;
  parentNode?: IMessageNode | null;
  options?: IMessageNode[] | null,
  isRootNode: boolean,
}