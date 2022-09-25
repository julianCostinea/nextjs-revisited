import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import axios, { AxiosError } from "axios";
import { ParsedUrlQuery } from "querystring";

export interface Pokemon {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

async function axiosGetJsonData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    const errors = error as Error | AxiosError;
    // if (!axios.isAxiosError(error as any)) {

    // }
    if (errors instanceof AxiosError) {
      throw new Error(
        `Error in 'axiosGetJsonData(${url})': ${errors.message}. Status: ${errors.status}`
      );
    }
    console.log(errors);
    throw new Error(`Error in 'axiosGetJsonData(${url})': ${errors.message}`);
  }
}

const PokemonArticle: NextPage<Pokemon> = ({
  name,
  types,
  height,
  weight,
  sprites,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Typescript Nextjs </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.pokedexImageContainer}>
          <Image
            layout="fill"
            src={sprites.front_default}
            alt="Pokemon front image"
          />
        </div>
        <h1 className={styles.title}>{name}</h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

interface contextParams extends ParsedUrlQuery {
  pokeId: string;
}

export const getStaticProps: GetStaticProps<Pokemon, contextParams> = async (context) => {
  let pokeId;
  if (context.params) {
    pokeId = context.params.pokeId;
  }

  const res = await axiosGetJsonData<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${pokeId}`
  );

  if (!res) {
    return {
      redirect: {
        destination: "/no-data",
        statusCode: 307,
      },
    };
  }

  return {
    props: {
      id: res.id,
      name: res.name,
      types: res.types,
      height: res.height,
      weight: res.weight,
      sprites: res.sprites,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { pokeId: "1" } }, // See the "paths" section below
    ],
    fallback: true,
  };
};

export default PokemonArticle;
