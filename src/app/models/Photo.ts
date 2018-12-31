export default class Photo {
  path: string;
  comments: Array<{
    idUser: string,
    text: string
  }>;
  likes: Array<string>;
  isCurrent: boolean;
}
