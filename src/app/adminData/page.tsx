"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CirclePlus,
  UserPlus,
  DiscAlbum,
  Plus,
  AlertCircle,
  AudioLines,
  Calendar as CalendarIcon,
  Trash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fecthToUse } from "../components/utilities/fetchReuse";
import { DefaultResponse } from "@/app/Interfaces/Response/Response";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Artist } from "../Interfaces/ArtistInterface";
import { Gender } from "../Interfaces/GenderInterface";
import { Song } from "../Interfaces/SongInterface";
import { Album } from "../Interfaces/AlbumInterface";
import { calcSecs } from "../components/Songs/CardSong";

import { div } from "framer-motion/client";

interface typeAlbumError {
  title: string;
  artist: string;
  year: string | undefined;
  image: string;
  genre: string;
}
interface typeSongError {
  album: string;
  artist: string;
  songs: string;
}
interface typeAlbumForm {
  title: string;
  artist: string;
  year: string | undefined;
  genre: string;
  image: File | undefined;
}
interface typeSongForm {
  artist: string;
  album: string;
  songs: Song[];
}
const AdminDataPage = () => {
  const jwtToken = Cookies.get("jwtTokenDataMusic");
  const [activeTab, setActiveTab] = useState("genre");
  const [formGenre, setFormGenre] = useState({ name: "" });
  const [formArtist, setFormArtist] = useState({ name: "" });
  const [formAlbum, setFormAlbum] = useState<typeAlbumForm>({
    title: "",
    artist: "",
    year: "",
    genre: "",
    image: undefined,
  });
  const [formSongs, setFormSongs] = useState<typeSongForm>({
    album: "",
    artist: "",
    songs: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [errorForArtist, setErrorForArtist] = useState<string | null>(null);
  const [errorAlbum, setErrorAlbum] = useState<typeAlbumError>({
    title: "",
    artist: "",
    year: "",
    image: "",
    genre: "",
  });

  const [errorSong, setErrorSong] = useState<typeSongError>({
    album: "",
    artist: "",
    songs: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [genres, setGenres] = useState<Gender[]>([]);
  const [dateReleaseAlbum, setDateReleaseAlbum] = useState<Date>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [songsList, setSongsList] = useState<Song[]>([]);
  const [isDialogDeleteSongOpen, setIsDialogDeleteSongOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<string | null>(null);

  const handleDeleteSongClick = (song: Song) => {
    if (song.loaded) {
      setSongToDelete(song.songId);
      setIsDialogDeleteSongOpen(true);
    } else {
      setSongsList((prevSongsList) => {
        // list is filter to delete the selected row
        const updatedSongsList = prevSongsList.filter(
          (songRow) => songRow.songId !== song.songId
        );

        // re-assign values of number song way secuencially
        const renumberedSongsList = updatedSongsList.map((songRow, index) => ({
          ...songRow,
          numberSong: index + 1, // index + 1 to start since number 1
        }));

        return renumberedSongsList;
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (songToDelete) {
      const params: RequestInit = {
        cache: "no-cache",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      try {
        const response = await fecthToUse(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/songs/delete/${songToDelete}`,
          params
        );
        console.log(response);
        if (response.state) {
          setSongsList((prevSongsList) => {
            // list is filter to delete the selected row
            const updatedSongsList = prevSongsList.filter(
              (songRow) => songRow.songId !== songToDelete
            );

            // re-assign values of number song way secuencially
            const renumberedSongsList = updatedSongsList.map(
              (songRow, index) => ({
                ...songRow,
                numberSong: index + 1, // index + 1 to start since number 1
              })
            );

            return renumberedSongsList;
          });
          setIsDialogDeleteSongOpen(false);
          setSongToDelete(null);
          toast.success("Song has been deleted Succesfully!!")
        }
      } catch (error) {
        toast.error("Failed to delete the song. Please try again.");
      }
    }
  };

  const options = [
    { id: "genre", desc: "Genre", icon: CirclePlus },
    { id: "artists", desc: "Artists", icon: UserPlus },
    { id: "albums", desc: "Albums", icon: DiscAlbum },
    { id: "songs", desc: "Songs", icon: DiscAlbum },
  ];
  useEffect(() => {
    if (activeTab === "albums") {
      fetchArtists();
      fetchGenres();
    } else if (activeTab === "songs") {
      fetchArtists();
    }
  }, [activeTab]);
  useEffect(() => {
    setFormSongs((prev) => ({
      ...prev,
      songs: songsList,
    }));
  }, [songsList]); // E

  const addSongsToList = () => {
    var numberSongsAdd =
      (songsList.length > 0 ? songsList[songsList.length - 1].numberSong : 0) +
      1;
    var objectRowSong: Song = {
      songId: generateRandomLong(),
      name: "",
      duration: "",
      numberSong: numberSongsAdd,
      explicit: false,
      file: undefined,
      loaded: false,
      edited: false,
      nameFile: "",
    };
    setSongsList((prev) => [...prev, objectRowSong]); // add to Exist state
    if (songsList.length >= 0) errorSong.songs = "";
  };

  function generateRandomLong() {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);

    // Fill the buffer with random values
    crypto.getRandomValues(new Uint8Array(buffer));

    // Read the buffer as a 64-bit signed integer (BigInt)
    const randomLong = view.getBigInt64(0, true); // true for little-endian

    // Convert BigInt to a string (to avoid losing precision)
    return randomLong.toString();
  }

  const handleInputSongsChange = (
    songId: string,
    field: keyof Song,
    value: string | number | boolean | File | undefined
  ) => {
    setSongsList((prev) =>
      prev.map((song) => {
        if (song.songId === songId) {
          // Check if the new value is different from the current value
          const isValueDifferent = song[field] !== value;

          // If the value is different, set edited to true
          const updatedSong = {
            ...song,
            [field]: value,
            edited: isValueDifferent ? true : song.edited,
          };

          return updatedSong;
        }
        return song;
      })
    );
  };

  // Function for add cover when its created  an album
  const handleFileChangeCoverAlbum = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; //  get the first file loaded
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      // define what to do when the file will be readed Define qué hacer cuando el archivo sea leído
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result); // Guarda la imagen como URL en el estado
        }
      };

      reader.readAsDataURL(file); // Lee el archivo como DataURL
      setFormAlbum((prev) => ({
        ...prev,
        image: file,
      }));
      if (errorAlbum.image !== "")
        setErrorAlbum((prev) => ({
          ...prev,
          image: "",
        }));
    } else {
      alert("Por favor selecciona un archivo de imagen válido.");
    }
  };

  const fetchArtists = async () => {
    const params: RequestInit = {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fecthToUse(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/artists/all`,
        params
      );
      if (response.data) {
        setArtists(response.data.artists);
      }
    } catch (error) {
      toast.error("Failed to fetch artists. Please try again.");
    }
  };
  const fetchGenres = async () => {
    const params: RequestInit = {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fecthToUse(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/genders/all`,
        params
      );
      if (response.data) {
        setGenres(response.data.genders);
      }
    } catch (error) {
      toast.error("Failed to fetch genres. Please try again.");
    }
  };
  const fetchAlbumsByArtist = async (artistId: string) => {
    setAlbums([]);
    const params: RequestInit = {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fecthToUse(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/albumsArtist/artist/${artistId}`,
        params
      );
      setSongsList([]);
      if (response.data) {
        const albumsArray = response.data.albumsArtist.map(
          (val: any) => val.album
        ); // Extraer todos los álbumes
        setAlbums((prev) => [...prev, ...albumsArray]); // Agregar al estado existente
        if (albumsArray.length === 0) {
          setFormSongs({ ...formSongs, album: "" });
        } else {
          errorSong.album = "";
        }
      }
    } catch (error) {
      toast.error("Failed to fetch albums of the artist . Please try again.");
    }
  };
  const fetchSongsByAlbum = async (albumId: string) => {
    const params: RequestInit = {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fecthToUse(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/songs/album/${albumId}`,
        params
      );
      if (response.data) {
        const songsAlbum: Song[] = response.data.songsByAlbum;
        console.log(songsAlbum);
        songsAlbum.map((song, index) => {
          song.loaded = true;
          song.edited = false;
          var secsSong = calcSecs(Number(song.duration));
          song.duration = secsSong;
        });
        setSongsList(songsAlbum);
      }
    } catch (error) {
      toast.error("Failed to fetch Song of the Album . Please try again.");
    }
  };

  const saveAlbum = async () => {
    setIsLoading(true);
    const formData = new FormData();
    const albumForm = {
      name: formAlbum.title,
      year: formAlbum.year?.toString(),
      genderId: formAlbum.genre,
      artistId: formAlbum.artist,
    };
    const jsonAlbum = JSON.stringify(albumForm);
    const blobAlbum = new Blob([jsonAlbum], {
      type: "application/json",
    });
    formData.append("album", blobAlbum);

    if (formAlbum.image) {
      formData.append("image", formAlbum.image);
    }
    const params: RequestInit = {
      method: "POST",
      cache: "no-cache",
      body: formData,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const saveAlbumPost = fecthToUse(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/albums/saveWithImage`,
      params
    );
    toast
      .promise(saveAlbumPost, {
        loading: "Adding Album..",
        success: (
          <div>
            <strong>Success!</strong> <br />
            it has been Added !!
          </div>
        ),
        error: (error) => (
          <div>
            Failed to Adding. Please try again. <br />
            <strong>Error:</strong> {error.message}
          </div>
        ),
      })
      .then(async (dataResponse: DefaultResponse) => {
        if (dataResponse.data !== undefined) {
          setIsLoading(false);
          setFormAlbum({
            artist: "",
            title: "",
            year: "",
            image: undefined,
            genre: "",
          });
          setImagePreview("");
          setDateReleaseAlbum(undefined);
        }
      })
      .catch(async (error: any) => {
        setIsLoading(false);
      });
  };
  const saveSongs = async () => {
    var atLeastOneLoadedOdited = false;
    formSongs.songs.map((song, index) => {
      if (!song.loaded || (song.loaded && song.edited)) {
        atLeastOneLoadedOdited = true;
        setIsLoading(true);
        const minutesDuration = Number(song.duration.split(":")[0]);
        const secsDuration = Number(song.duration.split(":")[1]);
        const durationTotal = minutesDuration * 60 + secsDuration;
        const formData = new FormData();
        const songForm = {
          name: song.name,
          duration: durationTotal,
          numberSong: song.numberSong,
          explicit: song.explicit,
          albumId: formSongs.album,
          edited: song.edited,
          loaded: song.loaded,
          songId: Number(song.songId),
          nameFile: song.nameFile,
        };
        const jsonSongs = JSON.stringify(songForm);
        const blobSongs = new Blob([jsonSongs], {
          type: "application/json",
        });
        formData.append("song", blobSongs);
        if (song.file) {
          formData.append("file", song.file);
        }
        console.log(jsonSongs);
        const params: RequestInit = {
          method: "POST",
          cache: "no-cache",
          body: formData,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const saveSongPost = fecthToUse(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/songs/save`,
          params
        );
        toast
          .promise(saveSongPost, {
            loading: "Adding Song..",
            success: (
              <div>
                <strong>Success!</strong> <br />
                it has been Added !!
              </div>
            ),
            error: (error) => (
              <div>
                Failed to Adding. Please try again. <br />
                <strong>Error:</strong> {error.message}
              </div>
            ),
          })
          .then(async (dataResponse: DefaultResponse) => {
            if (dataResponse.data !== undefined) {
              setIsLoading(false);
              setFormSongs({
                album: "",
                artist: "",
                songs: [],
              });
              setSongsList([]);
            }
          })
          .catch(async (error: any) => {
            setIsLoading(false);
          });
      }
    });
    if (!atLeastOneLoadedOdited) {
      toast.error("You haven't modified any song");
    }
  };
  const addOption = async (value: string) => {
    switch (value) {
      case "genre":
        if (formGenre.name.trim() === "") {
          setError("This field is obligatory");
          return;
        }
        setIsLoading(true);
        // Handle sign in logic here
        const dataGenre = { name: formGenre.name };
        const params: RequestInit = {
          method: "POST",
          cache: "no-cache",
          body: JSON.stringify(dataGenre),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const genderSaveRequest = fecthToUse(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/genders/save`,
          params
        );
        toast
          .promise(genderSaveRequest, {
            loading: "Adding Genre..",
            success: (
              <div>
                <strong>Success!</strong> <br />
                it has been Added !!
              </div>
            ),
            error: (error) => (
              <div>
                Failed to Adding. Please try again. <br />
                <strong>Error:</strong> {error.message}
              </div>
            ),
          })
          .then(async (dataResponse: DefaultResponse) => {
            if (dataResponse.data !== undefined) {
              setIsLoading(false);
              setFormGenre({ name: "" });
            }
          });
        break;
      case "artists":
        if (formArtist.name.trim() === "") {
          setErrorForArtist("This field is obligatory");
          return;
        }
        setIsLoading(true);
        // Handle sign in logic here
        const dataArtist = { name: formArtist.name };
        const paramsArtist: RequestInit = {
          method: "POST",
          cache: "no-cache",
          body: JSON.stringify(dataArtist),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const artistSaveRequest = fecthToUse(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/artists/save`,
          paramsArtist
        );
        toast
          .promise(artistSaveRequest, {
            loading: "Adding Artist..",
            success: (
              <div>
                <strong>Success!</strong> <br />
                it has been Added !!
              </div>
            ),
            error: (error) => (
              <div>
                Failed to Adding. Please try again. <br />
                <strong>Error:</strong> {error.message}
              </div>
            ),
          })
          .then(async (dataResponse: DefaultResponse) => {
            if (dataResponse.data !== undefined) {
              setIsLoading(false);
              setFormArtist({ name: "" });
            }
          });
        break;
      case "albums":
        const errors: typeof errorAlbum = {
          title: "",
          artist: "",
          year: "",
          genre: "",
          image: "",
        };

        if (!formAlbum.title) errors.title = "El título es obligatorio.";
        if (!formAlbum.artist) errors.artist = "El artista es obligatorio.";
        if (!formAlbum.year) errors.year = "El año es obligatorio.";
        if (!formAlbum.image) errors.image = "La imagen es obligatoria.";
        if (!formAlbum.genre) errors.genre = "El genero es obligatorio.";

        setErrorAlbum(errors);
        const hasErrors = Object.values(errors).some((error) => error !== "");
        if (!hasErrors) {
          // Si no hay errores, envía el formulario
          saveAlbum();
        }
        // setIsLoading(true);
        break;
      case "songs":
        const errorsSong: typeof errorSong = {
          album: "",
          artist: "",
          songs: "",
        };
        if (!formSongs.album) errorsSong.album = "Album  is required.";
        if (!formSongs.artist) errorsSong.artist = "Artist is required";
        if (formSongs.songs.length === 0)
          errorsSong.songs = "Songs is required";
        setErrorSong(errorsSong);
        const hasErrorsSongs = Object.values(errorsSong).some(
          (error) => error !== ""
        );
        if (!hasErrorsSongs) {
          saveSongs();
        }
    }
  };

  const renderForm = (value: string) => {
    switch (value) {
      case "genre":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="genreName"
                className={`${error ? "font-bold text-red-700" : ""}`}
              >
                Genre Name
              </Label>
              <Input
                id="genreName"
                className={`w-full ${
                  error
                    ? "border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500"
                    : ""
                }`}
                placeholder="Enter genre name"
                value={formGenre.name}
                onChange={(e) => {
                  setFormGenre({ name: e.target.value });
                  if (error) setError(null);
                }}
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> {error}
              </p>
            )}
            <Button
              disabled={isLoading}
              className="w-full"
              onClick={() => addOption(value)}
            >
              {isLoading ? "Adding Genre..." : "Add Genre"}
            </Button>
          </div>
        );
      case "artists":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="artistName"
                className={`${errorForArtist ? "font-bold text-red-700" : ""}`}
              >
                Artist Name
              </Label>
              <Input
                id="artistName"
                className={`w-full ${
                  errorForArtist
                    ? "border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500"
                    : ""
                }`}
                placeholder="Enter artist name"
                value={formArtist.name}
                onChange={(e) => {
                  setFormArtist({ name: e.target.value });
                  if (errorForArtist) setErrorForArtist(null);
                }}
              />
            </div>
            {errorForArtist && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> {error}
              </p>
            )}
            <Button
              disabled={isLoading}
              className="w-full"
              onClick={() => addOption(value)}
            >
              {isLoading ? "Adding Artist..." : "Add Artist"}
            </Button>
          </div>
        );
      case "albums":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="albumTitle"
                className={`${
                  errorAlbum.title !== "" ? "font-bold text-red-700" : ""
                }`}
              >
                Album Title
              </Label>
              <Input
                id="albumTitle"
                placeholder="Enter album title"
                value={formAlbum.title}
                className={`w-full ${
                  errorAlbum.title !== ""
                    ? "border border-red-500  text-red-900 placeholder:text-red-700 rounded-lg focus:ring-red-500"
                    : ""
                }`}
                onChange={(e) => {
                  setFormAlbum((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                  if (errorAlbum.title !== "")
                    setErrorAlbum((prev) => ({
                      ...prev,
                      title: "",
                    }));
                }}
              />
              {errorAlbum.title && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> {errorAlbum.title}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="albumArtist"
                className={`${
                  errorAlbum.artist !== "" ? "font-bold text-red-700" : ""
                }`}
              >
                Artist
              </Label>
              <Select
                value={formAlbum.artist}
                onValueChange={(value) => {
                  setFormAlbum({ ...formAlbum, artist: value });
                  if (errorAlbum.artist !== "")
                    setErrorAlbum((prev) => ({
                      ...prev,
                      artist: "",
                    }));
                }}
              >
                <SelectTrigger
                  className={`w-full ${
                    errorAlbum.artist !== ""
                      ? "border border-red-500 text-red-700 placeholder-red-700 rounded-lg focus:ring-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select Artist" />
                </SelectTrigger>
                <SelectContent>
                  {artists.map((artist) => (
                    <SelectItem
                      key={artist.artistId}
                      value={artist.artistId.toString()}
                    >
                      {artist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errorAlbum.artist && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> {errorAlbum.artist}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="albumYear"
                className={`${
                  errorAlbum.year !== "" ? "font-bold text-red-700" : ""
                }`}
              >
                Release Year
              </Label>
              <div className="w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full  justify-start text-left font-normal",
                        !dateReleaseAlbum && "text-muted-foreground",
                        `${
                          errorAlbum.year !== ""
                            ? "font-bold border border-red-500  text-red-900 placeholder:text-red-700 rounded-lg focus:ring-red-500"
                            : ""
                        }`
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateReleaseAlbum ? (
                        format(dateReleaseAlbum, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={dateReleaseAlbum}
                      onSelect={(value) => {
                        setFormAlbum({
                          ...formAlbum,
                          year: value?.getFullYear().toString(),
                        });
                        if (errorAlbum.year !== "")
                          setErrorAlbum((prev) => ({
                            ...prev,
                            year: "",
                          }));
                        setDateReleaseAlbum(value);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {errorAlbum.year && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> {errorAlbum.year}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="albumGenre"
                className={`${
                  errorAlbum.genre !== "" ? "font-bold text-red-700" : ""
                }`}
              >
                Genre
              </Label>
              <Select
                value={formAlbum.genre}
                onValueChange={(value) => {
                  setFormAlbum({ ...formAlbum, genre: value });
                  if (errorAlbum.genre !== "")
                    setErrorAlbum((prev) => ({
                      ...prev,
                      genre: "",
                    }));
                }}
              >
                <SelectTrigger
                  className={`w-full ${
                    errorAlbum.genre !== ""
                      ? "border border-red-500 text-red-700 placeholder-red-700 rounded-lg focus:ring-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem
                      key={genre.genderId}
                      value={genre.genderId.toString()}
                    >
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errorAlbum.genre && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> {errorAlbum.genre}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="picture"
                className={`${
                  errorAlbum.image !== "" ? "font-bold text-red-700" : ""
                }`}
              >
                Cover Album
              </Label>
              <Input
                id="picture"
                type="file"
                onChange={handleFileChangeCoverAlbum}
                className={`w-full ${
                  errorAlbum.year
                    ? "border border-red-500 text-red-900 placeholder-red-700 rounded-lg focus:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {imagePreview && (
              <div className="space-y-2">
                <Label htmlFor="pictureImg">Vista previa</Label>
                <img
                  id="pictureImg"
                  src={imagePreview}
                  alt="Vista previa"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            )}
            {errorAlbum.image && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> {errorAlbum.image}
              </p>
            )}
            <Button
              disabled={isLoading}
              className="w-full"
              onClick={() => addOption(value)}
            >
              {isLoading ? "Adding Album..." : "Add Album"}
            </Button>
          </div>
        );
      case "songs":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="albumArtist"
                className={`${
                  errorSong.artist !== "" ? "font-bold text-red-700" : ""
                }`}
              >
                Artist
              </Label>
              <Select
                value={formSongs.artist}
                onValueChange={(value) => {
                  setFormSongs({ ...formSongs, artist: value });
                  fetchAlbumsByArtist(value);
                  if (errorSong.artist !== "")
                    setErrorSong((prev) => ({
                      ...prev,
                      artist: "",
                    }));
                }}
              >
                <SelectTrigger
                  className={`w-full ${
                    errorSong.artist !== ""
                      ? "border border-red-500 text-red-700 placeholder-red-700 rounded-lg focus:ring-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select Artist" />
                </SelectTrigger>
                <SelectContent>
                  {artists.map((artist) => (
                    <SelectItem
                      key={artist.artistId}
                      value={artist.artistId.toString()}
                    >
                      {artist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errorSong.artist && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> {errorSong.artist}
                </p>
              )}
            </div>
            {formSongs.artist !== "" && (
              <div className="space-y-2">
                <Label
                  htmlFor="albumArtist"
                  className={`${
                    errorSong.album !== "" ? "font-bold text-red-700" : ""
                  }`}
                >
                  Albums
                </Label>
                <Select
                  value={formSongs.album}
                  onValueChange={(value) => {
                    setFormSongs({ ...formSongs, album: value });
                    fetchSongsByAlbum(value);
                    if (errorSong.album !== "")
                      setErrorSong((prev) => ({
                        ...prev,
                        album: "",
                      }));
                  }}
                >
                  <SelectTrigger
                    className={`w-full ${
                      errorSong.album !== ""
                        ? "border border-red-500 text-red-700 placeholder-red-700 rounded-lg focus:ring-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select Artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {albums.map((album) => (
                      <SelectItem
                        key={album.albumId}
                        value={album.albumId.toString()}
                      >
                        {album.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errorSong.album && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> {errorSong.album}
                  </p>
                )}
              </div>
            )}
            {formSongs.album !== "" && (
              <div className="space-y-2">
                <Button onClick={() => addSongsToList()} className="w-1/6">
                  Add Slot For song
                </Button>
              </div>
            )}
            {errorSong.songs && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> {errorSong.songs}
              </p>
            )}
            {songsList.length > 0 && (
              <div className="h-72 overflow-y-auto">
                <Table>
                  <TableCaption>List Songs of album</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%] ">Name</TableHead>
                      <TableHead className="w-[20%] ">Duration</TableHead>
                      <TableHead className="w-[15%] text-center ">
                        Number Song
                      </TableHead>
                      <TableHead className="text-center w-[10%] ">
                        Explicit
                      </TableHead>
                      <TableHead className="text-center w-[20%] ">
                        File Song
                      </TableHead>
                      <TableHead className="text-right w-[5%] "></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {songsList.map((song) => (
                      <TableRow key={song.songId}>
                        <TableCell className="font-medium">
                          <Input
                            id={`nameSong_${song.songId}`}
                            className={`w-full`}
                            placeholder="Enter Song name"
                            value={song.name}
                            onChange={(e) =>
                              handleInputSongsChange(
                                song.songId,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="text"
                            id={`songDuration_${song.songId}`}
                            name="duration"
                            value={song.duration}
                            onChange={(e) =>
                              handleInputSongsChange(
                                song.songId,
                                "duration",
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            id={`songNumber_${song.songId}`}
                            name="number"
                            value={song.numberSong}
                            disabled={true}
                            className="text-right"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={song.explicit}
                            onCheckedChange={(e) =>
                              handleInputSongsChange(
                                song.songId,
                                "explicit",
                                !song.explicit
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="file"
                            id={`songFile_${song.songId}`}
                            className="text-right"
                            accept="audio/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (!file.type.startsWith("audio/")) {
                                  toast.error(
                                    "Por favor, selecciona un archivo de audio válido."
                                  );
                                  return;
                                }
                                handleInputSongsChange(
                                  song.songId,
                                  "file",
                                  file
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell
                          className="text-right"
                          title={`Delete Song ${song.name}`}
                        >
                          <div className="flex justify-center items-center">
                            <Trash
                              className="text-right hover:text-red-600 transition "
                              onClick={(e) => {
                                handleDeleteSongClick(song);
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <Button
              disabled={isLoading}
              className="w-full"
              onClick={() => addOption(value)}
            >
              {isLoading ? "Adding Songs..." : "Add Songs"}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Data Music</CardTitle>
          <CardDescription>
            Add new genres, artists, or albums to the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              {options.map((option) => (
                <TabsTrigger
                  key={option.id}
                  value={option.id}
                  className="flex items-center space-x-2"
                >
                  <option.icon className="h-4 w-4" />
                  <span>{option.desc}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {options.map((option) => (
              <TabsContent key={option.id} value={option.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>Add {option.desc}</CardTitle>
                    <CardDescription>
                      Enter the details to add a new {option.desc.toLowerCase()}
                      .
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderForm(option.id)}
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      <AlertDialog
        open={isDialogDeleteSongOpen}
        onOpenChange={setIsDialogDeleteSongOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              song from this album.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogDeleteSongOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDataPage;
