export default interface IMessageNode {
  message: string;
  position: number;
  title?: string | null;
  parentNode?: IMessageNode | null;
  options?: IMessageNode[] | null,
  isRootNote: boolean,
}