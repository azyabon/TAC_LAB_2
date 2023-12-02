export default function reverse2DArray(arr: number[][]) {
    // Создаем новый массив с пустыми подмассивами
    const reversedArray: number[][] = Array(arr[0].length).fill(null).map(() => [])

    // Заполняем новый массив данными из исходного массива в обратном порядке
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            reversedArray[j].push(arr[i][j])
        }
    }

    return reversedArray
}