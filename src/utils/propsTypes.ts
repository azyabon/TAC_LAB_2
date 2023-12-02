import {Dispatch, SetStateAction} from "react";


export type CriteriaProps = {
    criteria: string[],
    setCriteria: Dispatch<SetStateAction<string[]>>
}

export type CriteriaTableProps = {
    criteria: string[],
    criteriaEvaluationTable: number[][],
    setCriteriaEvaluationTable: Dispatch<SetStateAction<number[][]>>,
}

export type AlternativesProps = {
    alternativesVectors: number[][],
    setAlternativesVectors: Dispatch<SetStateAction<number[][]>>,
    criteria: string,
    criteriaLength: number,
    criteriaIndex: number,
    alternativesCount: number
}

export type IntegralProps = {
    criteria: string[],
    alternativesVectors: number[][],
    criteriaVector: number[],
    alternativesCount: number
}