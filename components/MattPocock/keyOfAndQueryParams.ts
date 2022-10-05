import {String, Union} from "ts-toolbelt";

export interface Letters {
    a: number,
    b: string,
    c: {
        name: string
    }
}

type LetterValues = Letters[keyof Letters]

const query = `/home?name=burke&profession=chat-baiter`;

type Query = typeof query;

type SecondQueryPart = String.Split<Query, "?">[1]

type QueryElements = String.Split<SecondQueryPart, "&">
