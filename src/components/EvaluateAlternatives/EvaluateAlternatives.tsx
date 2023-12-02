import {ChangeEvent, FC, useEffect, useState} from "react";
import {AlternativesProps} from "../../utils/propsTypes";

const EvaluateAlternatives: FC<AlternativesProps> = ({
                                                         alternativesVectors,
                                                         setAlternativesVectors,
                                                         criteria,
                                                         criteriaIndex,
                                                         alternativesCount,
                                                         criteriaLength
                                                     }) => {

    const [alternativesTable, setAlternativesTable] = useState<number[][]>([])

    useEffect(() => {
        const array: number[][] = [];
        for (let i = 0; i < alternativesCount; i++) {
            array.push(Array(alternativesCount).fill(1));
        }
        setAlternativesTable(array)
    }, [alternativesCount])

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>, x: number, y: number) => {
        const updatedTable = [...alternativesTable]
        updatedTable[y] = [...updatedTable[y]]
        if (x === y) {
            updatedTable[y][x] = 1
        } else {
            if (Number(e.currentTarget.value) !== 0) {
                updatedTable[y][x] = Number(e.currentTarget.value)
                updatedTable[x][y] = 1 / Number(e.currentTarget.value)
            } else {
                updatedTable[y][x] = 0
                updatedTable[x][y] = 0
            }
        }
        setAlternativesTable(updatedTable)
    }

    useEffect(() => {

        setAlternativesVectors(prevState => {
            const array = [...prevState]
            const newArray: number[] = []
            alternativesTable.forEach((elem) => {
                newArray.push(Math.pow(elem.reduce((accumulator, currentValue) => accumulator + currentValue), 1 / elem.length))
            })
            array[criteriaIndex] = newArray
            return array
        })
    }, [alternativesTable])

    const tableHead: JSX.Element[] = []
    for (let i = 1; i <= alternativesCount; i++) {
        tableHead.push(<td key={i - 1}>{`Вариант ${i}`}</td>)
    }

    const table = alternativesTable.map((elem, indexTr) =>
        <tr>{[-1, ...elem].map((number, indexTd) => indexTd === 0 ? <td>{`Вариант ${indexTr + 1}`}</td> :
            <td><input value={number}
                       onChange={(e) => onChangeInput(e, indexTd - 1, indexTr)}
                       type={"number"} min={1}
                       step={2}/></td>)}
        </tr>)

    return <table border={1}>
        <tr>
            <td>{criteria}</td>
            {tableHead}
        </tr>
        {table}
    </table>
}

export default EvaluateAlternatives