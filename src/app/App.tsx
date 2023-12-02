import {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import './App.css';
import Criteria from "../components/Criteria/Criteria";
import CriteriaTable from "../components/CriteriaTable/CriteriaTable";
import EvaluateAlternatives from "../components/EvaluateAlternatives/EvaluateAlternatives";
import IntegralIndicatorsTable from "../components/IntegralIndicatorsTable/IntegralIndicatorsTable";

function App() {

    const onChangeAlternatives = (e: ChangeEvent<HTMLInputElement>) => {
        setAlternativesCount(Number(e.currentTarget.value))
    }

    const [criteria, setCriteria] = useState<string[]>([])
    const [criteriaEvaluationTable, setCriteriaEvaluationTable] = useState<number[][]>([])
    const [criteriaVector, setCriteriaVector] = useState<number[]>([])
    const [alternativesVectors, setAlternativesVectors] = useState<number[][]>([])

    const [alternativesCount, setAlternativesCount] = useState<number>(0)

    useEffect(() => {
        const array: number[][] = [];
        for (let i = 0; i < criteria.length; i++) {
            array.push(Array(criteria.length).fill(0));
        }
        for (let i = 0; i < criteria.length; i++) {
            array[i][i] = 1
        }
        setCriteriaEvaluationTable(array)

        setAlternativesVectors(Array(criteria.length).fill([]))
    }, [criteria.length])

    useEffect(() => {
        const array: number[] = []
        criteriaEvaluationTable.forEach((elem) => {
            array.push(Math.pow(elem.reduce((accumulator, currentValue) => accumulator * currentValue), 1 / elem.length))
        })
        setCriteriaVector(array)
    }, [criteriaEvaluationTable])

    useEffect(() => {
        setAlternativesVectors(Array(criteria.length).fill([]))
    }, [alternativesCount])

    useEffect(()=> {
        console.log(alternativesVectors)
    }, [alternativesVectors])

    return (
        <div className="App">
            <h1>2 Лабораторная работа</h1>
            <div>Критерии:</div>
            <Criteria criteria={criteria} setCriteria={setCriteria}/>
            <div>
                <span>Количество вариантов: </span>
                <input onChange={onChangeAlternatives} type={"number"} min={0} step={1}/>
            </div>
            <div>Оценки попарных сравнений критериев:</div>
            <CriteriaTable criteria={criteria}
                           setCriteriaEvaluationTable={setCriteriaEvaluationTable}
                           criteriaEvaluationTable={criteriaEvaluationTable}/>
            <div>Оценки попарных сравнений альтернатив:</div>
            {criteria.map((elem, index) => <EvaluateAlternatives alternativesVectors={alternativesVectors}
                                                                 setAlternativesVectors={setAlternativesVectors}
                                                                 criteria={elem} criteriaIndex={index}
                                                                 alternativesCount={alternativesCount}
                                                                 criteriaLength={criteria.length}/>)}
            <div>Интегральный показатель по каждой альтернативе:</div>
            <IntegralIndicatorsTable criteria={criteria} alternativesVectors={alternativesVectors} criteriaVector={criteriaVector} alternativesCount={alternativesCount}/>

        </div>
    )
}

export default App;
