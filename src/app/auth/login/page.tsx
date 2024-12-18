"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { DefaultResponse } from "@/app/Interfaces/Response/Response";
import { data } from "framer-motion/client";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { resolve } from "path";
import { error } from "console";
import { useLikedAlbumsContext } from "@/app/Hooks/LikedAlbumsContext";
import { ResponseData } from "../../Interfaces/Response/Response";
import { Album } from "@/app/Interfaces/AlbumInterface";

async function loginFetch(url: string, headers: RequestInit): Promise<any> {
  try {
    // we use  await for wait the answer of the fetch
    const response = await fetch(url, headers);
    const responseFetch: DefaultResponse = await response.json();
    // if the answer is not success ,we throw a error
    if (!response.ok) {
      if (!responseFetch.state) {
        throw new Error(responseFetch.errors.error);
      }
      throw new Error("" + response.status);
    }
    return responseFetch;
  } catch (error: any) {
    // if there is a error we throw
    throw new Error(error.message);
  }
}

export default function SignIn() {
  const { initialLikedAlbums } = useLikedAlbumsContext();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    const userData = { email, password };
    const params: RequestInit = {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const signin = loginFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
      params
    ); //we run the function here

    toast
      .promise(signin, {
        loading: "Logging in...",
        success: (
          <div>
            <strong>Welcome!</strong> <br />
            You have successfully logged in.
          </div>
        ),
        error: (error) => (
          <div>
            Failed to log in. Please try again. <br />
            <strong>Error:</strong> {error.message}
          </div>
        ),
      })
      .then(async (dataResponse: DefaultResponse) => {
        if (dataResponse.data !== undefined) {
          const token = dataResponse.data.token;
          if (token) {
            // Guardar el JWT en una cookie con opciones seguras
            Cookies.set("jwtTokenDataMusic", token, {
              expires: 7,
              secure: true,
              sameSite: "Strict",
              path: "/",
            });
            const jwtToken = Cookies.get("jwtTokenDataMusic");
            const axiosConfig = {
              headers: {
                Authorization: `Bearer ${jwtToken}`, // Aquí añadimos el JWT en la cabecera Authorization
                "Content-Type": "application/json",
              },
            };
            const resAlbumLikedsByUser = await fetch(
              process.env.NEXT_PUBLIC_BACKEND_API_URL + "/AlbumUser/liked",
              axiosConfig
            );
            if (resAlbumLikedsByUser.ok) {
              const jsonLikedAlbums: ResponseData =
                await resAlbumLikedsByUser.json();
                var arAlbumProcess:Album[]=[];
                jsonLikedAlbums.data.albums.map(function (album, index) {
                  arAlbumProcess.push(album);
                  return album;
                })
              
              initialLikedAlbums(arAlbumProcess);

              // jsonLikedAlbums.data.albums.map(function(album,index){
              //   console.log(album);
              //   addLikedAlbum(album);
              // })
            } else {
              throw new Error(
                `Error: ${resAlbumLikedsByUser.status} ${resAlbumLikedsByUser.statusText}`
              );
            }

            router.push("/main");
          }
        }
      });
  };

  return (
    <div className="min-h-screen bg-principal-550 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-principal-400 rounded-lg shadow-xl p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-sub mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-3 py-2 bg-principal-550 border border-sub rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-like focus:border-transparent"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-sub mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-3 py-2 bg-principal-550 border border-sub rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-like focus:border-transparent"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-sub" />
                ) : (
                  <Eye className="h-5 w-5 text-sub" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-like focus:ring-like border-sub rounded bg-principal-550"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-sub"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-like hover:text-sub transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-principal-550 bg-like hover:bg-sub focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-like transition-colors"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </motion.button>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-sub">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium text-like hover:text-sub transition-colors"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
async function SetinitialLikedAlbums() {}
