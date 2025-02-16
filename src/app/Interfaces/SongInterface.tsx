export interface Song {
  songId: string;
  name: string;
  duration: string;
  numberSong: number;
  explicit: boolean;
  file: File | undefined;
  loaded: boolean | undefined;
  edited:boolean|undefined;
  nameFile:string;
}
