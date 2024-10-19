import { useState, useEffect } from 'react'
import './style.css'

const Tracks = () => {
    const [money, setMoney] = useState(35)
    const [waterRatio, setWaterRatio] = useState(50)
    const [foodRatio, setFoodRatio] = useState(50)

    const handleBuyCarrotClick = () => {
        setFoodRatio(foodRatio + 3)
        setMoney(money - 5)
    }

    const handleBuyWaterClick = () => {
        setWaterRatio(waterRatio + 3)
        setMoney(money - 2)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setWaterRatio((prev) => Math.max(prev - 1, 0));
            setFoodRatio((prev) => Math.max(prev - 1, 0));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getCarrotBgColor = (ratio) => {
        if (ratio < 5) {
            return 'red';
        } else if (ratio >= 10 && ratio <= 100) {
            const orangePercentage = Math.min((ratio - 10) * (90 / 90), 100);
            const whitePercentage = 100 - orangePercentage;
            return `linear-gradient(to top, orange ${orangePercentage}%, white ${whitePercentage}%)`;
        }
    };

    const getWaterBgColor = (ratio) => {
        if (ratio < 5) {
            return 'red';
        } else if (ratio >= 10 && ratio <= 100) {
            const bluePercentage = Math.min((ratio - 10) * (90 / 90), 100);
            const whitePercentage = 100 - bluePercentage;
            return `linear-gradient(to top, #0F7FE5 ${bluePercentage}%, white ${whitePercentage}%)`;
        }
    };

    return (
        <div className="medium">
            <div className="track-bar">
                <div className="tracker">
                    <div className="tr-icon-wrapper">
                        <img src='/images/coin.png' alt='' className="track-icon" />
                    </div>
                    <em>{money}</em>
                </div>
                <div className="tracker">
                    <div className="tr-icon-wrapper"
                        style={{ background: getWaterBgColor(foodRatio) }}>
                        <img src='/images/water.png' alt='' className="track-icon" />
                    </div>
                    <em>%{waterRatio}</em>
                </div>
                <div className="tracker">
                    <div className="tr-icon-wrapper"
                        style={{ background: getCarrotBgColor(foodRatio) }}>
                        <img src='/images/carrot.png' alt='' className="track-icon" />
                    </div>
                    <em>%{foodRatio}</em>
                </div>
            </div>
            <div className="btn-container-wrapper">
                <div className="btn-container-org">
                    <img src='/images/carrot.png' alt='' className="btn-icon" />
                    <button className="btn-org" onClick={handleBuyCarrotClick}>
                        <em>Havuç 5</em>
                        <img src='/images/coin.png' alt='' className="coin-icon" />
                    </button>
                </div>
                <div className="btn-container-blue">
                    <img src='/images/water.png' alt='' className="btn-icon" />
                    <button className="btn-blue" onClick={handleBuyWaterClick}>
                        <em>Su 2</em>
                        <img src='/images/coin.png' alt='' className="coin-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tracks;