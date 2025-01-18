"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CirclePlus,
  UserPlus,
  DiscAlbum,
  Plus,
  AlertCircle,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fecthToUse } from "../components/utilities/fetchReuse";
import { DefaultResponse } from "@/app/Interfaces/Response/Response";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Artist } from "../Interfaces/ArtistInterface";

interface typeAlbumError {
  title: string;
  artist: string;
  year: string | undefined;
  image: string;
}

const AdminDataPage = () => {
  const jwtToken = Cookies.get("jwtTokenDataMusic");
  const [activeTab, setActiveTab] = useState("genre");
  const [formGenre, setFormGenre] = useState({ name: "" });
  const [formArtist, setFormArtist] = useState({ name: "" });
  const [formAlbum, setFormAlbum] = useState<typeAlbumError>({
    title: "",
    artist: "",
    year: "",
    image: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [errorForArtist, setErrorForArtist] = useState<string | null>(null);
  const [errorAlbum, setErrorAlbum] = useState<typeAlbumError>({
    title: "",
    artist: "",
    year: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [dateReleaseAlbum, setDateReleaseAlbum] = useState<Date>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const options = [
    { id: "genre", desc: "Genre", icon: CirclePlus },
    { id: "artists", desc: "Artists", icon: UserPlus },
    { id: "albums", desc: "Albums", icon: DiscAlbum },
  ];
  useEffect(() => {
    if (activeTab === "albums") {
      fetchArtists();
    }
  }, [activeTab]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtén el primer archivo cargado
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      // Define qué hacer cuando el archivo sea leído
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result); // Guarda la imagen como URL en el estado
        }
      };

      reader.readAsDataURL(file); // Lee el archivo como DataURL
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
      console.error("Error fetching artists:", error);
      toast.error("Failed to fetch artists. Please try again.");
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
          image: "",
        };

        if (!formAlbum.title) errors.title = "El título es obligatorio.";
        if (!formAlbum.artist) errors.artist = "El artista es obligatorio.";
        if (!formAlbum.year) errors.year = "El año es obligatorio.";
        if (!formAlbum.image) errors.image = "La imagen es obligatoria.";
        setErrorAlbum(errors);
        console.log(errors);
        const hasErrors = Object.values(errors).some((error) => error !== "");
        if (!hasErrors) {
          // Si no hay errores, envía el formulario
          alert("Formulario enviado con éxito!");
          console.log(formAlbum);
        }
      // setIsLoading(true);
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
                          year: value?.getTime().toString(),
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
                onChange={handleFileChange}
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
            <Button className="w-full" onClick={() => addOption(value)}>
              Add Album
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
            <TabsList className="grid w-full grid-cols-3">
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
    </div>
  );
};

export default AdminDataPage;
