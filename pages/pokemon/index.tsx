import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { GetStaticProps } from "next";
import { axiosGetJsonData } from "../../utils/utilFunctions";
import PokemonItemModified from "../../components/PokemonItemModified/PokemonItemModified";
import { formatErrorMessage, Log } from "../../utils/discriminatedUnions";
import { capitalizeString, assertValueHasProps } from "../../utils/assertionFunctions";
import {isNotString2} from "../../utils/higherOrderFunctions";
import {fib, timedFib, delayedSumWithLabel} from "../../utils/higherOrderFunctions2";
import { errorHandlerSum, sum2, deprecated } from "../../utils/higherOrderFunctions3";
import {fibTimed, fib2Timed} from "../../utils/higherOrderMemoize";
import {sumAndLog} from "../../utils/higherOrderCacheAsync";

export interface fetchedPokemons {
  results: {
    url: string;
    name: string;
  }[];
}
interface objectValue {
  name: string,
  email: string,
  password: string
}

const Home: NextPage<fetchedPokemons> = ({ results }) => {
  let newValue: Log = { message: "hello", subscribeToTheNewsletter: "comment" };
  let newValue2:objectValue = {
    name : "julian",
    email: "mail@mail",
    password: "pass"
  }

  //Type guards and assertion functions
  // console.log(formatErrorMessage(newValue));
  // console.log(capitalizeString("hello"));
  // console.log(assertValueHasProps(newValue2));

  //Higher order functions
  // console.log(isNotString2(2));
  // console.log(fib(5));
  // console.log(timedFib(30));
  // delayedSumWithLabel();
  // console.log(errorHandlerSum(5, 6));
  // let metricSum2 = deprecated(sum2);
  // console.log(metricSum2(1, 2));
  // console.log(fib2Timed(30));
  // console.log(fibTimed(30));
  // async function RunSumAndLog(){
  //   console.log(await sumAndLog(100, 200));
  //   console.log(await sumAndLog(100, 200));
  //   sumAndLog.invalidate(100, 200);
  //   console.log(await sumAndLog(100, 200));
  // };
  // RunSumAndLog();

  // const randomPokemonNumber = Math.floor(Math.random() * 152);
  let pokemons = results
    // .slice(randomPokemonNumber - 5, randomPokemonNumber + 5)
    .map((pokemon) => {
      return (
        <PokemonItemModified
          url={pokemon.url}
          name={pokemon.name}
          key={pokemon.url}
        />
      );
    });
  return (
    <div className={styles.container}>
      <Head>
        <title>Kanto Pokedex </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>All Kanto Pokemon</h1>
        <div className={styles.pokemonContainer}>{pokemons}</div>
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
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );
  const results = res.results;

  if (!results) {
    return {
      redirect: {
        destination: "/no-data",
        statusCode: 307,
      },
    };
  }
  if (results.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      results,
    },
  };
};

export default Home;
