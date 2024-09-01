import React from 'react'
import { Header } from "../../page";
const page = ({params}:{params:{
    artistId:string
}}) => {
    return (
        <div>
          <Header />
          <div>aca va {params.artistId}</div>
        </div>
      );
}

export default page