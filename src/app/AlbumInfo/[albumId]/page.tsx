import { Header } from "../../page";
export default function albumDetail({params}:{
    params:{
        albumId:string
    }
}) {
  return (
    <div>
      <Header />
      <div>aca va {params.albumId}</div>
    </div>
  );
}
