import { Songs } from '@/app/Interfaces/Response/Response'
import React from 'react'
import CardSong from './CardSong'
import { Album, APIResponseItem } from '@/app/Interfaces/AlbumInterface'


export default function  ListSong ({data,artists,albumData}:{data:Songs[],artists:APIResponseItem[]|undefined,albumData:Album|undefined}){
    return (
        <>
        <div className='flex flex-col'>
        {data.map((song, index) => (
                <CardSong nextSong={data[index+1]?data[index+1]:null} previousSong={data[index-1]?data[index-1]:null} albumData={albumData}  isEven={index%2===0} key={index} song={song} artists={artists} />
            ))}
        </div>
          
        </>
    )
}