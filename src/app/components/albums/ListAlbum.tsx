import Image from "next/image";
import { Album } from "./../../Interfaces/AlbumInterface";
import { AlbumCard } from "./AlbumCard";

const data: Album[] = [
    {
        id: "1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4m6SACBoLTlFLvgzPOzCMQ3Fx6LvYiMg0dsb8di_VUg&s",
        name: "From mars To Sirius",
        artist: [
            {
                name: "Gojira",
            },
            {
                name: "Iron Maiden",
            },
        ],
    },
    {
        id: "2",
        image: "https://i.scdn.co/image/ab67616d00001e026ac3ed972e1c181cd2ee8d55",
        name: "Iron Maiden",
        artist: [
            {
                name: "Iron Maiden",
            },
        ],
    },
    {
        id: "3",
        image: "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
        name: "The Adults Are Talking",
        artist: [
            {
                name: "The Strokes",
            },
        ],
    },
    {
        id: "4",
        image: "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
        name: "The Adults Are Talking",
        artist: [
            {
                name: "The Strokes",
            },
        ],
    },
    {
        id: "5",
        image: "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
        name: "The Adults Are Talking",
        artist: [
            {
                name: "The Strokes",
            },
        ],
    },
    {
        id: "6",
        image: "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
        name: "The Adults Are Talking",
        artist: [
            {
                name: "The Strokes",
            },
        ],
    },
    {
        id: "7",
        image: "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
        name: "The Adults Are Talking",
        artist: [
            {
                name: "The Strokes",
            },
        ],
    },
    {
        id: "8",
        image: "https://i.scdn.co/image/ab67616d00001e026ac3ed972e1c181cd2ee8d55",
        name: "Iron Maiden",
        artist: [
            {
                name: "Iron Maiden",
            },
        ],
    },
    {
        id: "9",
        image: "https://i.scdn.co/image/ab67616d00001e026ac3ed972e1c181cd2ee8d55",
        name: "Iron Maiden",
        artist: [
            {
                name: "Iron Maiden",
            },
        ],
    },
    {
        id: "10",
        image: "https://i.scdn.co/image/ab67616d00001e026ac3ed972e1c181cd2ee8d55",
        name: "Iron Maiden",
        artist: [
            {
                name: "Iron Maiden",
            },
        ],
    },
];

export default function ({onAddLikedAlbum}:{onAddLikedAlbum:Function}) {
    return (
        <>
            <div className="flex-col items-center justify-between grid mobil:grid-cols-[repeat(1,minmax(0,1fr))] grid-cols-[repeat(2,minmax(0,1fr))]  sm:grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(5,minmax(0,1fr))] gap-3 p-12 sm:p-24 ">
                {data.map(function (album) {
                    return (
                        <div className="" key={'divAlbumCard_'+album.id}>
                            <AlbumCard onAddLikedAlbum={onAddLikedAlbum}  key={album.id} album={album} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
