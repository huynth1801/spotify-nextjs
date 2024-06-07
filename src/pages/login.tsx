import { GetServerSideProps } from "next";
import { ClientSafeProvider, getProviders } from "next-auth/react";
import React from "react";

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login = ({ providers }: Props) => {
  const { name: providerName, id: providerId } =
    providers?.spotify as ClientSafeProvider;
  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div className="mb-6"></div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
