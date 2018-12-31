import Photo from "./Photo";
import Comment from "./Comment";

export default class Event {
  _id: string;
  title: string;
  description: string;
  photos: Photo[];
  theme: string;
  likes: Array<string>;
  holdingDate: string;
  location: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  creatorAvatar: string;
}
