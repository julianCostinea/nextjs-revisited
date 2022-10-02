import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import axios, { AxiosError } from "axios";
import PokemonItem from "../components/PokemonItem/PokemonItem";
import { permute, findPermutations } from '../components/Permutations/Permutations'
import Button from "../components/Button/Button";

export interface fetchedPokemons {
  results: {
    url: string;
    name: string;
  }[];
}

async function axiosGetJsonData<T>(url: string) {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    const errors = error as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      throw new Error(`Error in 'axiosGetJsonData(${url})': ${errors.message}`);
    }
    // if (errors instanceof AxiosError) {
    //   throw new Error(
    //     `Error in 'axiosGetJsonData(${url})': ${errors.message}. Status: ${errors.status}`
    //   );
    // }
    console.log(errors);
    throw new Error(`Unexpected error': ${errors.message}`);
  }
}

const Home: NextPage<fetchedPokemons> = ({ results }) => {
  // const randomPokemonNumber = Math.floor(Math.random() * 152);
  let pokemons = results
    // .slice(randomPokemonNumber - 5, randomPokemonNumber + 5)
    .map((pokemon) => {
      return (
        <PokemonItem url={pokemon.url} name={pokemon.name} key={pokemon.url} />
      );
    });
  // console.log(permute([1, 2, 3]));
  // console.log(findPermutations("abc"));

  return (
    <div className={styles.container}>
      <Head>
        <title>Typescript Nextjs </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>NEXTJS Revisited</h1>
        <div className={styles.pokemonContainer}>{pokemons}</div>
        <Button buttonText="Press Me"/>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await axiosGetJsonData<fetchedPokemons>(
    "https://pokeapi.co/api/v2/pokemon?limit=10"
  );
  const results = res.results;

  if (!results) {
    return {
      redirect: {
        destination: "/no-data",
        statusCode: 307
      },
    };
  }
  if (results.length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      results,
    },
  };
};

export default Home;
