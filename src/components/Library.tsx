import React from "react"
import {
  SwatchIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline"
import PlaylistCard from "./PlaylistCard"
import { PlaylistContextState } from "@/types"

interface LibraryProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
  updatePlaylistContextState: (
    updatedObj: Partial<PlaylistContextState>
  ) => void
}

const Library = ({ playlists, updatePlaylistContextState }: LibraryProps) => {
  return (
    <div className="mt-2 bg-zinc-900 px-4 py-5 rounded-lg">
      <div className="flex justify-between items-center hover:text-white">
        <div className="flex items-center space-x-3 mr-2 text-base font-semibold">
          <SwatchIcon className="h-6 w-6 text-gray-500" />
          <span className="font-semibold text-gray-500 whitespace-nowrap">
            Your library
          </span>
        </div>
        <div className="flex">
          <div className="hover:rounded-full hover:bg-zinc-800 p-2">
            <PlusIcon className="text-gray-500 w-5 h-5 hover:text-white hover:cursor-pointer" />
          </div>
          <div className=" hover:rounded-full hover:bg-zinc-800 p-2">
            <ArrowRightIcon className="text-gray-500 w-5 h-5 hover:text-white hover:cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-4 px-2">
        <div className="flex items-center space-x-3 mb-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-800">
          <div className="bg-purple-600 p-2 rounded">
            <span role="img" aria-label="heart" className="text-white">
              ❤️
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Liked Songs</h3>
            <p className="text-gray-500 text-sm">Playlist • 4 songs</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          {playlists.map(({ id, name }) => (
            <PlaylistCard
              key={id}
              id={id}
              playlistName={name}
              updatePlaylistContextState={updatePlaylistContextState}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Library
