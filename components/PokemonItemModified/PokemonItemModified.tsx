import React, { useContext, useState, ReactElement } from "react";
import Image from "next/image";
import {isString} from '../../utils/typeGuards';

import classes from "./PokemonItemModified.module.scss";
import Link from "next/link";

export interface IProps {
  url: string;
  name: string;
  //the type guard can help if we dont know prop types
  // name: any;
}

const PokemonItemModified: React.FC<IProps> = ({ url, name }): ReactElement => {
  return (
    <Link href={`/pokemon/${url.slice(-2, -1)}`}>
      <article className={classes.pokemonItemModified} key={url}>
        <div className={classes.imageContainer}>
          <Image
            src="https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            layout="fill"
            alt="pokemon Image"
          />
        </div>
        <section className={classes.pokemonDetails}>
          <h2 className={classes.pokemonItemTitle}>{isString(name) ? name : null}</h2>
          <div className={classes.contentOverlay}>
            <h4 className={classes.pokemonType}> Type: Electric</h4>
            <h4 className={classes.pokemonWeight}> Weight: 20 kg.</h4>
          </div>
        </section>
      </article>
    </Link>
  );
};
export default PokemonItemModified;
