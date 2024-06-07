import { GetServerSideProps } from "next"
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import spotifyIcon from "@/app/spotify_icon.png"
import React from "react"

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>
}

const Login = ({ providers }: Props) => {
  const { name: providerName, id: providerId } =
    providers?.spotify as ClientSafeProvider
  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div className="mb-6">
        <Image src={spotifyIcon} alt="Spotify icon" height={500} width={300} />
      </div>
      <button
        className="bg-[#18D860] text-white p-5 rounded-full font-semibold"
        onClick={() => {
          signIn(providerId, {
            callbackUrl: "/",
          }).catch((error) => console.error("Error during sign-in:", error))
        }}
      >
        Login with {providerName}
      </button>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
