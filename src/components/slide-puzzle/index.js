import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import './style.css'
import a from './img/1.png'
import b from './img/2.png'
import c from './img/3.png'
import d from './img/4.png'
import e from './img/5.png'
import f from './img/6.png'
import g from './img/7.png'
import h from './img/8.png'

const SlidePuzzle = () => {
    const results = [a, b, c, d, e, f, g, h, '']
    const [game, setGame] = useState([])
    const [disable, setDisable] = useState(false)
    const connected = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4, 6],
        4: [1, 3, 5, 7],
        5: [2, 4, 8],
        6: [3, 7],
        7: [4, 6, 8],
        8: [7, 5]
    }

    function shuffleArray(array) {
        const newArr = array.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1))
                ;[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
        }
        return newArr
    }

    useEffect(() => {
        setGame(shuffleArray(results))
    }, [])

    const blocks = game.map((ele, idx) => {
        if (ele === '') {
            return <div className="slido-blocks" key={idx} name={idx}></div>
        }
        return (
            <img
                className="slido-blocks"
                src={ele}
                name={idx}
                onClick={handleClick}
                alt={'img ' + idx}
                key={idx}
            />
        )
    })

    function getNextStep(curr) {
        let moveTo = null
        for (const conn of connected[curr]) {
            if (game[conn] === '') {
                moveTo = conn
                break
            }
        }
        return moveTo
    }

    function handleClick(event) {
        const { name } = event.target
        let moveTo = getNextStep(parseInt(name))

        const newGame = game.slice()
        if (moveTo !== null) {
            newGame[moveTo] = newGame[name]
            newGame[name] = ''
            setGame(newGame)
            setDisable(false)
        }
    }

    useEffect(() => {
        if (!disable) {
            let isEqual = true
            for (let idx = 0; idx < 9; idx++) {
                if (results[idx] !== game[idx]) {
                    isEqual = false
                    break
                }
            }
            if (isEqual) {
                window.alert('Correct!')
                const score = JSON.parse(localStorage.getItem('score')) || 0
                localStorage.setItem('score', JSON.stringify(score + 1))
                setGame(shuffleArray(results))
                setDisable(false)
            }
        }
    }, [disable, game, results])

    function handleSolve() {
        setGame(results)
        setDisable(true)
    }

    function handleReset() {
        setGame(shuffleArray(results))
        setDisable(false)
    }

    return (

        <div className='phone-case'>
            <div className="navbar">
                <div className="hamburger-icon"><Link to="/">{`<-`}</Link></div>
                <div className="label">FinSmart</div>
            </div>
            <div className="page-container">
                <div className="container">
                    <div id="slido-container">
                        <div className="slido-block-rows">
                            {blocks[0]}
                            {blocks[1]}
                            {blocks[2]}
                        </div>
                        <div className="slido-block-rows">
                            {blocks[3]}
                            {blocks[4]}
                            {blocks[5]}
                        </div>
                        <div className="slido-block-rows">
                            {blocks[6]}
                            {blocks[7]}
                            {blocks[8]}
                        </div>
                    </div>
                    <div className="btn-container">
                        <button
                            className="game-button"
                            onClick={() => handleSolve()}
                        >
                            Solve.
                        </button>
                        <button
                            className="game-button orange"
                            onClick={() => handleReset()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlidePuzzle
